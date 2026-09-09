export type DiaryRenameSource = "SERDIJUL" | "IS";

export type DiaryRenameStatus =
  | "RENAMED"
  | "ALREADY_NAMED"
  | "CONFLICT"
  | "INVALID"
  | "ERROR";

export interface DiaryFileRenameResult {
  originalPath: string;
  originalName: string;
  newPath?: string;
  newName?: string;
  source?: DiaryRenameSource;
  identifier?: string;
  publicationDate?: string;
  status: DiaryRenameStatus;
  reason?: string;
}

export interface DiaryFileRenameSummary {
  total: number;
  renamed: number;
  skipped: number;
  errors: number;
  files: DiaryFileRenameResult[];
}