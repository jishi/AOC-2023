import fs from 'fs';
import path from 'path';

const startTime = process.hrtime.bigint();

const input = fs.readFileSync(path.join(path.dirname(process.argv[1]), 'input.txt')).toString();

const rows = input.split('\n');

const cardSets = rows.map(x => {
  const [cards, bid] = x.split(' ');
  return { cards, bid };
})

const valueMap = {
  A: 14,
  K: 13,
  Q: 12,
  T: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
  J: 1
};

function sortByComposition(a,b) {
  a = a.cards;
  b = b.cards;
  const aValue = valueFromComposition(a);
  const bValue = valueFromComposition(b);
  if (aValue < bValue) return 1;
  if (aValue > bValue) return -1;

  for (let i = 0; i < 5; i++) {
    if (valueMap[a.charAt(i)] < valueMap[b.charAt(i)]) return 1;
    if (valueMap[a.charAt(i)] > valueMap[b.charAt(i)]) return -1;
  }

  return 0;
}

function valueFromComposition(cardString) {
  const cards = cardString.split('');
  const charsAsArray = {};
  let char;
  while (char = cards.pop()) {
    if (!charsAsArray[char]) {
      charsAsArray[char] = [];
    }

    charsAsArray[char].push(char);
  }

  if (Object.keys(charsAsArray).length > 1 && charsAsArray['J']) {
    const jokers = charsAsArray['J'];
    delete charsAsArray['J'];
    const repeatedCards = Object.keys(charsAsArray).sort((a,b) => {
      const aArray = charsAsArray[a];
      const bArray = charsAsArray[b];
      if (aArray.length < bArray.length) return 1;
      if (aArray.length > bArray.length) return -1;
      return 0;
    });

    // Add jokers to the most repeated card
    charsAsArray[repeatedCards[0]].push(...jokers);
  }

  const cardsAsArrays = Object.values(charsAsArray);


  if (cardsAsArrays.length == 1) {
    // Five of a kind
    return 6;
  }

  if (cardsAsArrays.length == 2) {

    if (cardsAsArrays.some(x => x.length == 4)) {
      // four of a kind
      return 5;
    }

    // full house
    return 4;
  }

  if (cardsAsArrays.length == 3) {
    if (cardsAsArrays.some(x => x.length == 3)) {
      // Three of a kind
      return 3;
    }

    // two pairs
    return 2;
  }

  if (cardsAsArrays.some(x => x.length == 2)) {
    // pair
    return 1;
  }

  return 0;
}

cardSets.sort(sortByComposition);

let sum = 0;

cardSets.reverse().forEach((x,i) => {
  sum += Number(x.bid) * (i+1);
})

console.log(sum);

console.log(process.hrtime.bigint() - startTime);