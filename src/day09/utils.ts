import { readFileSync } from "fs";

export interface Dimension {
  height: number;
  width: number;
}

export const createInputArray = (filePath: string): number[][] =>
  readFileSync(filePath, "utf8")
    .split("\n")
    .map((x): number[] => {
      const a = x.split("");
      return a.map((y) => +y);
    });

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
    // up
    points.push([x, y + 1]);
  }
  if (y > 0) {
    // down
    points.push([x, y - 1]);
  }

  return points;
};

export const createBasin = (
  basin: Set<string>,
  x: number,
  y: number,
  arr: number[][],
  dimension: Dimension
): Set<string> | undefined => {
  // return on 9
  if (basin.has(`${x},${y}`) || arr[y][x] === 9) {
    return;
  }

  // add to basin
  basin.add(`${x},${y}`);

  findAdjacentPoints(x, y, dimension).forEach(([a, b]) => {
    return createBasin(basin, a, b, arr, dimension);
  });

  return basin;
};
