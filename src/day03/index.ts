import { readFileSync } from "fs";

const findMCBit = (arr: number[]): number => {
  const reducer = arr.reduce((accumulator: number, value: number): number => {
    return accumulator + value;
  }, 0);

  return reducer >= arr.length / 2 ? 1 : 0;
};

const findLCBit = (arr: number[]): number => {
  const reducer = arr.reduce((accumulator: number, value: number) => {
    return accumulator + value;
  }, 0);

  return reducer >= arr.length / 2 ? 0 : 1;
};

/**
 * Part - 1
 */
export const calculateResultPart1 = (filePath: string): number => {
  const inputArray = readFileSync(filePath, "utf8")
    .split("\n")
    .map((element: string) =>
      element.split("").map((bit: string): number => +bit)
    );

  const resultMC: number[] = [];
  const resultLC: number[] = [];

  for (let i = 0; i < inputArray[0].length; i++) {
    const column = inputArray.map((x) => x[i]);

    const mc = findMCBit(column);
    resultMC.push(mc);

    const lc = findLCBit(column);
    resultLC.push(lc);
  }

  return parseInt(resultMC.join(""), 2) * parseInt(resultLC.join(""), 2);
};

/**
 * Part - 2
 */
export const calculateResultPart2 = (filePath: string): number => {
  const inputArray = readFileSync(filePath, "utf8")
    .split("\n")
    .map((element: string) =>
      element.split("").map((bit: string): number => +bit)
    );

  let resultMC = [...inputArray];
  let resultLC = [...inputArray];

  for (let i = 0; i < inputArray[0].length; i++) {
    if (resultMC.length > 1) {
      const columnMC = resultMC.map((x) => x[i]);
      const mcBit = findMCBit(columnMC);

      resultMC = resultMC.filter((x) => {
        if (x[i] === mcBit) {
          return x;
        }
      });
    }

    if (resultLC.length > 1) {
      const columnLC = resultLC.map((x) => x[i]);
      const lcBit = findLCBit(columnLC);

      resultLC = resultLC.filter((x) => {
        if (x[i] === lcBit) {
          return x;
        }
      });
    }
  }

  return parseInt(resultMC[0].join(""), 2) * parseInt(resultLC[0].join(""), 2);
};
