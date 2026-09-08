export type DialogContext =
  | "classifyPublicationsByDepartment"
  | "registerIntimationsFromAnalyses"
  | "reconcileAnalysesWithSystem"
  | "reconcilePublicationsWithSystem"
  | "countIntimationsByFolder"
  | "comparePublications";

export type DialogHistory = Partial<Record<DialogContext, string>>;