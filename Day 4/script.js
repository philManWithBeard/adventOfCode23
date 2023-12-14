import { rawData } from "./rawData.js";

// const rawData = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
// Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
// Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
// Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
// Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
// Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

const cardObjects = (card) => {
  const cardNumber = card.match(/\d+(?=:)/)[0];
  const winningNumbers = card
    .match(/(?<=:)(.*?)(?=\|)/)[0]
    .trim()
    .split(/\s+/);
  const punterNumbers = card
    .match(/(?<=\|)(.*)/)[0]
    .trim()
    .split(/\s+/);
  return { cardNumber, winningNumbers, punterNumbers };
};

const punterWin = (card) => {
  const matchingNumber = card.winningNumbers.filter((w) =>
    card.punterNumbers.includes(w)
  );
  return matchingNumber;
};

const calculatePoints = (matchingNumber) => {
  const points = Math.pow(2, matchingNumber.length - 1);
  return points;
};

const cardWin = (wins, i) => {
  const winCount = wins.length;
  const card = i + 1;
  const cardCount = 1;
  return { card, cardCount, winCount };
};

const cardAdd = (cardWinCount, i) => {
  const winCount = cardWinCount.winCount;
  for (let x = 0; x < winCount; x++) {
    part2Array[i + x + 1].cardCount += cardWinCount.cardCount;
  }
};

const part1 = rawData
  .split(/\n/)
  .map(cardObjects)
  .map(punterWin)
  .map(calculatePoints)
  .filter((a) => a >= 1)
  .reduce((acc, cur) => acc + cur);

const part2Array = rawData
  .split(/\n/)
  .map(cardObjects)
  .map(punterWin)
  .map(cardWin);

part2Array.forEach(cardAdd);

console.log(part2Array);

const part2 = part2Array
  .map((card) => card.cardCount)
  .reduce((acc, cur) => acc + cur);

console.log(part2);
