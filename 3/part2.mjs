import fs from 'fs';
import path from 'path';

const startTime = process.hrtime.bigint();

function isOverlap(r1, r2) {
  return r1[0][0] < r2[1][0]
    && r1[1][0] >= r2[0][0]
    && r1[0][1] <= r2[1][1]
    && r1[1][1] >= r2[0][1];
}

const input = fs.readFileSync(path.join(path.dirname(process.argv[1]), 'input.txt'));

const lines = input.toString().split('\n');

const gears= [];

const numbersOnLine = [];

lines.forEach((line, i) => {
  const numbers = Array.from(line.matchAll(/\d+/g));

  numbersOnLine[i] = numbers.map(x => {
    return {
      value: Number(x[0]),
      x1: x.index,
      x2: x.index + x[0].length,
      y1: i,
      y2: i
    };
  });

  const chars = line.split('');
  chars.forEach((ch,j) => {
    if (ch !== '*') return;
    gears.push([j, i]);
  });
});

let gearSum = 0;

gears.forEach(g => {
  const gearRect = [g.map(x => x-1), g.map(x=>x+1)];

  const ratios = [];

  for (let i = Math.max(g[1]-1, 0); i <= Math.min(g[1]+1, lines.length-1); i++) {
    const numbers = numbersOnLine[i].filter(x => isOverlap(gearRect, [[x.x1,x.y1],[x.x2,x.y2]]));

    ratios.push(...numbers.map(x => x.value));
  }

  if (ratios.length == 2) {
    gearSum += ratios[0]*ratios[1];
  }
});



console.log(gearSum);
console.log(process.hrtime.bigint() - startTime, 'ns');
console.log(Number((process.hrtime.bigint() - startTime)/BigInt(1e6)), 'ms');