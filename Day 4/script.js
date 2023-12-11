import { rawData } from "./rawData.js";

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

const winCount = (wins, i) => {
  const winCount = wins.length;
  const card = i + 1;
  const cardCount = 1;
  return { card, cardCount, winCount };
};

const cardAdd = () => {};

const part1 = rawData
  .split(/\n/)
  .map(cardObjects)
  .map(punterWin)
  .map(calculatePoints)
  .filter((a) => a >= 1)
  .reduce((acc, cur) => acc + cur);

const part2 = rawData.split(/\n/).map(cardObjects).map(punterWin).map(winCount);

console.log(part2);
