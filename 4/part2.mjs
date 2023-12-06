import fs from 'fs';
import path from 'path';

const startTime = process.hrtime.bigint();

const input = fs.readFileSync(path.join(path.dirname(process.argv[1]), 'input.txt'));

const lines = input.toString().split('\n');

const pointsPerCard= lines.map(line => {
  const [card, numbers] = line.split(':');

  const [winningRaw, yoursRaw] = numbers.trim().split('|');

  const winning = new Set(winningRaw.trim().split(/ +/).map(Number));
  const yours = yoursRaw.trim().split(/ +/).map(Number);

  const cardPoints = yours.filter(x => winning.has(x)).length;

  return cardPoints;
});

const numberOfCards = new Array(lines.length).fill(1); // you have an original set of cards
const maxIndex = lines.length-1;

pointsPerCard.forEach((points, i) => {
  let multiplier = numberOfCards[i];

  for (let j = 1; j <= points; j++ ) {
    if (i + j > maxIndex) continue;
    numberOfCards[i + j] += multiplier;
  }
});
console.log(numberOfCards, numberOfCards.reduce((prev, current) => prev+current, 0));
console.log(process.hrtime.bigint() - startTime, 'ns');
console.log(Number((process.hrtime.bigint() - startTime)/BigInt(1e6)), 'ms');