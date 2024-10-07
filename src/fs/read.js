import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url); // get name of file
const __dirname = dirname(__filename); // get name of directory

const read = async () => {
    const file_path = path.join(__dirname, 'files', 'fileToRead.txt'); // path to 'fileToRead.txt'

    try {
        // checking if 'fileToRead.txt' exists
        await fs.access(file_path);
    } catch {
        // if file does not exist, throw an error
        throw new Error('FS operation failed');
    }

    try {
        // reading file content
        const content = await fs.readFile(file_path, 'utf-8');
        console.log('file content:', content);
    } catch (error) {
        // error reading 'fileToRead.txt'
        throw new Error('FS operation failed');
    }
};

await read();
