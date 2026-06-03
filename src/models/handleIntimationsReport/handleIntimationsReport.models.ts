import { iValidationReport } from "@models/validations";
import { CellObject } from "xlsx-js-style";

export type HandleIntimationsReportResult = {
  message: string;
  newFilePath: string;
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