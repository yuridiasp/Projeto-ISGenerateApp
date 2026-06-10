import { generateValidationReport } from "@infrastructure/reportGenerator/reportGenerator.infrastructure";
import { enableButtonCloseReport } from "@utils/viewHelpers/viewHelpers.utils";
import { ValidationError } from "@models/errors";
import { Result } from "@models/results";
import { actionFunctionArgs } from "@middlewares/executeWithLogin.middlewares";
import {
  HandleIntimationsReportResult,
  ISAnalysisDTO,
  MainWindowWebContents
} from "@models/handleIntimationsReport/handleIntimationsReport.models";
import { validateIntimationsAndNotifyView } from "./intimationValidationRunner.services";
import { formatIntimationReportData } from "./intimationReportFormatter.services";
import { buildUnregisteredIntimationsMessage } from "@helpers/reportMessage.helper";

export async function handleIntimationsReportService({
  cookie,
  file,
  window,
  funcValObj
}: actionFunctionArgs): Promise<Result<HandleIntimationsReportResult>> {

  if (!cookie)
    return {
      success: false,
      error: new ValidationError("Cookie ausente.")
    }

  const mainWindow = window.mainWindow as MainWindowWebContents;

  const resultFile = await funcValObj(file);
  
  if (resultFile.success === false) {

    enableButtonCloseReport(mainWindow);

    return {
      success: false,
      error: resultFile.error
    };
  }

  const fileData = resultFile.data?.file ?? [];

  const validations = await validateIntimationsAndNotifyView(
    fileData,
    cookie,
    mainWindow
  );

  const isRecorte = hasRecorteFile(fileData);

  const formattedReport = formatIntimationReportData(
    validations,
    isRecorte
  );

  enableButtonCloseReport(mainWindow);

  const resultReport = generateValidationReport({
    data: formattedReport.data,
    file,
    prefix: "RELATORIO-REGISTRO-INTIMACAO-",
    isRecorte
  });

  if (resultReport.success === false) {
    return {
      success: true,
      data: {
        message: "Todas as intimações foram cadastradas! Nenhum arquivo de relatório gerado."
      }
    };
  }

  const newFilePath = resultReport.data?.newFilePath as string;

  return {
    success: true,
    data: {
      message: buildUnregisteredIntimationsMessage(
        formattedReport.unregisteredCount,
        newFilePath
      ),
      newFilePath
    }
  };
}

function hasRecorteFile(fileData: ISAnalysisDTO[]): boolean {
  return fileData.some(item => item.validateMode === "RECORTE");
}