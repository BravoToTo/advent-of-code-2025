const fs = require('fs');
const path = require('path')

function reduceRanges(ranges) {
    const reducedRange = []
    let low = ranges[0][0];
    let high = ranges[0][1];
    for (const [lowRange, highRange] of ranges) {
        if (lowRange <= high) {
            high = Math.max(high, highRange);
        } else {
            reducedRange.push([low, high])
            low = lowRange;
            high = highRange;
        }
    }
    reducedRange.push([low, high]);

    return reducedRange;
}

function part1() {
    let [ranges, ingredients] = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split('\r\n\r\n').map(item => item.split('\r\n'));

    ranges = ranges.sort((a, b) => {
        return a.split('-')[0] - b.split('-')[0]
    }).map(range => range.split('-').map(Number));

    ingredients = ingredients.map(Number).sort((a, b) => a - b)

    const reducedRange = reduceRanges(ranges);

    let minBucket = 0;
    let freshCounter = 0;
    ingredients.forEach((ingredient) => {
        for (let i = minBucket; i < reducedRange.length; i++) {
            const [lowRange, highRange] = reducedRange[i];

            if (ingredient >= lowRange && ingredient <= highRange) {
                freshCounter++;
                break;
            } else if (ingredient > highRange) {
                minBucket = i
            }
        }
    })
    return freshCounter;
};

function part2() {
    let [ranges, ingredients] = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split('\r\n\r\n').map(item => item.split('\r\n'));

    ranges = ranges.sort((a, b) => {
        return a.split('-')[0] - b.split('-')[0]
    }).map(range => range.split('-').map(Number));

    ingredients = ingredients.map(Number).sort((a, b) => a - b)

    const reducedRange = reduceRanges(ranges);

    const freshCounter = reducedRange.map(range => {
        return range[1] - range[0] + 1;
    }).reduce((a, b) => a + b)

    return freshCounter
};

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