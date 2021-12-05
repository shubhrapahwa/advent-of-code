export interface Position {
  x: number;
  y: number;
}

const getIndexOfK = (
  arr: number[][],
  k: number
): number[] | undefined => {
  for (let row = 0; row < arr.length; row++) {
    let column = arr[row].indexOf(k);
    if (column > -1) {
      return [row, column];
    }
  }
};

export const chunkArray = (arr: string[], chunk_size: number): number[][][] => {
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

export const getSum = (
  arr: number[][],
  positions: Position[] | undefined
): number => {
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

export const getMarkedMap = (
  markedMap: Map<number, Position[]>,
  boards: number[][][],
  currentPN: number
) => {
  return boards.reduce(
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
};

export const getOccurrences = (arr: number[]) =>
  arr.reduce((acc: any, curr: number) => {
    return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
  }, {});
