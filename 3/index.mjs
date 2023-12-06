import fs from 'fs';
import path from 'path';

const startTime = process.hrtime.bigint();

const input = fs.readFileSync(path.join(path.dirname(process.argv[1]), 'input.txt'));

const lines = input.toString().split('\n');

const symbols= [];

lines.forEach((line, i) => {
  symbols[i] = [];
  const chars = line.split('');
  chars.forEach(ch => {
    symbols[i].push(/[^\d\.]/.test(ch));
  });
});

const parts = [];

lines.forEach((line, i) => {
  const matches = Array.from(line.matchAll(/\d+/g));
  matches.forEach(m => {
    const start = m.index - 1;
    const end = m.index + m[0].length;

    const lines = [i-1, i, i+1];

    const positions = [];

    for (let x = start; x <= end; x++) {
      positions.push([x, lines[0]]);
      positions.push([x, lines[1]]);
      positions.push([x, lines[2]]);
    }

    positions.forEach(pos => {
      if (!symbols[pos[1]]) return;
      console.log(pos, symbols[pos[1]]);
    });

    if (positions.some(pos => symbols[pos[1]] && symbols[pos[1]][pos[0]])) {
      parts.push(Number(m[0]));
    }
  });
});

console.log(parts);
console.log(parts.reduce((input, current) => input + current, 0));
