import { rawData } from "./rawData.js";

// const rawData = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
// Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
// Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
// Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
// Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

const rowData = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green`;

const turnData = ["6 red, 1 blue, 3 green"];

const processed = rawData.split(/\n/);

const processTurn = function (game) {
  const procGame = game.split(/, /);
  // console.log(procGame);
  const cubes = {
    red: 12,
    green: 13,
    blue: 14,
  };
  let possible = 0;
  procGame.forEach((colour) => {
    const numberColour = colour.split(/ [a-zA-Z]/);
    if (colour.includes("red")) {
      numberColour[0] > cubes.red ? (possible += 1) : (possible += 0);
    } else if (colour.includes("green")) {
      numberColour[0] > cubes.green ? (possible += 1) : (possible += 0);
    } else if (colour.includes("blue")) {
      numberColour[0] > cubes.blue ? (possible += 1) : (possible += 0);
    }
  });

  return possible;
};

// const processedTurns = turnData.map(processTurn);

const processGame = function (row) {
  const processRow = row.split(/: |; /);
  const game = processRow.shift();

  const gameNumber = game.match(/\d+/g)[0];
  const turn = processRow
    .map((turn) => processTurn(turn))
    .reduce((accumulator, currentValue) => accumulator + currentValue);
  if (turn == 0) {
    return parseInt(gameNumber);
  } else {
    return 0;
  }
};

const processAll = processed
  .map((row) => processGame(row))
  .reduce((accumulator, currentValue) => accumulator + currentValue);

// Part 1 Answer
// console.log(processAll);

const countTurn = function (game) {
  const procGame = game.split(/, /);
  return procGame;
};

const countGame = function (row) {
  const processRow = row.split(/: |; /);

  const game = processRow.shift();

  const gameNumber = game.match(/\d+/g)[0];

  const turn = processRow.map((turn) => countTurn(turn)).flat();

  console.log(turn);

  const cubes = {
    red: 0,
    green: 0,
    blue: 0,
  };

  turn.forEach((colour) => {
    const numberColour = colour.split(/ [a-zA-Z]/);
    const number = parseInt(numberColour[0]);
    if (colour.includes("red")) {
      number > cubes.red ? (cubes.red = number) : (cubes.red += 0);
    } else if (colour.includes("green")) {
      number > cubes.green ? (cubes.green = number) : (cubes.green += 0);
    } else if (colour.includes("blue")) {
      number > cubes.blue ? (cubes.blue = number) : (cubes.blue += 0);
    }
  });

  // use reduce to multiply the contents of the array
  const answer = cubes.red * cubes.blue * cubes.green;

  return answer;
};

const countAll = processed
  .map((row) => countGame(row))
  .reduce((accumulator, currentValue) => accumulator + currentValue);

console.log(countAll);
