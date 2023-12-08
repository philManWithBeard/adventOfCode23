import { rawData } from "./rawData.js";

// const rawData = `467..114..
// ...*......
// ..35..633.
// ......#...
// 617*......
// .....+.58.
// ..592.....
// ......755.
// ...$.*....
// .664.598..`;

// Create array to hold structured data
let partPosition = [];

// Work out length of line - checked
const lengthOfLine = rawData.match(/\n/).index;

// Remove all newlines from string
const data = rawData.replace(/\n/g, "");

// function to get the x and y position of the part /valid
const xyPosition = (x, y) => [Math.floor(x / y), x % y];

// valid
const createPart = (partNumber) => {
  // find position of partNumber
  let numberIndex = partNumber[0];
  const positionArray = xyPosition(numberIndex, lengthOfLine);
  // get the position of all digits in number
  let numberIndexArray = [];
  for (let i = 0; i < partNumber[1].length; i++) {
    numberIndexArray.push(positionArray[1] + i);
  }

  partPosition.push({
    part: {
      number: partNumber[1],
      xPosition: numberIndexArray,
      yPosition: positionArray[0],
    },
  });
};

const regex = /(\d+)/gi;

const indexPairs = [];

let matchArr = [];

while (null !== (matchArr = regex.exec(data))) {
  createPart([matchArr.index, matchArr[1]]);
}

// test
const targetSpaces = partPosition
  .map((part, i) => {
    const targetColumns = [];
    const leftOf = partPosition[i].part.xPosition[0] - 1;
    const rightOf = partPosition[i].part.xPosition.at(-1) + 1;
    const partNumbers = partPosition[i].part.xPosition;
    targetColumns.push(leftOf, partNumbers, rightOf);
    const rowAbove = partPosition[i].part.yPosition - 1;
    const rowBelow = partPosition[i].part.yPosition + 1;
    const targetRows = [rowAbove, partPosition[i].part.yPosition, rowBelow];
    const flatTargetColumns = targetColumns.flat();
    const targetPositions = [];
    for (let y = 0; y < targetRows.length; y++) {
      for (let x = 0; x < flatTargetColumns.length; x++) {
        targetPositions.push([
          targetRows[y] * lengthOfLine + flatTargetColumns[x],
          part.part.number,
        ]);
      }
    }

    return targetPositions;
    // return [flatTargetColumns, targetRows];
  })
  .flat();

const specialCharacterIndex = [];

const splitData = data.split("");

for (let i = 0; i < splitData.length; i++) {
  if (splitData[i].match(/[*]/)) {
    specialCharacterIndex.push(i);
  }
}

const countGearRatios = [];

specialCharacterIndex.forEach((specialCharacterPosition) => {
  let numberArray = [];
  for (let s = 0; s < targetSpaces.length; s++) {
    if (specialCharacterPosition == targetSpaces[s][0]) {
      numberArray.push(parseInt(targetSpaces[s][1]));
    }
  }
  if (numberArray.length > 1) {
    countGearRatios.push(numberArray[0] * numberArray[1]);
  }
});

const part2 = countGearRatios.reduce(
  (accumulator, currentValue) => accumulator + currentValue
);
console.log(part2);
