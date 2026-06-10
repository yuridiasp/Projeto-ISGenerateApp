import { Dayjs } from "dayjs";
import { iValidationReport } from "@models/validations";
import { CellObject } from "xlsx-js-style";
import { iDataCliente } from "@models/clientes";
import { iProcesso } from "@models/processos";
import { lineXlsxIS } from "@repositories/xlsx/excelISFile.repositories";

export type HandleIntimationsReportResult = {
  message: string;
  newFilePath?: string;
};

export type ReportValidationData = iValidationReport | CellObject[];

export type MainWindowWebContents = Pick<
  Electron.CrossProcessExports.BrowserWindow,
  "webContents"
>;

export interface FormattedIntimationReport {
  data: ReportValidationData[];
  unregisteredCount: number;
  isRecorte: boolean;
}

export interface ISAnalysisDTO {
    availability_date?: Dayjs;
    publication_date: Dayjs;
    case_number: string;
    related_case_number: string;
    description: string;
    internal_deadline: string;
    fatal_deadline: string;
    time: string;
    expert_or_defendant: string;
    local_adress: string;
    dataCliente?: iDataCliente;
    dataProcesso?: iProcesso;
    executor: string;
    separate_task: string;
    justification: string;
    paragraph?: string;
    validateMode: "DEFAULT" | "RECORTE" | "PUB_VAL";
    objectRecorte?: lineXlsxIS;
}