import fs from 'fs';
import path from 'path';

const startTime = process.hrtime.bigint();

const input = fs.readFileSync(path.join(path.dirname(process.argv[1]), 'input.txt'));

const lines = input.toString().split('\n');

let points = 0;

lines.forEach(line => {
  const [card, numbers] = line.split(':');

  const [winningRaw, yoursRaw] = numbers.trim().split('|');

  const winning = new Set(winningRaw.trim().split(/ +/).map(Number));
  const yours = yoursRaw.trim().split(/ +/).map(Number);

  const cardPoints = yours.filter(x => winning.has(x)).length;

  if (cardPoints == 0) return;
  points += Math.pow(2, cardPoints - 1);
});

console.log(points);
console.log(process.hrtime.bigint() - startTime, 'ns');