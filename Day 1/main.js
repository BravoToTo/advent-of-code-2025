const fs = require('fs');
const path = require('path');

function part1() {
    const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split('\r\n');

    let position = 50;
    let password = 0;
    input.forEach(line => {
        const direction = line[0];
        const distance = Number(line.substring(1));
        position = direction === 'R' ? (position + distance) % 100 : ((position - distance) % 100 + 100) % 100;
        if (position === 0) {
            password++;
        }
    })
    return password;
}

function part2() {
    const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split('\r\n');

    let position = 50;
    let password = 0;
    input.forEach(line => {
        const direction = line[0];
        const distance = Number(line.substring(1));
        password += Math.floor(distance / 100);

        const newPosition = direction === 'R' ? (position + distance) % 100 : ((position - distance) % 100 + 100) % 100;
        if (position !== 0) { // Para evitar sumar dos veces
            if ((direction === 'R' && newPosition <= position) || (direction === 'L' && newPosition >= position) || newPosition === 0) {
                password++;
            }
        }
        position = newPosition;
    })
    return password;
}

function part2B() {
    const input = fs.readFileSync(path.join(__dirname, 'input2.txt')).toString().split('\r\n');

    let position = 50;
    let password = 0;
    input.forEach(line => {
        const direction = line[0];
        const distance = Number(line.substring(1));
        password += Math.floor(distance / 100);
        let sign;
        if (direction === 'R') sign = 1
        else sign = -1

        if (position !== 0)
            if (position + sign * (distance % 100) >= 100 || position + sign * (distance % 100) <= 0) {
                password++;
            }

        position = direction === 'R' ? (position + distance) % 100 : ((position - distance) % 100 + 100) % 100;
    })
    return password;
};

console.log(part1());
console.log(part2());
console.log(part2B());