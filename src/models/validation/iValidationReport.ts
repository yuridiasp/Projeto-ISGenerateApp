export interface iValidationReport {
    processo?: string;
    case_number?: string,
    description: string;
    publicacao?: string;
    publication_date?: string,
    isRegistered: boolean;
    reason: string;
    paragraph?: string
}