export interface Position {
  x: number;
  y: number;
}

const getIndexOfK = (arr: number[][], k: number): number[] | undefined => {
  for (let row = 0; row < arr.length; row++) {
    const column = arr[row].indexOf(k);
    if (column > -1) {
      return [row, column];
    }
  }
};

export const chunkArray = (arr: string[], size: number): number[][][] => {
  const resultantArray = [];

  while (arr.length) {
    const block = arr.splice(0, size);

    if (block.length === 1 && block[0] === '') {
      // do nothing
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [a, ...others] = block;
      const o1 = others.map((y: string): number[] => {
        const bbb = y.split(' ');
        return bbb.filter((x1) => x1 !== '').map((x2) => +x2);
      });
      resultantArray.push(o1);
    }
  }

  return resultantArray;
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  arr.reduce((acc: any, curr: number) => {
    return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
  }, {});
