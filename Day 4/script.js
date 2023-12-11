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
  const points = Math.pow(2, matchingNumber.length - 1);
  return points;
};

const part1 = rawData
  .split(/\n/)
  .map(cardObjects)
  .map(punterWin)
  .filter((a) => a >= 1)
  .reduce((acc, cur) => acc + cur);

console.log(part1);
