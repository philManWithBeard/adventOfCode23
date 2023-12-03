// import { rawData } from "./rawData.js";

const rawData = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

const rowData = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green`;

const cubes = {
  red: 12,
  green: 13,
  blue: 14,
};

const turnData = [" 6 red, 1 blue, 3 green", " 2 blue, 1 red, 2 green"];

const processed = rawData.split(/\n/);

const rowDataSplit = rowData.split(/:|;/);

const processTurn = function (game) {
  const procGame = game.split(/,/);
  console.log(procGame);
};

const processedTurns = turnData.map(processTurn);

const processGame = function (row) {
  const processRow = row.split(/:|;/);
  const game = processRow.shift();
  const gameNumber = game.slice(-1);
  const turn = processRow.map();
  // console.log(processRow[1]);
  // const colours = processRow.split(/,/);
  // console.log(colours);
};

// const mapped = processed.map(processGame);

// console.log(processed);

const dataAsObject = {
  Cubes: {
    Game: 1,
    Turn: {
      Result: {
        number: 1,
        blue: 0,
        green: 0,
        red: 0,
      },
      Result: {
        number: 1,
        blue: 0,
        green: 0,
        red: 0,
      },
    },
  },
};
