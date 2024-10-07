import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url); // get name of file
const __dirname = dirname(__filename); // get name of directory

const rename = async () => {
    const old_file_path = path.join(__dirname, 'files', 'wrongFilename.txt'); // path to old file
    const new_file_path = path.join(__dirname, 'files', 'properFilename.md'); // path to new file

    try {
        // checking if the 'wrongFilename.txt' exists
        await fs.access(old_file_path);
    } catch {
        throw new Error('FS operation failed');
    }

    try {
        // checking if the 'properFilename.md' exists
        await fs.access(new_file_path);
        throw new Error('FS operation failed');
    } catch (error) {
        if (error.code !== 'ENOENT') {
            throw error;
        }
    }

    // rename file
    await fs.rename(old_file_path, new_file_path);
    console.log('file renamed successfully!');
};

await rename();
