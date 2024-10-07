import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const write = async () => {
    const file_path = path.join(__dirname, 'files', 'fileToWrite.txt');
    const writable_stream = fs.createWriteStream(file_path);

    process.stdin.pipe(writable_stream);

    writable_stream.on('finish', () => {
        console.log('data written to file');
    });

    writable_stream.on('error', (error) => {
        console.error('error writing to file:', error);
    });
};

await write();
