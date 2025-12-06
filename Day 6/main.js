const fs = require('fs');
const path = require('path')

function part1() {
    let input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split('\r\n').map(value => value.trim().split(/ +/g));

    const lastRow = input.length - 1;
    let sum = 0;
    for (let i = 0; i < input[lastRow].length; i++) {
        let operator = ''
        let operation;
        for (let j = lastRow; j >= 0; j--) {
            if (j === lastRow) {
                operator = input[j][i];
                operator === '*' ? operation = 1 : operation = 0
            } else {
                operator === '*' ? operation *= Number(input[j][i]) : operation += Number(input[j][i])
            }
        }
        sum += operation
    }
    return sum;
};

function part2() {
    let input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split('\r\n').map(value => value.split(''));

    const operationIndexes = [0];
    const lastRow = input.length - 1
    for (let i = 1; i < input[lastRow].length; i++) {
        if (input[lastRow][i] === '*' || input[lastRow][i] === '+') {
            operationIndexes.push(i);
        }
    }
    operationIndexes.push(input[lastRow].length + 1);

    let totalSum = 0;
    for (let i = 0; i < operationIndexes.length - 1; i++) {
        const subOperation = input.map(value => value.slice(operationIndexes[i], operationIndexes[i + 1] - 1));

        const lastRow = subOperation.length - 1;
        const operator = subOperation[lastRow][0];
        let operation;
        operator === '*' ? operation = 1 : operation = 0;
        for (let x = 0; x < subOperation[lastRow].length; x++) {
            let num = ''
            for (let y = 0; y < subOperation.length - 1; y++) {
                num += subOperation[y][x].trim()
            }
            operator === '*' ? operation *= Number(num) : operation += Number(num)
        }
        totalSum += operation;
    }
    return totalSum;
};

// Solution with matrix transpose
function part2B() {
    let input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split('\r\n').map(value => value.split(''));

    const operationIndexes = [0];
    const lastRow = input.length - 1
    for (let i = 1; i < input[lastRow].length; i++) {
        if (input[lastRow][i] === '*' || input[lastRow][i] === '+') {
            operationIndexes.push(i);
        }
    }
    operationIndexes.push(input[lastRow].length + 1);

    let totalSum = 0;
    for (let i = 0; i < operationIndexes.length - 1; i++) {
        const subOperation = input.map(value => value.slice(operationIndexes[i], operationIndexes[i + 1] - 1));

        let swap = []
        let operands = []
        for (let k = 0; k < subOperation[0].length; k++) {
            let row = []
            for (let j = 0; j < subOperation.length; j++) {
                if (k === 0 && j === subOperation.length - 1) {
                    row.push("")
                    operands.push(subOperation[j][k])
                } else {
                    row.push(subOperation[j][k])
                }
            }
            swap.push(row)
        }

        swap = swap.map(elem => Number(elem.join("").trim()))
        for (let k = 0; k < operands.length; k++) {
            totalSum += operands[k] === "+" ? swap.reduce((a, b) => a + b) : swap.reduce((a, b) => a * b)
        }

    }
    return totalSum;
};

const start = new Date();
const result = part1();
const end = new Date();

const start2 = new Date();
const result2 = part2();
const end2 = new Date();

const start2B = new Date();
const result2B = part2B();
const end2B = new Date();

console.log("Tier 1 result:", result);
console.log(`Running time = ${(end - start) / 1000} seconds\n`);

console.log("Tier 2 result:", result2);
console.log(`Running time = ${(end2 - start2) / 1000} seconds\n`);

console.log("Tier 2B result:", result2B);
console.log(`Running time = ${(end2B - start2B) / 1000} seconds\n`);