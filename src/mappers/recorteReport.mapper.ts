import { CellObject } from "xlsx-js-style";
import { excelDateToJsDate } from "@utils/date/excelDateToJsDate.utils";
import { reportCellStyle } from "@constants/reportCellStyle.constants";
import { iValidationReport } from "@models/validations";

type RecorteObject = Record<string, any>;

const DATE_COLUMNS = ["DATA DISP", "DATA PUBLIC"];

export function buildRecorteHeaderRow(objectRecorte: RecorteObject): CellObject[] {
  return Object.keys(objectRecorte).map(key => ({
    v: key,
    t: "s",
    s: reportCellStyle.title
  }));
}

export function mapValidationReportToRecorteRow(
  validationReport: iValidationReport
): CellObject[] {
  const objectRecorte = validationReport.objectRecorte as RecorteObject;

  return Object.keys(objectRecorte).reduce<CellObject[]>((previous, current) => {
    const isDateColumn = DATE_COLUMNS.includes(current);

    const value = getRecorteCellValue(objectRecorte, current, isDateColumn);

    previous.push({
      v: value,
      t: isDateColumn ? "d" : "s",
      s: validationReport.isRegistered
        ? reportCellStyle.success
        : reportCellStyle.fail
    });

    return previous;
  }, []);
}

function getRecorteCellValue(
  objectRecorte: RecorteObject,
  key: string,
  isDateColumn: boolean
): string {
  const rawValue = objectRecorte[key];

  if (!isDateColumn) {
    return String(rawValue ?? "");
  }

  const date = excelDateToJsDate(rawValue);

  // Mantida a regra atual do sistema.
  // Se futuramente desejar remover esse ajuste, centralizamos a alteração aqui.
  return date
    .tz()
    .hour(0)
    .minute(0)
    .second(28)
    .millisecond(0)
    .format("YYYY-MM-DD HH:mm:ss");
}