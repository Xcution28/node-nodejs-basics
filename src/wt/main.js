import Worker from 'worker_threads';
import os from 'os';
import path from 'path';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const performCalculations = async () => {
    const number_cores = os.cpus().length; // get number of logical CPU cores
    const results = new Array(number_cores); // array to store results in the same order

    return Promise.all(
        Array.from({ length: number_cores }, (_, i) => {
            return new Promise((resolve) => {
                const worker = new Worker(path.join(__dirname, 'worker.js'));
                const numberToSend = 10 + i; // incremental number starting from 10

                // send data to worker
                worker.postMessage(numberToSend);

                // listen for results from worker
                worker.on('message', (result) => {
                    results[i] = result; // store result in correct index
                });

                // set worker exit and resolve promise
                worker.on('exit', (code) => {
                    if (code !== 0) {
                        console.error(`worker stopped with exit code ${code}`);
                    }
                    resolve(); // resolve once worker exits
                });
            });
        })
    ).then(() => {
        // log results array to console
        console.log(results);
    });
};

await performCalculations();
