import { Transform } from 'stream';

const transform = async () => {
    const transform_stream = new Transform({
        transform(chunk, encoding, callback) {
            const reversed = chunk.toString().split('').reverse().join('');
            this.push(reversed); // push reversed text to next stream
            callback(); // transformation is complete
        }
    });

    process.stdin.pipe(transform_stream).pipe(process.stdout);

    transform_stream.on('error', (error) => {
        console.error('error transformation:', error);
    });
};

await transform();
