export interface VentCoordinates {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

export const fetchVentCoordinates = (input: string[]): VentCoordinates[] =>
  input.reduce(
    (
      accumulator: VentCoordinates[],
      currentValue: string
    ): VentCoordinates[] => {
      const curr = currentValue.replace(/\s+/g, "").split("->");

      const vent = {
        x1: +curr[0].split(",")[0],
        y1: +curr[0].split(",")[1],
        x2: +curr[1].split(",")[0],
        y2: +curr[1].split(",")[1],
      };

      accumulator.push(vent);

      return accumulator;
    },
    []
  );

const sortAsc = (a: number, b: number): number => {
  return a - b;
};

export const findXY = (ventCoordinates: VentCoordinates[]): number => {
  const x =
    ventCoordinates
      .map((vent) => {
        return [vent.x1, vent.x2];
      })
      .flat()
      .sort(sortAsc)
      .pop() ?? 0;

  const y =
    ventCoordinates
      .map((vent) => {
        return [vent.y1, vent.y2];
      })
      .flat()
      .sort(sortAsc)
      .pop() ?? 0;

  return x > y ? x : y;
};

export const range = (num1: number, num2: number): number[] => {
  let min: number = 0;
  let max: number = 0;

  if (num1 > num2) {
    min = num2;
    max = num1;
  } else {
    min = num1;
    max = num2;
  }

  return [...Array(max - min + 1).keys()].map((i) => i + min);
};

const diagRange = (vent: VentCoordinates): number[][] => {
  // (1,1) => (3, 3)
  const { x1, y1, x2, y2 } = vent;

  let result: number[][] = [[]];

  let x: number[] = [];
  let y: number[] = [];

  if (x1 < x2) {
    for (let i = x1; i <= x2; i++) {
      x.push(i);
    }
  } else {
    for (let i = x1; i >= x2; i--) {
      x.push(i);
    }
  }

  if (y1 < y2) {
    for (let i = y1; i <= y2; i++) {
      y.push(i);
    }
  } else {
    for (let i = y1; i >= y2; i--) {
      y.push(i);
    }
  }

  for (let i = 0; i < x.length; i++) {
    result.push([x[i], y[i]]);
  }

  const [empty, ...others] = result;

  return others;
};

export const getAllCoordinates = (
  ventCoordinates: VentCoordinates[],
  diagonal?: boolean
): number[][] =>
  ventCoordinates.reduce(
    (accumulator: number[][], currentValue: VentCoordinates) => {
      const { x1, y1, x2, y2 } = currentValue;

      if (x1 === x2) {
        const range1 = range(y1, y2);
        const a = range1.map((y) => [x1, y]);

        return [...accumulator, ...a];
      }

      if (y1 === y2) {
        const range2 = range(x1, x2);
        const b = range2.map((x) => [x, y1]);

        return [...accumulator, ...b];
      }

      if (diagonal === true) {
        const diagRangeIs = diagRange(currentValue);

        return [...accumulator, ...diagRangeIs];
      }

      return accumulator;
    },
    []
  );

export const count = (matrix: number[][], num: number) => {
  return matrix.reduce((accumulator, currentValue: number[]): number => {
    const a = currentValue.reduce((a, v) => {
      return v >= num ? a + 1 : a;
    }, 0);

    return accumulator + a;
  }, 0);
};

export const filterVentCoordinates = (
  ventCoordinates: VentCoordinates[]
): VentCoordinates[] =>
  ventCoordinates.reduce(
    (accumulator: VentCoordinates[], currentValue: VentCoordinates) => {
      if (
        currentValue.x1 === currentValue.x2 ||
        currentValue.y1 === currentValue.y2
      ) {
        accumulator.push(currentValue);
      }

      return accumulator;
    },
    []
  );

export const fillMatrix = (rowCount: number, columnCount: number): number[][] =>
  Array(rowCount + 1)
    .fill(0)
    .map(() => Array(columnCount + 1).fill(0));

export const markMatrix = (
  allCoordinates: number[][],
  matrix: number[][]
): number[][] => {
  const resultMatrix = [...matrix];

  for (let i = 0; i < allCoordinates.length; i++) {
    const [x, y] = allCoordinates[i];
    resultMatrix[x][y] = resultMatrix[x][y] + 1;
  }

  return resultMatrix;
};
