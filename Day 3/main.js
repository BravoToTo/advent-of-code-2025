const fs = require('fs');
const path = require('path')

function part1() {
    const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split('\r\n');

    let joltage = 0;
    input.forEach(bank => {
        let maxDecimal = 0;
        let indexMaxDecimal = 0;
        for (let i = 0; i < bank.length - 1; i++) {
            if (maxDecimal < Number(bank[i])) {
                maxDecimal = Number(bank[i])
                indexMaxDecimal = i;
            }
        }

        let maxUnit = 0
        for (let i = indexMaxDecimal + 1; i < bank.length; i++) {
            if (maxUnit < Number(bank[i])) {
                maxUnit = Number(bank[i])
            }
        }
        joltage += maxDecimal * 10 + maxUnit
    })
    return joltage;
}

function part2() {
    const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split('\r\n');

    let joltage = 0;
    input.forEach(bank => {
        const digits = bank.length - 11
        let min = 0;
        let jolts = ''
        for (let i = 0; i < 12; i++) {
            let max = 0;
            for (let j = min; j < digits + i; j++) {
                if (max < Number(bank[j])) {
                    max = Number(bank[j])
                    min = j + 1
                }
            }
            jolts += bank[min - 1]
        }
        joltage += Number(jolts)
    })
    return joltage;
}

const start = new Date();
const result = part1();
const end = new Date();

const start2 = new Date();
const result2 = part2();
const end2 = new Date();

console.log("Tier 1 result:", result);
console.log(`Running time first algorithm = ${(end - start) / 1000} seconds\n`);

console.log("Tier 2 result:", result2);
console.log(`Running time first algorithm = ${(end2 - start2) / 1000} seconds\n`);