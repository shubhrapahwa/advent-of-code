export interface Dimension {
  height: number;
  width: number;
}

export const findAdjacentPoints = (
  x: number,
  y: number,
  dimension: Dimension
): number[][] => {
  const points: number[][] = [];

  if (x > 0) {
    // left
    points.push([x - 1, y]);
  }
  if (x < dimension.width - 1) {
    // right
    points.push([x + 1, y]);
  }
  if (y < dimension.height - 1) {
    // up/top
    points.push([x, y + 1]);
  }
  if (y > 0) {
    // down
    points.push([x, y - 1]);
  }

  // x+1, y+1 - right top diagonal
  if (x < dimension.width - 1 && y < dimension.height - 1) {
    points.push([x + 1, y + 1]);
  }

  // x+1, y-1 - right down diagonal
  if (x < dimension.width - 1 && y > 0) {
    points.push([x + 1, y - 1]);
  }

  // x-1, y+1 - left top
  if (x > 0 && y < dimension.height - 1) {
    points.push([x - 1, y + 1]);
  }

  // x-1, y-1 - left bottom
  if (x > 0 && y > 0) {
    points.push([x - 1, y - 1]);
  }

  return points;
};

export const findFreq = (arr: number[][], value: number): number =>
  arr.reduce((acc, curr) => {
    const a = curr.reduce((acc1, curr1) => {
      if (curr1 === value) acc1++;

      return acc1;
    }, 0);

    return acc + a;
  }, 0);

export const countFlashes = (arr: number[][]) =>
  arr.reduce((acc, curr) => {
    const a = curr.reduce((acc1, curr1) => {
      if (curr1 > 9) acc1++;

      return acc1;
    }, 0);

    acc = acc + a;
    return acc;
  }, 0);
