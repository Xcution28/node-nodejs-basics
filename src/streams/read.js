import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
    const file_path = path.join(__dirname, 'files', 'fileToRead.txt');
    const readable_stream = fs.createReadStream(file_path);

    readable_stream.on('data', (piece) => {
        process.stdout.write(piece); // write data to stdout
    });

    readable_stream.on('error', (err) => {
        console.error('error reading file:', err);
    });
};

await read();
