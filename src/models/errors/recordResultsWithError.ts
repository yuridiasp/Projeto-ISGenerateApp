import { errorsCodeList } from "@helpers/errorsCode";
import { AppError } from "./appError";
import { tResultCreateService } from "@services/tarefas";
import { Result } from "@models/results/result";
import { iValidationReport } from "@models/validations/iValidationReport";

type tDataRecordResult = Result<tResultCreateService>[] | iValidationReport

export class RecordResultsWithError extends AppError {
    data: tDataRecordResult

    constructor(data: tDataRecordResult, message: string = "Houve erros no registro das intimações.") {
        super(message, errorsCodeList.recordResultsWithError)
        this.data = data
    }
}