import path from 'path';

export const getDirectory = (filePath: string): string => {
    
    return path.dirname(filePath)
}

export const createNewFilePath = (originalFilePath: string, newFileName: string): string => {
    const directory = getDirectory(originalFilePath);

    return path.join(directory, newFileName)
}