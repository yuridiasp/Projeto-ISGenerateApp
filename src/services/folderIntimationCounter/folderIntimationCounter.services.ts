import fs from "fs"
import path from "path"

import { FileError, ValidationError } from "@models/errors"
import { readExcelFile } from "@repositories/xlsx/excelISFile.repositories"
import { readDiaryAutomatically } from "@services/diaryAutoReader/diaryAutoReader.services"
import type { Result } from "@models/results"
import type { ISAnalysisDTO } from "@models/handleIntimationsReport/handleIntimationsReport.models"
import type { DiaryRecord } from "@models/diaryReader"
import type { iFileData } from "@services/validateIntimations"

export type FolderIntimationCounterInput = {
    folderPath: string
    folderName?: string
}

export type FolderIntimationFileStatus =
    | "COUNTED"
    | "UNSUPPORTED"
    | "ERROR"

export type FolderIntimationFileCount = {
    fileName: string
    filePath: string
    extension: string
    intimationCount: number
    status: FolderIntimationFileStatus
    error?: string
}

export type FolderIntimationCountResult = {
    folderPath: string
    totalFiles: number
    countedFiles: number
    unsupportedFiles: number
    failedFiles: number
    totalIntimations: number
    files: FolderIntimationFileCount[]
}

type FolderIntimationCounterDependencies = {
    listFilePaths?: (folderPath: string) => Promise<string[]>
    readDiaryFile?: (file: iFileData) => Promise<DiaryRecord[]>
    readExcelFile?: (filePath: string) => ISAnalysisDTO[]
}

const diaryExtensions = new Set([".pdf", ".doc", ".docx"])
const excelExtensions = new Set([".xls", ".xlsx", ".xlsm", ".csv"])

async function listDirectFilePaths(folderPath: string): Promise<string[]> {
    const entries = await fs.promises.readdir(folderPath, { withFileTypes: true })

    return entries
        .filter(entry => entry.isFile())
        .map(entry => path.join(folderPath, entry.name))
}

function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        return error.message
    }

    return String(error)
}

function createFileData(filePath: string): iFileData {
    return {
        fileName: path.basename(filePath),
        filePath,
        isXlsx: excelExtensions.has(path.extname(filePath).toLowerCase())
    }
}

function buildResult(
    folderPath: string,
    files: FolderIntimationFileCount[]
): FolderIntimationCountResult {
    return {
        folderPath,
        totalFiles: files.length,
        countedFiles: files.filter(file => file.status === "COUNTED").length,
        unsupportedFiles: files.filter(file => file.status === "UNSUPPORTED").length,
        failedFiles: files.filter(file => file.status === "ERROR").length,
        totalIntimations: files.reduce(
            (total, file) => total + file.intimationCount,
            0
        ),
        files
    }
}

export function createFolderIntimationCounterService(
    dependencies: FolderIntimationCounterDependencies = {}
) {
    const listFilePaths = dependencies.listFilePaths ?? listDirectFilePaths
    const readDiaryFile = dependencies.readDiaryFile ?? readDiaryAutomatically
    const readSpreadsheetFile = dependencies.readExcelFile ?? readExcelFile

    async function countFile(filePath: string): Promise<FolderIntimationFileCount> {
        const extension = path.extname(filePath).toLowerCase()
        const baseResult = {
            fileName: path.basename(filePath),
            filePath,
            extension
        }

        if (!diaryExtensions.has(extension) && !excelExtensions.has(extension)) {
            return {
                ...baseResult,
                intimationCount: 0,
                status: "UNSUPPORTED"
            }
        }

        try {
            const records = excelExtensions.has(extension)
                ? readSpreadsheetFile(filePath)
                : await readDiaryFile(createFileData(filePath))

            return {
                ...baseResult,
                intimationCount: records.length,
                status: "COUNTED"
            }
        } catch (error) {
            return {
                ...baseResult,
                intimationCount: 0,
                status: "ERROR",
                error: getErrorMessage(error)
            }
        }
    }

    return {
        async count(folderPath: string): Promise<Result<FolderIntimationCountResult>> {
            if (!folderPath?.trim()) {
                return {
                    success: false,
                    error: new ValidationError("Caminho da pasta nao informado.")
                }
            }

            try {
                const stats = fs.statSync(folderPath)

                if (!stats.isDirectory()) {
                    return {
                        success: false,
                        error: new ValidationError("O caminho informado nao e uma pasta.")
                    }
                }

                const filePaths = await listFilePaths(folderPath)
                const files = await Promise.all(filePaths.map(countFile))

                return {
                    success: true,
                    data: buildResult(folderPath, files)
                }
            } catch (error) {
                return {
                    success: false,
                    error: new FileError(getErrorMessage(error))
                }
            }
        }
    }
}

const folderIntimationCounterService = createFolderIntimationCounterService()

export function countIntimationsByFolder(folderPath: string) {
    return folderIntimationCounterService.count(folderPath)
}
