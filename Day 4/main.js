const fs = require('fs');
const path = require('path')

function part1() {
    const grid = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split('\r\n');
    let sum = 0;
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            const element = grid[row][col];
            if (element === '@' && countNeighbors(col, row, grid) < 4) {
                sum++;
            };
        };
    };
    return sum;
};

function part2() {
    const grid = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split('\r\n').map(row => row.split(''));
    let sum = 0;
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            const element = grid[row][col];
            if (element === '@' && countNeighbors(col, row, grid) < 4) {
                grid[row][col] = '.'
                if (row > 0) {
                    row--;
                }
                col = 0;
                sum++;
            };
        };
    };
    return sum;
};

function countNeighbors(col, row, grid) {
    const offsets = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];

    let count = 0;
    for (let [offsetRow, offsetCol] of offsets) {
        if (row + offsetRow < grid.length && row + offsetRow >= 0 &&
            col + offsetCol < grid[row].length && col + offsetCol >= 0 &&
            grid[row + offsetRow][col + offsetCol] == '@'
        ) {
            count++
        };
    };
    return count;
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