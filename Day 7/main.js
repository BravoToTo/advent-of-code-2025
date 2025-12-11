const fs = require('fs');
const path = require('path')

function part1() {
    let input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split('\r\n').map(row => row.split(''));

    const startingPosition = input[0].findIndex(value => value === 'S');
    const beams = [[startingPosition]]
    let splitCounter = 0;
    let row = 0;
    while (row < input.length - 1) {
        beams.push([])
        let newBeams = []
        while (beams[row].length > 0) {
            const beamIdx = beams[row].pop()
            if (input[row + 1][beamIdx] === '^') {
                splitCounter++
                if (beamIdx + 1 < input[row + 1].length && input[row + 1][beamIdx + 1] !== '|') {
                    newBeams.push(beamIdx + 1)
                    input[row + 1][beamIdx + 1] = '|';
                }
                if (beamIdx - 1 >= 0 && input[row + 1][beamIdx - 1] !== '|') {
                    newBeams.push(beamIdx - 1)
                    input[row + 1][beamIdx - 1] = '|';

                }
            }
            else if (input[row + 1][beamIdx] === '.') {
                newBeams.push(beamIdx)
                input[row + 1][beamIdx] = '|';
            }
        }
        beams[row + 1].push(...newBeams)
        row++;
    }
    return splitCounter;
};

function part2() {
    let input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split('\r\n').map(row => row.split(''));

    const startingPosition = input[0].findIndex(value => value === 'S');
    let row = 2;
    let beams = Array(input.length).fill(0);
    beams[startingPosition] = 1;
    while (row < input.length) {
        const newBeams = Array(input.length).fill(0);
        for (let i = 0; i < beams.length; i++) {
            const beamCount = beams[i];
            if (beamCount && input[row][i] === '^') {
                newBeams[i - 1] += beamCount;
                newBeams[i + 1] += beamCount;
            } else {
                newBeams[i] += beamCount;
            }
        }
        beams = Array.from(newBeams)
        row += 2;
    }
    return beams.reduce((a, b) => a + b);
};

const start = new Date();
const result = part1();
const end = new Date();

const start2 = new Date();
const result2 = part2();
const end2 = new Date();

console.log("Tier 1 result:", result);
console.log(`Running time = ${(end - start) / 1000} seconds\n`);

console.log("Tier 2 result:", result2);
console.log(`Running time = ${(end2 - start2) / 1000} seconds\n`);
