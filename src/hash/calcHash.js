import fs from 'fs';
import { createHash } from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url); // get name of file
const __dirname = dirname(__filename); // get name of directory

const calculateHash = async () => {
    const file_path = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt'); // path to file

    const hash = createHash('sha256'); // create a SHA256 hash object

    const read_stream = fs.createReadStream(file_path); // create readable stream for file

    read_stream.on('data', (piece) => {
        hash.update(piece); // update hash with piece
    });

    read_stream.on('end', () => {
        const hex_hash = hash.digest('hex'); // get final hash as hex string
        console.log(`SHA256 hash: ${hex_hash}`);
    });

    read_stream.on('error', (error) => {
        console.error('error reading file:', error);
    });
};

await calculateHash();
