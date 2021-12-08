import { readFileSync } from "fs";

const solveForLength5 = (charsOf5: string[][], map: Map<number, string[]>) => {
  const common = new Set<string>();

  charsOf5[0].forEach((element) => {
    for (let i = 0; i < 5; i++) {
      if (
        charsOf5[1].includes(element[i]) &&
        charsOf5[2].includes(element[i])
      ) {
        common.add(element[i]);
      }
    }
  });

  const new5 = charsOf5.map((x) => x.filter((y) => ![...common].includes(y)));

  const valueOf1 = map.get(1) ?? [];

  new5.forEach((element, idx) => {
    const x = element.filter((element1) => valueOf1.includes(element1));
    if (x.length === 2) {
      map.set(3, charsOf5[idx]);
    } else {
      const valueOf4 = map.get(4) ?? [];
      const reducedValOf4 = valueOf4.filter((x) => !valueOf1.includes(x));

      const [y] = element.filter((element1) => !valueOf1.includes(element1));

      if (reducedValOf4.includes(y)) {
        map.set(5, charsOf5[idx]);
      } else {
        map.set(2, charsOf5[idx]);
      }
    }
  });

  return map;
};

const solveForLength6 = (charsOf6: string[][], map: Map<number, string[]>) => {
  const common = new Set<string>();

  charsOf6[0].forEach((element) => {
    for (let i = 0; i < 5; i++) {
      if (
        charsOf6[1].includes(element[i]) &&
        charsOf6[2].includes(element[i])
      ) {
        common.add(element[i]);
      }
    }
  });

  const new6 = charsOf6.map((x) => x.filter((y) => ![...common].includes(y)));

  const valueOf4 = map.get(4) ?? [];

  new6.forEach((element, idx) => {
    const x = element.filter((element1) => valueOf4.includes(element1));
    if (x.length === 2) {
      map.set(9, charsOf6[idx]);
    } else {
      const valueOf1 = map.get(1) ?? [];

      const y = element.filter((element1) => valueOf1.includes(element1));

      if (y.length === 0) {
        map.set(6, charsOf6[idx]);
      } else {
        map.set(0, charsOf6[idx]);
      }
    }
  });

  return map;
};

const arraysAreIdentical = (arr1: string[], arr2: string[]) => {
  if (arr1.length !== arr2.length) return false;
  for (var i = 0, len = arr1.length; i < len; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

const getKey = (map: Map<number, string[]>, value1: string[]): number => {
  let result: number = 0;

  for (var [key, value] of map) {
    if (arraysAreIdentical(value, value1)) {
      result = key;
      break;
    }
  }

  return result;
};

const createMapping = (input: string[]): Map<number, string[]> => {
  let map = new Map<number, string[]>();
  let charsOf5: string[][] = [];
  let charsOf6: string[][] = [];

  input.forEach((element) => {
    switch (element.length) {
      case 2:
        // digit 1
        map.set(1, element.split("").sort());
        break;
      case 4:
        // digit 4
        map.set(4, element.split("").sort());
        break;
      case 3:
        // digit 7
        map.set(7, element.split("").sort());
        break;
      case 7:
        // digit 8
        map.set(8, element.split("").sort());
        break;
      case 5:
        // digit - 2 or 3 or 5
        charsOf5.push(element.split("").sort());
        break;
      case 6:
        // digit - 0 or 6 or 9
        charsOf6.push(element.split("").sort());
        break;
      default:
        break;
    }
  });

  // deduce digits - 2, 3, 5
  map = solveForLength5(charsOf5, map);

  // deduce digits - 0, 6, 9
  map = solveForLength6(charsOf6, map);

  return map;
};

const processOutput = (
  output: string[],
  map: Map<number, string[]>
): string => {
  let result: string = "";

  output.forEach((element) => {
    const arr = element.split("").sort();
    const digit = getKey(map, arr).toString();

    result = result.concat(digit);
  });

  return result;
};

export const calculateResultPart2 = (filePath: string): number => {
  const inputArray = readFileSync(filePath, "utf8").split("\n");

  const result: number[] = [];

  inputArray.forEach((element) => {
    const input = element.split(" | ")[0].split(" ");
    const output = element.split(" | ")[1].split(" ");

    const map = createMapping(input);

    const processedOutput = +processOutput(output, map);

    result.push(processedOutput);
  });

  const sum = result.reduce((acc, curr) => (acc += curr));

  return sum;
};
