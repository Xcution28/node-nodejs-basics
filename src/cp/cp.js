import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const spawnChildProcess = async (args) => {
    const child = spawn('node', [path.join(__dirname, 'script.js'), ...args], {
        stdio: 'pipe' // set up pipes for IPC
    });

    // set data received from child process
    child.stdout.on('data', (data) => {
        process.stdout.write(`Child: ${data}`);
    });

    // pipe data from master process stdin to child process stdin
    process.stdin.on('data', (data) => {
        child.stdin.write(data);
    });

    // exit event of child process
    child.on('exit', (code) => {
        console.log(`child process exited with code ${code}`);
        process.exit(code); // exit master process with child's exit code
    });

    // throw error if child process fails
    child.on('error', (error) => {
        console.error('failed to start child process:', error);
    });
};

// Put your arguments in function call to test this functionality
spawnChildProcess( ["someArgument1", "someArgument2"] );
