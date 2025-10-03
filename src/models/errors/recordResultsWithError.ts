import { errorsCodeList } from "@helpers/errorsCode";
import { AppError } from "./appError";
import { iValidationReport } from "@models/validations/iValidationReport";
import { tCreateTaskResult } from "@services/intimation";

export type tDataRecordResult = tCreateTaskResult[] | iValidationReport

export class RecordResultsWithError extends AppError {
    data: tDataRecordResult

    constructor(data: tDataRecordResult, message: string = "Houve erros no registro das intimações.") {
        super(message, errorsCodeList.recordResultsWithError)
        this.data = data
    }
}