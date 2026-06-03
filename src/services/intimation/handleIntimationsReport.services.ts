import { generateValidationReport } from "@infrastructure/reportGenerator/reportGenerator.infrastructure";
import { getObjectValidateIntimationsService, iFileData } from "@services/validateIntimations";
import { enableButtonCloseReport } from "@utils/viewHelpers/viewHelpers.utils";
import { ValidationError } from "@models/errors";
import { Result } from "@models/results";
import { actionFunctionArgs } from "@middlewares/executeWithLogin.middlewares";
import {
  HandleIntimationsReportResult,
  MainWindowWebContents
} from "@models/handleIntimationsReport/handleIntimationsReport.models";
import { validateIntimationsAndNotifyView } from "./intimationValidationRunner.services";
import { formatIntimationReportData } from "./intimationReportFormatter.services";
import { buildUnregisteredIntimationsMessage } from "@helpers/reportMessage.helper";

export async function handleIntimationsReportService({
  cookie,
  file,
  window
}: actionFunctionArgs): Promise<Result<HandleIntimationsReportResult>> {
  const mainWindow = window.mainWindow as MainWindowWebContents;

  const resultFile = await getObjectValidateIntimationsService(file as iFileData);

  if (resultFile.success === false) {
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
      success: false,
      error: new ValidationError(
        "Todas as intimações foram cadastradas! Nenhum arquivo de relatório gerado.",
        fileData.length
      )
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

function hasRecorteFile(fileData: Array<{ isRecorte?: boolean }>): boolean {
  return fileData.some(item => item.isRecorte);
}