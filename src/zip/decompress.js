import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const decompress = async () => {
    const input_file_path = path.join(__dirname, 'files', 'archive.gz'); // path to compressed file
    const output_file_path = path.join(__dirname, 'files', 'fileToCompress.txt'); // path for output decompressed file

    const readableStream = fs.createReadStream(input_file_path);
    const writableStream = fs.createWriteStream(output_file_path);
    const gunzip = zlib.createGunzip();

    readableStream
        .pipe(gunzip) // decompress data
        .pipe(writableStream) // write the decompressed data to file
        .on('finish', () => {
            console.log('file decompressed to fileToCompress.txt');
        })
        .on('error', (error) => {
            console.error('error decompression:', error);
        });
};

await decompress();
