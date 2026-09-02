import { ISAnalysisDTO } from "@models/handleIntimationsReport/handleIntimationsReport.models";
import {
  PublicationComparisonItem,
  PublicationComparisonResult
} from "@models/publicationComparison";
import { iFileData, getOjectValidatePublicationService } from "@services/validateIntimations";
import { ValidationError } from "@models/errors";

interface PublicationFileData {
  file: iFileData;
  publications: ISAnalysisDTO[];
}

function normalizeCaseNumber(value: string): string {
  return value.replace(/\D/g, "");
}

function normalizePublicationDate(publication: ISAnalysisDTO): string {
  if (publication.publication_date?.isValid()) {
    return publication.publication_date.format("YYYY-MM-DD");
  }

  if (publication.availability_date?.isValid()) {
    return publication.availability_date.format("YYYY-MM-DD");
  }

  return "";
}

function buildPublicationKey(publication: ISAnalysisDTO): string {
  const caseNumber = normalizeCaseNumber(publication.case_number);
  const publicationDate = normalizePublicationDate(publication);

  return `${caseNumber}|${publicationDate}`;
}

function countPublications(publications: ISAnalysisDTO[]): Map<string, number> {
  const counts = new Map<string, number>();

  publications.forEach(publication => {
    const key = buildPublicationKey(publication);

    if (!key.startsWith("|")) {
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
  });

  return counts;
}

export function comparePublicationData(
  files: PublicationFileData[]
): PublicationComparisonResult {
  const countsByFile = files.map(item => ({
    file: item.file,
    counts: countPublications(item.publications)
  }));

  const allKeys = new Set<string>();

  countsByFile.forEach(item => {
    item.counts.forEach((_, key) => allKeys.add(key));
  });

  const items: PublicationComparisonItem[] = [];

  allKeys.forEach(key => {
    const [caseNumber, publicationDate] = key.split("|");

    const fileCounts = countsByFile.map(item => ({
      fileName: item.file.fileName,
      filePath: item.file.filePath,
      count: item.counts.get(key) ?? 0
    }));

    const counts = fileCounts.map(item => item.count);
    const hasMissing = counts.some(count => count === 0);
    const sameCount = counts.every(count => count === counts[0]);

    let status: PublicationComparisonItem["status"] = "MATCH";

    if (hasMissing) {
      status = "MISSING";
    } else if (!sameCount) {
      status = "COUNT_MISMATCH";
    }

    items.push({
      key,
      caseNumber,
      publicationDate,
      status,
      files: fileCounts
    });
  });

  items.sort((a, b) => {
    if (a.status === "MATCH" && b.status !== "MATCH") return 1;
    if (a.status !== "MATCH" && b.status === "MATCH") return -1;

    return a.caseNumber.localeCompare(b.caseNumber);
  });

  const differences = items.filter(item => item.status !== "MATCH");

  return {
    equal: differences.length === 0,
    files: files.map(item => ({
      fileName: item.file.fileName,
      filePath: item.file.filePath
    })),
    totalPublications: items.length,
    totalDifferences: differences.length,
    items
  };
}

export async function comparePublicationFilesService(files: iFileData[]): Promise<PublicationComparisonResult> {
  if (files.length < 2) {
    throw new ValidationError("Selecione pelo menos dois arquivos para comparação.");
  }

  const loadedFiles: PublicationFileData[] = [];

  for (const file of files) {
    const result = await getOjectValidatePublicationService(file);

    if (result.success === false) {
      throw result.error;
    }

    loadedFiles.push({
      file,
      publications: result.data?.file ?? []
    });
  }

  return comparePublicationData(loadedFiles);
}