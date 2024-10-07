import fs from 'fs/promises'; // for promises
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url); // get name of file
const __dirname = dirname(__filename); // get name of directory

const create = async () => {
    const file_content = 'I am fresh and young!';
    const file_dirname = path.join(__dirname, 'files');
    const file_path = path.join(file_dirname, 'fresh.txt');

    try {
        // checking is the directory exists
        await fs.access(file_dirname);
    } catch {
        // if no such directory create it
        await fs.mkdir(file_dirname, { recursive: true });
        console.log('directory created:', file_dirname);
    }

    try {
        // checking if the file exists
        await fs.access(file_path);
        // if file exists, throw error
        throw new Error('FS operation failed');
    } catch (error) {
        // if access fails (meaning file doesn't exist), create file
        if (error.code === 'ENOENT') {
            await fs.writeFile(file_path, file_content);
            console.log('file was created');
        } else {
            // if there is any other error, log it
            console.error('error accessing file:', error);
        }
    }
};

await create();
