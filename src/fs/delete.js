import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url); // get name of file
const __dirname = dirname(__filename); // get name of directory

const remove = async () => {
    const file_path = path.join(__dirname, 'files', 'fileToRemove.txt'); // path to file to remove

    try {
        // checking if 'fileToRemove.txt' exists
        await fs.access(file_path);
    } catch {
        // if file does not exist, throw error
        throw new Error('FS operation failed');
    }

    // remove file
    try {
        await fs.unlink(file_path); // deleting file
        console.log('file was removed successfully!');
    } catch (error) {
        throw new Error('FS operation failed');
    }
};

await remove();
