const fs = require('fs');
const path = require('path')

function part1() {
    const input = fs.readFileSync(path.join(__dirname, 'input2.txt')).toString().replaceAll('\r\n', '').split(',');

    let sum = 0;
    input.forEach(range => {
        const [firstId, secondId] = range.split('-').map(id => Number(id))
        for (let i = firstId; i <= secondId; i++) {
            const digits = Math.floor(Math.log10(i) + 1)
            const mod = 10 ** (digits / 2)
            const firstHalf = Math.floor(i / mod)
            const secondHalf = i % mod
            if (firstHalf === secondHalf) sum += i;
        }

    })
    return sum;
}

function part2() {
    const input = fs.readFileSync(path.join(__dirname, 'input2.txt')).toString().replaceAll('\r\n', '').split(',');
    let sum = 0;
    input.forEach(range => {
        const [firstId, secondId] = range.split('-').map(id => Number(id))
        for (let id = firstId; id <= secondId; id++) {
            const digits = Math.floor(Math.log10(id) + 1);
            for (let i = 2; i <= digits; i++) {
                if (digits % i == 0) {
                    const largoGrupo = digits / i;
                    const numGrupo = Math.floor(id / (10 ** (digits - largoGrupo)));
                    const expectedNum = numGrupo * (10 ** (i * largoGrupo) - 1) / (10 ** largoGrupo - 1); // Se aplica una serie geométrica.
                    if (expectedNum === id) {
                        sum += id;
                        break;
                    };
                };
            };
        };
    });
    return sum;
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