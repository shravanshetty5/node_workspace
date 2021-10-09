import 'colors';
import { ERROR, WARNING, SUCCESS } from './message_type.mjs';

function log(message, type) {
    let colorMessage;
    switch (type) {
        case ERROR:
            colorMessage = `[ERROR] ${message.red}`;
            break;
        case WARNING:
            colorMessage = `[WARNING] ${message.yellow}`;
            break;
        case SUCCESS:
            colorMessage = `[SUCCESS] ${message.green}`;
            break;
        default:
            colorMessage = `[INFO] ${message}`;
    }
    console.log(colorMessage);
}

export { log };
