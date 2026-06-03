import { intimationValidateService } from "@services/intimation";
import { updateViewReportValidation } from "@utils/viewHelpers/viewHelpers.utils";
import { ISAnalysisDTO } from "@models/clientes";
import { iValidationReport } from "@models/validations";
import { RecordResultsWithError } from "@models/errors";
import { MainWindowWebContents } from "@models/handleIntimationsReport/handleIntimationsReport.models";

export async function validateIntimationsAndNotifyView(
  intimations: ISAnalysisDTO[],
  cookie: string,
  mainWindow: MainWindowWebContents
): Promise<iValidationReport[]> {
  const validationsPromises = intimations.map(intimation =>
    validateSingleIntimationAndNotifyView(intimation, cookie, mainWindow)
  );

  return Promise.all(validationsPromises);
}

async function validateSingleIntimationAndNotifyView(
  intimation: ISAnalysisDTO,
  cookie: string,
  mainWindow: MainWindowWebContents
): Promise<iValidationReport> {
  const result = await intimationValidateService(intimation, cookie);

  if (result.success === true) {
    const validationReport = result.data?.validationReport as iValidationReport;

    updateViewReportValidation(validationReport, mainWindow);

    return validationReport;
  }

  const error = result.error as RecordResultsWithError;
  const validationReport = error.data as iValidationReport;

  updateViewReportValidation(validationReport, mainWindow);

  return validationReport;
}