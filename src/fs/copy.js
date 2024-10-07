import fs from 'fs/promises'; // for promises
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url); // get name of file
const __dirname = dirname(__filename); // get name of directory

const copy = async () => {
    const source_dirname = path.join(__dirname, 'files');
    const destination_dirname = path.join(__dirname, 'files_copy');

    try {
        // checking is the 'files' exists
        await fs.access(source_dirname);
    } catch {
        throw new Error('FS operation failed');
    }

    try {
        // checking is the 'files_copy' exists
        await fs.access(destination_dirname);
        throw new Error('FS operation failed');
    } catch (error) {
        if (error.code !== 'ENOENT') {
            throw error;
        }
    }

    // create a folder
    await fs.mkdir(destination_dirname);

    // get list of files
    const files = await fs.readdir(source_dirname);

    // copy files
    for (const file of files) {
        const source_file = path.join(source_dirname, file);
        const dest_file = path.join(destination_dirname, file);
        await fs.copyFile(source_file, dest_file);
    }

    console.log('files copied successfully!');
};

await copy();
