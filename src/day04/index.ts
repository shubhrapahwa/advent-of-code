import { readFileSync } from "fs";

const getIndexOfK = (arr: number[][], k: number): number[] | undefined => {
  for (let row = 0; row < arr.length; row++) {
    let column = arr[row].indexOf(k);
    if (column > -1) {
      return [row, column];
    }
  }
};

const chunkArray = (arr: string[], chunk_size: number): number[][][] => {
  const results = [];

  while (arr.length) {
    const x = arr.splice(0, chunk_size);

    if (x.length === 1 && x[0] === "") {
    } else {
      const [a, ...others] = x;
      const o1 = others.map((y: string): number[] => {
        const bbb = y.split(" ");
        return bbb.filter((x) => x !== "").map((x) => +x);
      });
      results.push(o1);
    }
  }

  return results;
};

const getSum = (arr: number[][], positions: Position[] | undefined): number => {
  if (positions === undefined) {
    return arr.flat().reduce((acc, curr) => acc + curr);
  }

  const arr1 = [...arr];

  positions.reduce(
    (previousValue: Position, currentValue: Position): Position => {
      arr1[currentValue.x][currentValue.y] = 0;

      return previousValue;
    },
    positions[0]
  );

  return arr1.flat().reduce((acc, curr) => acc + curr);
};

interface Position {
  x: number;
  y: number;
}

/**
 * Part - 1
 */
export const calculateResultPart1 = (filePath: string): void => {
  const inputArray = readFileSync(filePath, "utf8").split("\n");

  const [pl, ...others] = inputArray;

  const playingNumbers = pl.split(",").map((num: string): number => +num);

  const boards = chunkArray(others, 6);

  let markedMap = new Map<number, Position[]>();
  let resultROW: number[] = [];
  let pnNumber: number = playingNumbers[0];
  let resultKey: number = 0;

  for (let i = 0; i < playingNumbers.length; i++) {
    const currentPN = playingNumbers[i];

    markedMap = boards.reduce(
      (
        accumulator: Map<number, Position[]>,
        currentValue: number[][],
        currentIndex: number
      ): Map<number, Position[]> => {
        const getIndex = getIndexOfK(currentValue, currentPN);
        if (getIndex !== undefined) {
          const curr = accumulator.get(currentIndex);
          const position: Position = {
            x: getIndex[0],
            y: getIndex[1],
          };

          if (curr === undefined) {
            accumulator.set(currentIndex, [position]);
          } else {
            curr.push(position);
            accumulator.set(currentIndex, curr);
          }
        }

        return accumulator;
      },
      markedMap
    );

    markedMap.forEach((value, key) => {
      if (value.length >= 5) {
        const x = value.map((x) => x.x);
        const y = value.map((y) => y.y);

        const occurrencesX = x.reduce(function (acc: any, curr: number) {
          return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
        }, {});

        const valuesX = Object.values(occurrencesX).find((x) => x === 5);

        if (valuesX !== undefined) {
          const indexOfX =
            Object.keys(occurrencesX).find(
              (key) => occurrencesX[key] === valuesX
            ) ?? "0";
          resultKey = key;
          resultROW = boards[key][+indexOfX];
          pnNumber = currentPN;

          return;
        }

        const occurrencesY = y.reduce(function (acc: any, curr: number) {
          return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
        }, {});

        const valuesY = Object.values(occurrencesY).find((y) => y === 5);

        if (valuesY !== undefined) {
          const indexOfY =
            Object.keys(occurrencesY).find(
              (key) => occurrencesY[key] === valuesY
            ) ?? "0";
          resultKey = key;
          resultROW = boards[key][+indexOfY];
          pnNumber = currentPN;
          return;
        }
      }
    });

    if (resultROW.length !== 0) {
      const sumOfUnMarkedNumbers = getSum(
        boards[resultKey],
        markedMap.get(resultKey)
      );

      console.log(sumOfUnMarkedNumbers * pnNumber);

      return;
    }
  }
};

/**
 * Part - 2
 */
export const calculateResultPart2 = (filePath: string): void => {
  const inputArray = readFileSync(filePath, "utf8").split("\n");

  const [pl, ...others] = inputArray;

  const playingNumbers = pl.split(",").map((num: string): number => +num);

  const boards = chunkArray(others, 6);

  let markedMap = new Map<number, Position[]>();
  let pnNumber: number = playingNumbers[0];
  let resultKey: number = 0;
  let markedBoard: Set<number> = new Set<number>();

  for (let i = 0; i < playingNumbers.length; i++) {
    const currentPN = playingNumbers[i];

    markedMap = boards.reduce(
      (
        accumulator: Map<number, Position[]>,
        currentValue: number[][],
        currentIndex: number,
        arr: number[][][]
      ): Map<number, Position[]> => {
        const getIndex = getIndexOfK(currentValue, currentPN);
        if (getIndex !== undefined) {
          const curr = accumulator.get(currentIndex);
          const position: Position = {
            x: getIndex[0],
            y: getIndex[1],
          };

          if (curr === undefined) {
            accumulator.set(currentIndex, [position]);
          } else {
            curr.push(position);
            accumulator.set(currentIndex, curr);
          }
        }

        return accumulator;
      },
      markedMap
    );

    markedMap.forEach((value, key) => {
      if (markedBoard.has(key)) {
        return;
      }

      if (value.length >= 5) {
        const x = value.map((x) => x.x);
        const y = value.map((y) => y.y);

        const occurrencesX = x.reduce(function (acc: any, curr: number) {
          return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
        }, {});

        const valuesX = Object.values(occurrencesX).find((x) => x === 5);

        if (valuesX !== undefined) {
          resultKey = key;
          pnNumber = currentPN;
          markedBoard.add(key);

          return;
        }

        const occurrencesY = y.reduce(function (acc: any, curr: number) {
          return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
        }, {});

        const valuesY = Object.values(occurrencesY).find((y) => y === 5);

        if (valuesY !== undefined) {
          resultKey = key;
          pnNumber = currentPN;
          markedBoard.add(key);

          return;
        }
      }
    });

    if (markedBoard.size === boards.length) {
      const sumOfUnMarkedNumbers = getSum(
        boards[resultKey],
        markedMap.get(resultKey)
      );

      console.log(sumOfUnMarkedNumbers * pnNumber);
      return;
    }
  }
};
