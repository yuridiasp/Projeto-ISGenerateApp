export interface PublicationComparisonFile {
  fileName: string;
  filePath: string;
}

export interface PublicationComparisonPresence {
  fileName: string;
  filePath: string;
  count: number;
}

export type PublicationComparisonStatus =
  | "MATCH"
  | "MISSING"
  | "COUNT_MISMATCH";

export interface PublicationComparisonItem {
  key: string;
  caseNumber: string;
  publicationDate: string;
  status: PublicationComparisonStatus;
  files: PublicationComparisonPresence[];
}

export interface PublicationComparisonResult {
  equal: boolean;
  files: PublicationComparisonFile[];
  totalPublications: number;
  totalDifferences: number;
  items: PublicationComparisonItem[];
}