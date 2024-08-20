const path = require('path')

const getDirectory = (filePath) => {
    return path.dirname(filePath);
}

const createNewFilePath = (originalFilePath, newFileName) => {
    const directory = getDirectory(originalFilePath);
    return path.join(directory, newFileName);
}

module.exports = { getDirectory, createNewFilePath }