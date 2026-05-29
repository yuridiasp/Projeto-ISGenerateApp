import fs from "fs";
import { PDFParse } from "pdf-parse";

export interface DiarioRegistro {
  comunicacaoId?: string;
  data?: string;
  codigo?: string;
  nomePesquisado?: string;
  jornal?: string;
  tribunal?: string;
  vara?: string;
  informacoes?: string;

  processo?: string;
  orgao?: string;
  dataDisponibilizacao?: string;
  tipoComunicacao?: string;
  meio?: string;
  inteiroTeor?: string;
  partes?: string[];
  advogados?: string[];
  classe?: string;
  conteudo?: string;
}

export class PdfDiaryReader {
    async read(filePath: string): Promise<DiarioRegistro[]> {
        const buffer = fs.readFileSync(filePath);

        const parser = new PDFParse({
        data: buffer
        });

        const result = await parser.getText();

        await parser.destroy();

        const text = this.normalizeText(result.text);

        return this.extractRecords(text);
    }

    private fixEncoding(text: string): string {
        return text
            .replace(/├é┬¬/g, "ª")
            .replace(/├é┬º/g, "§")
            .replace(/├é┬║/g, "º")
            .replace(/├é┬░/g, "°")
            .replace(/├â┬º/g, "ç")
            .replace(/├â╬╝/g, "õ")
            .replace(/├º├Á/g, "çõ")
            .replace(/├│/g, "ó")
            .replace(/├º/g, "ç")
            .replace(/├Á/g, "ã")
            .replace(/├ú/g, "ú")
            .replace(/├í/g, "á")
            .replace(/├®/g, "é")
            .replace(/├¬/g, "ê")
            .replace(/N├é┬║/g, "Nº")
            .replace(/n├é┬║/g, "nº")
            .replace(/InformaçÁes/g, "Informações")
            .replace(/PublicaçÁes/g, "Publicações")
            .replace(/C├│digo/g, "Código");
    }

  private extractRecords(text: string): DiarioRegistro[] {
        const normalized = this.normalizeMarkers(text);

        const blocks = normalized
            .split(/(?=Data:\s*\d{2}\/\d{2}\/\d{4}\s+Código:)/gi)
            .map(block => block.trim())
            .filter(block =>
            /^Data:\s*\d{2}\/\d{2}\/\d{4}\s+Código:/i.test(block)
            );

        console.log("Blocos encontrados:", blocks.length);

        return blocks
            .map(block => this.parseRecord(block))
            .filter(record => record.data && record.codigo && record.informacoes);
    }

    private normalizeMarkers(text: string): string {
        return this.fixEncoding(text)
            .replace(/C├│digo:/gi, "Código:")
            .replace(/Codigo:/gi, "Código:")
            .replace(/Informa(?:ç|├º|├º├Á|c)[aãÁ]es:/gi, "Informações:")
            .replace(/Nome\s+Pesquisado:/gi, "Nome Pesquisado:")
            .replace(/\r/g, "")
            .replace(/\n+/g, " ")
            .replace(/\t/g, " ")
            .replace(/--\s*\d+\s+of\s+\d+\s*--/gi, " ")
            .replace(/[ ]{2,}/g, " ")
            .trim();
    }

    private parseRecord(block: string): DiarioRegistro {
        const registro: DiarioRegistro = {
            data: this.extract(
            block,
            /Data:\s*(\d{2}\/\d{2}\/\d{4})/i
            ),

            codigo: this.extract(
            block,
            /Código:\s*([\s\S]*?)\s+Nome Pesquisado:/i
            ),

            nomePesquisado: this.extract(
            block,
            /Nome Pesquisado:\s*([\s\S]*?)\s+Jornal:/i
            ),

            jornal: this.extract(
            block,
            /Jornal:\s*([\s\S]*?)\s+Tribunal:/i
            ),

            tribunal: this.extract(
            block,
            /Tribunal:\s*([\s\S]*?)\s+Vara:/i
            ),

            vara: this.extract(
            block,
            /Vara:\s*([\s\S]*?)\s+Informações:/i
            ),

            informacoes: this.extract(
            block,
            /Informações:\s*([\s\S]*)$/i
            )
        };

        registro.comunicacaoId = this.extract(
            registro.informacoes ?? "",
            /\|comunicacao_id:\s*([^|]+)\|/i
        );

        if (registro.informacoes) {
            registro.informacoes = registro.informacoes
            .replace(/\|comunicacao_id:\s*[^|]+\|/i, "")
            .trim();
        }

        this.extractInternalFields(registro);

        return registro;
    }

