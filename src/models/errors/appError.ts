// core/shared/app-error.ts
export abstract class AppError {
    
    constructor(
        public readonly message: string,
        public readonly code: string
    ) {}

    toString() {
        return `[${this.code}] ${this.message}`
    }
}
