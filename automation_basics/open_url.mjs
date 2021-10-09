import { platform } from 'os';
import { exec } from 'child_process';

const WINDOWS_PLATFORM = 'win32';
const MAC_PLATFORM = 'darwin';

const osPlatform = platform();
const arg = process.argv.slice(2);
const [url] = arg;
if (!url) {
    console.log("Please enter a url like 'http://google.com'");
    process.exit(0);
}

let command = '';
if (osPlatform === WINDOWS_PLATFORM) {
    command = `start microsoft-edge:${url}`;
} else if (osPlatform === MAC_PLATFORM) {
    command = `open -a "Google Chrome" ${url}`;
} else {
    command = `google-chrome --no-sandbox ${url}`;
}

console.log(`executing command: ${command}`);

exec(command);
