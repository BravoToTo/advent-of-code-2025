const fs = require('fs');
const path = require('path')

function part1() {
    let input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split('\r\n').map(box => box.split(',').map(Number));

    let distanceMap = new Map()
    for (let i = 0; i < input.length; i++) {
        const [x1, y1, z1] = input[i];
        for (let j = 0; j < input.length; j++) {
            if (i !== j) {
                const [x2, y2, z2] = input[j];
                const distance = calculateDistance(x1, y1, z1, x2, y2, z2)

                if (!distanceMap.has(`${j}_${i}`)) {
                    distanceMap.set(`${i}_${j}`, distance)
                }
            }
        }
    }

    const distances = []
    for (const [key, value] of distanceMap.entries()) {
        const [firstBox, secondBox] = key.split('_').map(Number)
        distances.push([firstBox, secondBox, value])
    }
    distances.sort((a, b) => {
        return a[2] - b[2]
    })

    let network = []
    for (let i = 0; i < 1000; i++) {
        const firstBox = distances[i][0]
        const secondBox = distances[i][1]
        let indexCircuitA = -1
        let indexCircuitB = -1
        for (const [j, circuit] of network.entries()) {
            if (circuit.has(firstBox)) indexCircuitA = j // -> A
            if (circuit.has(secondBox)) indexCircuitB = j // -> B
        }
        if (indexCircuitA === -1 && indexCircuitB === -1) {
            network.push(new Set([firstBox, secondBox]))
        }
        else if (indexCircuitA !== -1 && indexCircuitB === -1) {
            network[indexCircuitA].add(secondBox)
        }
        else if (indexCircuitA === -1 && indexCircuitB !== -1) {
            network[indexCircuitB].add(firstBox)
        }
        else if (indexCircuitA !== -1 && indexCircuitB !== -1 && indexCircuitA !== indexCircuitB) {
            let mergedSet = new Set([...network[indexCircuitA], ...network[indexCircuitB]])
            network.splice(Math.max(indexCircuitA, indexCircuitB), 1)
            network.splice(Math.min(indexCircuitA, indexCircuitB), 1)
            network.push(mergedSet)
        }
    }
    network.sort((a, b) => b.size - a.size)
    let result = 1;
    if (network.length >= 3) {
        result *= network[0].size * network[1].size * network[2].size
    }
    return result;
};

function part2() {
    let input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split('\r\n').map(box => box.split(',').map(Number));

    let distanceMap = new Map()
    for (let i = 0; i < input.length; i++) {
        const [x1, y1, z1] = input[i];
        for (let j = 0; j < input.length; j++) {
            if (i !== j) {
                const [x2, y2, z2] = input[j];
                const distance = calculateDistance(x1, y1, z1, x2, y2, z2)
                if (!distanceMap.has(`${j}_${i}`)) {
                    distanceMap.set(`${i}_${j}`, distance)
                }
            }
        }
    }

    const distances = []
    for (const [key, value] of distanceMap.entries()) {
        const [firstBox, secondBox] = key.split('_').map(Number)
        distances.push([firstBox, secondBox, value])
    }
    distances.sort((a, b) => {
        return a[2] - b[2]
    })

    let network = []
    let i = 0
    let mult = 1;
    do {
        const firstBox = distances[i][0]
        const secondBox = distances[i][1]
        let indexCircuitA = -1
        let indexCircuitB = -1
        for (const [j, circuit] of network.entries()) {
            if (circuit.has(firstBox)) indexCircuitA = j // -> A
            if (circuit.has(secondBox)) indexCircuitB = j // -> B
        }
        if (indexCircuitA === -1 && indexCircuitB === -1) {
            network.push(new Set([firstBox, secondBox]))
        }
        else if (indexCircuitA !== -1 && indexCircuitB === -1) {
            network[indexCircuitA].add(secondBox)
        }
        else if (indexCircuitA === -1 && indexCircuitB !== -1) {
            network[indexCircuitB].add(firstBox)
        }
        else if (indexCircuitA !== -1 && indexCircuitB !== -1 && indexCircuitA !== indexCircuitB) {
            let mergedSet = new Set([...network[indexCircuitA], ...network[indexCircuitB]])
            network.splice(Math.max(indexCircuitA, indexCircuitB), 1)
            network.splice(Math.min(indexCircuitA, indexCircuitB), 1)
            network.push(mergedSet)
        }
        if (network.length === 1) {
            mult = input[firstBox][0] * input[secondBox][0]
        }
        i++;
    } while (network.length > 1 || network[0].size !== input.length)

    return mult;
};

function calculateDistance(x1, y1, z1, x2, y2, z2) {
    return Math.sqrt(((x1 - x2) ** 2) + ((y1 - y2) ** 2) + ((z1 - z2) ** 2))
}

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
