import { AppError } from "@models/errors/appError.models";

export type Result<T> =
  | { success: true; data?: T }
  | { success: false; error: AppError }