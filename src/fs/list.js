import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url); // get name of file
const __dirname = dirname(__filename); // get name of directory

const list = async () => {
    const dir_path = path.join(__dirname, 'files'); // path to 'files'

    try {
        // checking if 'files' exists
        await fs.access(dir_path);
    } catch {
        // if 'files' does not exist, throw error
        throw new Error('FS operation failed');
    }

    try {
        // read the content of 'files'
        const files = await fs.readdir(dir_path); // returns array of filenames
        console.log('files in directory:', files);
    } catch (error) {
        // error reading 'files'
        throw new Error('FS operation failed');
    }
};

await list();