    private extractInternalFields(registro: DiarioRegistro): void {
        const text = registro.informacoes ?? "";

        registro.processo = this.extractProcessNumber(text);

        registro.orgao = this.extract(
            text,
            /Orgao:\s*([\s\S]*?)\s+Data de disponibilizacao:/i
        );

        if (!registro.orgao) {
            registro.orgao = this.extract(
            text,
            /ORGAO JULGADOR\.*:\s*([\s\S]*?)\s+RELATOR/i
            );
        }

        registro.dataDisponibilizacao = this.extract(
            text,
            /Data de disponibilizacao:\s*([\d\/-]+)/i
        );

        registro.tipoComunicacao = this.extract(
            text,
            /Tipo de comunicacao:\s*([\s\S]*?)\s+Meio:/i
        );

        registro.meio = this.extract(
            text,
            /Meio:\s*([\s\S]*?)\s+Inteiro teor:/i
        );

        registro.inteiroTeor = this.extract(
            text,
            /Inteiro teor:\s*(https?:\/\/[^\s]+)/i
        );

        registro.classe = this.extract(
            text,
            /Classe:\s*([\s\S]*?)\s+Conteudo:/i
        );

        registro.conteudo = this.extract(
            text,
            /Conteudo:\s*([\s\S]*)$/i
        );

        registro.partes = this.extractPartes(text);
        registro.advogados = this.extractAdvogados(text);
    }

    private extractProcessNumber(text: string): string | undefined {
        // Prioridade 1: número interno do processo
        // Exemplo: NRO. PROCESSO....: 202400122191
        const internalNumber = this.extract(
            text,
            /NRO\.\s*PROCESSO\.*\s*:\s*([0-9]+)/i
        );

        if (internalNumber) {
            return internalNumber;
        }

        // Prioridade 2: PROC.: 202588102348
        const procNumber = this.extract(
            text,
            /PROC\.\s*:\s*([0-9]+)/i
        );

        if (procNumber) {
            return procNumber;
        }

        // Prioridade 3: Publicacao Processo: 0011773-64.2026.8.25.0000
        const publicationNumber = this.extract(
            text,
            /Publicacao Processo:\s*([^\s]+)/i
        );

        if (publicationNumber) {
            return publicationNumber;
        }

        // Prioridade 4: número único CNJ
        const cnjNumber = this.extract(
            text,
            /NUMERO UNICO:\s*([0-9.-]+)/i
        );

        if (cnjNumber) {
            return cnjNumber;
        }

        return undefined;
    }

    private extract(text: string, regex: RegExp): string | undefined {
        const match = text.match(regex);

        if (!match) return undefined;

        return this.cleanValue(match[1]);
    }

    private extractAll(text: string, regex: RegExp): string[] {
        return [...text.matchAll(regex)]
        .map(match => this.cleanValue(match[1]))
        .filter(Boolean) as string[];
    }

