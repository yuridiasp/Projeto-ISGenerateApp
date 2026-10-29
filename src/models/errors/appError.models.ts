export abstract class AppError extends Error {
    constructor(
        message: string,
        public readonly code: string
    ) {
        super(message);
        this.name = new.target.name;
    }

    override toString(): string {
        return `[${this.code}] ${this.message}`;
    }

    toJSON() {
        return {
            ...this,
            name: this.name,
            message: this.message,
            code: this.code
        };
    }
}