import { rawData } from "./rawData.js";

const puzzleInput = rawData.split("\n");

const processArray = function (row) {
  const wordToNumberObject = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };
  Object.keys(wordToNumberObject).forEach((key) => {
    if (row.includes(key))
      row = row.replaceAll(key, `${key}${wordToNumberObject[key]}${key}`);
  });

  const numbersOnly = row.match(/\d/g);

  const firstAndLast = numbersOnly[0] + numbersOnly.pop();

  return parseInt(firstAndLast);
};

const firstAndLastArray = puzzleInput.map(processArray);

const coordinates = firstAndLastArray.reduce((x, y) => x + y);

console.log(coordinates);

const partTwo = rawData
  .split("\n")
  .map((row) => {
    const numberMap = {
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9,
    };
    Object.keys(numberMap).forEach((key) => {
      if (row.includes(key))
        row = row.replaceAll(key, `${key}${numberMap[key]}${key}`);
    });
    const firstDigit = row.match(/\d/)[0];
    const lastDigit = row.match(/(\d)[a-z]*$/)[1];
    return parseInt(`${firstDigit}${lastDigit}`);
  })
  .reduce((acc, curr) => acc + curr, 0);

console.log(partTwo);
