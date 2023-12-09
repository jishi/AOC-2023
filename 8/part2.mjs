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

let currents = Object.keys(map).filter(x => x.endsWith('A'));

console.log(currents);

const iterations = [];

currents.forEach(current => {
  let i = 0;
  while (!current.endsWith('Z')) {
    current = map[current][movement[i++%movement.length]];
  }

  iterations.push(i);
})

console.log(iterations);

function gcd(a, b) {
  for (let temp = b; b !== 0;) {
    b = a % b;
    a = temp;
    temp = b;
  }
  return a;
}

function lcmFunction(a, b) {
  const gcdValue = gcd(a, b);
  return (a * b) / gcdValue;
}

const lcm = iterations.reduce((prev,curr) => {
  return lcmFunction(prev, curr);
});

console.log(lcm)

console.log(process.hrtime.bigint() - startTime);