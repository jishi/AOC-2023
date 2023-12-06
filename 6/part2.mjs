import fs from 'fs';
import path from 'path';

const startTime = process.hrtime.bigint();

const input = fs.readFileSync(path.join(path.dirname(process.argv[1]), 'input.txt')).toString();

const rows = input.split('\n');

const [title, data] = rows[0].split(/: +/);
const [title2, data2] = rows[1].split(/: +/);

const time = Number(data.split(/ +/).join(''));
const distance = Number(data2.split(/ +/).join(''));

console.log(time, distance);

let k = 0;

for (let j = 1; j < time; j++) {
  const timeTaken = j + distance/j;
  if (timeTaken < time) {
    k++;
  }
}

console.log(k);

console.log(process.hrtime.bigint() - startTime);