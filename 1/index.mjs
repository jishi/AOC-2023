import fs from 'fs';
import path from 'path';

const startTime = process.hrtime.bigint();

console.log(process.argv[1])

const input = fs.readFileSync(path.join(path.dirname(process.argv[1]), 'input.txt'));

const lines = input.toString('utf-8').split('\n');

let total1 = 0;
let total2 = 0;

const numberMap = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
};

const keysAndValues = Object.keys(numberMap);
keysAndValues.push(...Object.values(numberMap));

const total = lines.forEach((line) => {
  const matches = Array.from(line.match(/\d/g));

  let stringNumber = matches[0];
  stringNumber += matches.pop();

  total1 += + Number(stringNumber);

  const numbers = Array.from(line.matchAll(new RegExp(`(?=(${keysAndValues.join('|')}))`, 'g'))).map(x => {
    return numberMap[x[1]] ?? x[1];
  });

  const allnumbers = numbers.join(',');

  stringNumber = numbers[0];
  stringNumber += numbers.pop();

  total2 += Number(stringNumber);
});

console.log('part 1', total1);
console.log('part 2', total2);

const duration = process.hrtime.bigint() - startTime;

console.log(`Time taken: ${duration} ns (${duration/1000000n} ms)`);