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

// Work out length of line
const lengthOfLine = rawData.match(/\n/).index;

// Remove all newlines from string
const data = rawData.replace(/\n/g, "");

// function to get the x and y position of the part
const xyPosition = (x, y) => [Math.floor(x / y), x % y];

const createPart = (partNumber) => {
  // find position of partNumber
  let numberIndex = data.indexOf(partNumber);
  const positionArray = xyPosition(numberIndex, lengthOfLine);
  // get the position of all digits in number
  let numberIndexArray = [];
  for (let i = 0; i < partNumber.length; i++) {
    numberIndexArray.push(positionArray[1] + i);
  }
  partPosition.push({
    part: {
      number: partNumber,
      xPosition: numberIndexArray,
      yPosition: positionArray[0],
    },
  });
};

// Take the raw data
// identify all numbers between 1-999 and put them in an array
// Call the partNumber function for each item in the array and pass in the partNumber
let matches = rawData
  .match(/(\d+)/g)
  .forEach((partNumber) => createPart(partNumber));

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

// const rightOf = part.xPosition.at(-1)++;

// console.log(targetSpaces);

const specialCharacterIndex = [];

const splitData = data.split("");

for (let i = 0; i < splitData.length; i++) {
  if (splitData[i].match(/[-’/`~!#*$@_%+=,^&(){}[\]|;:”<>?\\]/)) {
    specialCharacterIndex.push(i);
  }
}
// console.log(specialCharacterIndex);

// const specialCharacterArray = specialCharacters.map((specialCharacter) => {
//   // find position of special character
//   let numberIndex = data.indexOf(specialCharacter);
//   console.log(numberIndex);
//   const positionArray = xyPosition(numberIndex, lengthOfLine);
//   return positionArray;
// });

const countActualParts = [];

const actualParts = specialCharacterIndex.forEach(
  (specialCharacterPosition) => {
    // console.log(specialCharacterPosition);
    for (let s = 0; s < targetSpaces.length; s++) {
      // console.log(s);
      // console.log(targetSpaces[s]);
      // console.log(specialCharacterPosition);
      if (specialCharacterPosition == targetSpaces[s][0]) {
        countActualParts.push(parseInt(targetSpaces[s][1]));
      }
    }
  }
);

console.log(
  countActualParts.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  )
);
