import { AppError } from "@models/errors/appError";

export type Result<T> =
  | { success: true; data?: T }
  | { success: false; error: AppError }