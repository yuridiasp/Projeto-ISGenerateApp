import { iValidationReport } from "@models/validations";
import {
  FormattedIntimationReport,
  ReportValidationData
} from "@models/handleIntimationsReport/handleIntimationsReport.models";
import {
  buildRecorteHeaderRow,
  mapValidationReportToRecorteRow
} from "@mappers/recorteReport.mapper";

export function formatIntimationReportData(
  validations: iValidationReport[],
  isRecorte: boolean
): FormattedIntimationReport {
  const unregisteredCount = countUnregisteredIntimations(validations);

  if (isRecorte) {
    return {
      data: formatRecorteReportData(validations),
      unregisteredCount,
      isRecorte
    };
  }

  return {
    data: formatDefaultReportData(validations),
    unregisteredCount,
    isRecorte
  };
}

function countUnregisteredIntimations(
  validations: iValidationReport[]
): number {
  return validations.filter(validation => !validation.isRegistered).length;
}

function formatDefaultReportData(
  validations: iValidationReport[]
): ReportValidationData[] {
  return validations.filter(validation => !validation.isRegistered);
}

function formatRecorteReportData(
  validations: iValidationReport[]
): ReportValidationData[] {
  if (validations.length === 0) {
    return [];
  }

  const firstObjectRecorte = validations[0].objectRecorte as Record<string, any>;

  const headerRow = buildRecorteHeaderRow(firstObjectRecorte);

  const rows = validations.map(mapValidationReportToRecorteRow);

  return [headerRow, ...rows];
}