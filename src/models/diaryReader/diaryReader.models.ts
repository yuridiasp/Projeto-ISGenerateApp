export type DiarySourceLayout = "DEFAULT" | "SERDIJUL" | "WORD_CADASTRADO";

export interface PdfDiaryMetadata {
  jornal?: string;
  tribunal?: string;
  dataDivulgacao?: string;
  dataPublicacao?: string;
}

export interface DiaryRecord {
  layout?: DiarySourceLayout;

  comunicacaoId?: string;

  data?: string;
  dataDisponibilizacao?: string;
  dataPublicacao?: string;
  dataDivulgacao?: string;

  codigo?: string;
  nomePesquisado?: string;
  jornal?: string;
  tribunal?: string;
  vara?: string;
  informacoes?: string;

  processo?: string;
  processoCnj?: string;
  processoOrigem?: string;
  orgao?: string;
  tipoComunicacao?: string;
  meio?: string;
  inteiroTeor?: string;
  classe?: string;
  conteudo?: string;

  partes: string[];
  advogados: string[];

  tarefas?: DiaryTask[];
  statusInterno?: string;
}

export interface DiaryTask {
  processo?: string;
  origem?: string;
  descricao?: string;
  prazo?: string;
  responsavel?: string;
  raw: string;
}

export interface TextReaderRepository {
  readText(filePath: string): Promise<string>;
}