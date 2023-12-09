import fs from 'fs';
import path from 'path';

const startTime = process.hrtime.bigint();

const input = fs.readFileSync(path.join(path.dirname(process.argv[1]), 'input.txt')).toString();

const rows = input.split('\n');

let sum = 0;

rows.forEach(row => {
  const series = row.split(' ').map(Number);

  let nextValue = firstInSeries(series);

  sum += nextValue;
});

console.log(sum);
console.log(process.hrtime.bigint() - startTime);

function firstInSeries(series) {
  const nextSeries = [];
  series.reduce((i,j) => {
    nextSeries.push(j-i);
    return j;
  });

  let nextValue = 0;

  if (nextSeries.some(x => x != 0)) {
    nextValue = firstInSeries(nextSeries);
  }


  const first = series[0] - nextValue;;

  return first;
}