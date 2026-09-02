const { shell } = require('electron');

export async function openDirectory(path: string) {
    const error = await shell.openPath(path);
    if (error) throw new Error(error);
}