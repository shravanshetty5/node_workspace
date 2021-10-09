import readline from 'readline';
import fs from 'fs';
import { stdin, stdout } from 'process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const interfaceInstance = readline.createInterface(stdin, stdout);

const createProjectDirectory = (enteredName) => {
    const name = enteredName.trim();
    if (name === '') {
        console.log('Cannot create a project without a name\n');
        process.exit(0);
    }

    const projectPath = join(__dirname, name);
    if (fs.existsSync(projectPath)) {
        console.log(`${name} already exists\n`);
        process.exit(0);
    }
    console.log(`\nCreating a new project called ${name} at ${projectPath}\n`);
    fs.mkdirSync(projectPath);
};

const onProjectInput = (name) => {
    interfaceInstance.close();
    stdin.destroy();
    createProjectDirectory(name);
};

interfaceInstance.question(
    'What is the name of your project?\n',
    onProjectInput
);
