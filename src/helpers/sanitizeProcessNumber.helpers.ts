export function sanitizeProcessNumber(value?: string): string {
    return value?.replace(/\D/g, "") ?? ""
}