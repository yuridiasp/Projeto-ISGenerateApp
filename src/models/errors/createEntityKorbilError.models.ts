import { tSuccessfulRecordCount } from "@services/tarefas";
import { AppError } from "./appError.models";

export class createEntityKorbilError extends AppError {
    data: tSuccessfulRecordCount;
    
    constructor(code: string, message: string, resultCreation: tSuccessfulRecordCount) {
        super(message, code)
        this.data =  resultCreation
    }
}