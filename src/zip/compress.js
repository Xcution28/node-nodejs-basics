import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compress = async () => {
    const input_file_path = path.join(__dirname, 'files', 'fileToCompress.txt'); // path to file to compress
    const output_file_path = path.join(__dirname, 'files', 'archive.gz'); // path for output compressed file

    const readableStream = fs.createReadStream(input_file_path);
    const writableStream = fs.createWriteStream(output_file_path);
    const gzip = zlib.createGzip();

    readableStream
        .pipe(gzip) // compress data
        .pipe(writableStream) // write compressed data to file
        .on('finish', () => {
            console.log('file compressed to archive.gz');
        })
        .on('error', (error) => {
            console.error('error compression:', error);
        });
};

await compress();
