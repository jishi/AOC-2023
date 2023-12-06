import fs from 'fs';
import path from 'path';

const startTime = process.hrtime.bigint();

const input = fs.readFileSync(path.join(path.dirname(process.argv[1]), 'input.txt'));

const lines = input.toString().split('\n');

let counter = 0;
let gameIdCounter = 0;

// Part 1
lines.forEach(x => {
  const [game, data] = x.split(':').map(x => x.trim());
  const [_, id] = game.split(' ');
  const sets = data.split(';').map(x => x.trim());

  const isPossible = sets.every(set => {
    const rounds = Object.fromEntries(set.split(',').map(x => {
      const [count, color] = x.trim().split(' ');
      return [color,count];
    }));

    return ((rounds.red ?? 0) <= 12 && (rounds.green ?? 0) <= 13 && (rounds.blue ?? 0) <= 14);
  });

  if (isPossible) {
    console.log(id)
    gameIdCounter += Number(id);
  }
});

console.log(gameIdCounter);

// lines.forEach(x => {
//   const [__, data] = x.split(':').map(x => x.trim());
//   const sets = data.split(';').map(x => x.trim());
//
//   const parsedSets = sets.map(set => {
//     const rounds = Object.fromEntries(set.split(',').map(x => {
//       const [count, color] = x.trim().split(' ');
//       return [color,count];
//     }));
//
//     return rounds;
//   });
//
//   const totals = {
//     red: Math.max(...parsedSets.map(x => Number(x.red)).filter(x => x), 1),
//     blue: Math.max(...parsedSets.map(x => Number(x.blue)).filter(x => x), 1),
//     green: Math.max(...parsedSets.map(x => Number(x.green)).filter(x => x), 1)
//   };
//
//   counter += totals.red * totals.blue * totals.green;
// });
//
// console.log(counter);