    private extractPartes(text: string): string[] {
        const partes = new Set<string>();

        // Padrão DJN: Parte: NOME
        for (const parte of this.extractAll(
            text,
            /Parte:\s*([\s\S]*?)(?=\s+Parte:|\s+Advogado:|\s+Classe:|\s+Conteudo:|$)/gi
            )) {
            partes.add(parte);
        }

        // Padrão TJSE antigo: REQUERENTE - NOME
        const polos = [
            "REQUERENTE",
            "REQUERIDO",
            "AUTOR",
            "REU",
            "EXEQUENTE",
            "EXECUTADO",
            "EMBARGANTE",
            "EMBARGADO",
            "RECORRENTE",
            "RECORRIDO",
            "IMPETRANTE",
            "IMPETRADO"
        ];

        for (const polo of polos) {
            const regex = new RegExp(`${polo}\\s*[-:]\\s*([\\s\\S]*?)(?=\\s+(?:${polos.join("|")}|ADVOGADO|ADV\\.|DEFENSOR|PROCURADOR|CERTIFICO|ATO ORDINATORIO|DECISAO|SENTENCA|NOS TERMOS|$))`,
            "gi");

            for (const match of text.matchAll(regex)) {
                const value = this.cleanPartyOrLawyerName(match[1]);

                if (value) {
                partes.add(`${polo}: ${value}`);
                }
            }
        }

        return [...partes];
    }

    private extractAdvogados(text: string): string[] {
        const advogados = new Set<string>();

        // Padrão DJN: Advogado: NOME - OAB
        const advogadoDjnRegex =
            /\bAdvogado:\s*([\s\S]*?)(?=\s+Advogado:|\s+Classe:|\s+Conteudo:|\s+Conteúdo:|$)/gi;

        for (const match of text.matchAll(advogadoDjnRegex)) {
            const value = this.cleanValue(match[1]);

            if (value) {
            advogados.add(this.cleanPartyOrLawyerName(value));
            }
        }

        // Padrão TJSE antigo:
        // ADVOGADO - NOME - OAB: 353-A-/SE
        // ADV. : NOME - OAB: 353-A-SE
        const advogadoTjseRegex =
            /\b(?:ADVOGADO|ADV\.)\s*[-:]\s*([\s\S]*?OAB\s*[:\s]*[A-Z0-9À-Ú/.\- ]+?)(?=\s+(?:REQUERENTE|REQUERIDO|AUTOR|REU|EXEQUENTE|EXECUTADO|EMBARGANTE|EMBARGADO|RECORRENTE|RECORRIDO|IMPETRANTE|IMPETRADO|DEFENSOR|PROCURADOR|CERTIFICO|ATO ORDINATORIO|DECISAO|SENTENCA|NOS TERMOS|$))/gi;

        for (const match of text.matchAll(advogadoTjseRegex)) {
            const value = this.cleanValue(match[1]);

            if (value) {
            advogados.add(this.cleanPartyOrLawyerName(value));
            }
        }

        // DEFENSORIA / PROCURADORIA
        const outrosRegex =
            /\b(?:DEFENSOR|PROCURADOR ESTADUAL|PROCURADOR)\.*\s*[-:]?\s*([\s\S]*?)(?=\s+(?:REQUERENTE|REQUERIDO|AUTOR|REU|ADVOGADO|ADV\.|CERTIFICO|ATO ORDINATORIO|DECISAO|SENTENCA|NOS TERMOS|$))/gi;

        for (const match of text.matchAll(outrosRegex)) {
            const value = this.cleanValue(match[1]);

            if (value) {
            advogados.add(this.cleanPartyOrLawyerName(value));
            }
        }

        return [...advogados];
    }

    private normalizeText(text: string): string {
        return this.fixEncoding(text)
            .replace(/\r/g, "")
            .replace(/\t/g, " ")
            .replace(/--\s*\d+\s+of\s+\d+\s*--/gi, " ")
            .replace(/Outlook\s+Publica.+?C\.N\.P\.J\.\s*[\d./-]+/is, " ")
            .replace(/[ ]{2,}/g, " ")
            .replace(/\n{2,}/g, "\n")
            .trim();
    }

    private cleanPartyOrLawyerName(value?: string): string | undefined {
        if (!value) return undefined;

        return this.fixEncoding(value)
            .replace(/\.{2,}/g, "")
            .replace(/\s{2,}/g, " ")
            .replace(/\s+([,.;:])/g, "$1")
            .trim();
    }

    private cleanValue(value?: string): string | undefined {
        if (!value) return undefined;

        return this.fixEncoding(value)
            .replace(/\n/g, " ")
            .replace(/[ ]{2,}/g, " ")
            .trim();
    }
}