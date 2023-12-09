import fs from 'fs';
import path from 'path';

const startTime = process.hrtime.bigint();

const input = fs.readFileSync(path.join(path.dirname(process.argv[1]), 'input.txt')).toString();

const rows = input.split('\n');

const movementString = rows.shift();
rows.shift();

const map = {};

const movement = movementString.split('').map(x => x == 'L' ? 0 : 1);


rows.forEach(x => {
  if (!x) return;
  const matches = x.match(/(\w+) = \((\w+), (\w+)\)/);
  map[matches[1]] = [matches[2], matches[3]];
});

console.log(map, movement);

let current = 'AAA';
let steps = 0;
let i = 0;
while (current != 'ZZZ') {
  current = map[current][movement[i++%movement.length]];
}

console.log(i);