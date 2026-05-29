import { errorsCodeList } from "@helpers/errorsCode.helpers";
import { AppError } from "./appError.models";
import { iValidationReport } from "@models/validations/iValidationReport.models";
import { tCreateTaskResult } from "@services/intimation";

export type tDataRecordResult = tCreateTaskResult[] | iValidationReport

export class RecordResultsWithError extends AppError {
    data: tDataRecordResult

    constructor(data: tDataRecordResult, message: string = "Houve erros no registro das intimações.") {
        super(message, errorsCodeList.recordResultsWithError)
        this.data = data
    }
}