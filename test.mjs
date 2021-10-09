import redline from 'readline';

const calculatorGenerator = function* () {
    const a = Number(yield 'Enter the first number');
    const b = Number(yield 'Enter the second number');
    const operation = yield 'Enter the operator';
    const valid = ['+', '-', '*', '/'].findIndex((op) => op === operation) >= 0;

    if (valid) {
        switch (operation) {
            case '+':
                yield `Sum of ${a} and ${b} is ${a + b}`;
                break;
            case '-':
                yield `Difference of ${a} and ${b} is ${a - b}`;
                break;
            case '+':
                yield `Product of ${a} and ${b} is ${a * b}`;
                break;
            case '+':
                yield `Division of ${a} and ${b} is ${a / b}`;
                break;

            default:
                break;
        }
    } else {
        yield 'Not a valid operator';
    }
};

const genObj = calculatorGenerator();
const read = redline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '\n',
});

read.prompt();
console.log(genObj.next().value);
read.on('line', (line) => {
    const resp = genObj.next(line);
    console.log(resp.value);
    if (resp.done) process.exit();
    read.prompt();
});
