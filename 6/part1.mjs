import fs from 'fs';
import path from 'path';

const startTime = process.hrtime.bigint();

const input = fs.readFileSync(path.join(path.dirname(process.argv[1]), 'input.txt')).toString();

const rows = input.split('\n');

const [title, data] = rows[0].split(/: +/);
const [title2, data2] = rows[1].split(/: +/);

const times = data.split(/ +/).map(Number);
const distances = data2.split(/ +/).map(Number);

console.log(times, distances);

const possibilities = [];

times.forEach((t,i) => {
  const distance = distances[i];

  let k = 0;

  for (let j = 1; j < t; j++) {
    const timeTaken = j + distance/j;
    if (timeTaken < t) {
      k++;
    }
  }

  possibilities.push(k);
});

const totalPossibilities = possibilities.reduce((i,x) => i*x);

console.log(totalPossibilities);
console.log(process.hrtime.bigint() - startTime);