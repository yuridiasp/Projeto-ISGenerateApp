import { iFileData } from "@services/validateIntimations";

export type DiaryFileType =
  | "PDF"
  | "DOCX"
  | "DOC"
  | "UNKNOWN";

export type DiaryDocumentLayout =
  | "WORD_CADASTRADO"
  | "PDF_IS_PROCESSOS"
  | "SERDIJUL"
  | "PDF_DEFAULT"
  | "UNKNOWN";

export interface DiaryDocumentIdentification {
  fileType: DiaryFileType;
  layout: DiaryDocumentLayout;
  extension: string;
  confidence: "HIGH" | "MEDIUM" | "LOW";
  reasons: string[];
}

export interface PdfDiaryMetadata {
  jornal?: string;
  tribunal?: string;
  dataDivulgacao?: string;
  dataPublicacao?: string;
}

export interface DiaryRecord {
  layout?: DiaryDocumentLayout;

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
  readText(file: iFileData): Promise<string>;
}