import shell from 'shelljs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import 'shelljs/global.js';
config.fatal = true;
const argv = yargs(hideBin(process.argv)).argv;

console.log(argv);
//checkout to base branch
const baseBranch = argv.baseBranch || 'main';
try {
    shell.exec(`git checkout ${baseBranch}`);
} catch (e) {
    console.error(`${baseBranch} is not a valid branch name`);
}
//pull latest from base branch
const baseFork = argv.baseFork || 'origin';
try {
    shell.exec(`git pull ${baseFork} ${baseBranch}`);
} catch (e) {
    console.error(`${baseFork} is not a valid fork name`);
}
//create new branch with the input branch name (mostly the ticket number) and checkout that branch.
const newBranch = argv.newBranch;
if (newBranch) {
    try {
        shell.exec(`git checkout -b ${newBranch}`);
    } catch (e) {
        console.error(`${newBranch} is not a valid branch name`);
    }
} else {
    console.error(
        'script need you to provide a --newBranch argument\n e.g. --newBranch=NDSESEND-4512'
    );
}
