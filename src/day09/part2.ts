import {
  createBasin,
  createInputArray,
  Dimension,
  findAdjacentPoints,
} from "./utils";

export const part2 = (filePath: string): number => {
  const inputArray = createInputArray(filePath);

  const dimension: Dimension = {
    height: inputArray.length,
    width: inputArray[0].length,
  };

  const basinSizes: number[] = [];

  for (let y = 0; y < dimension.height; y++) {
    for (let x = 0; x < dimension.width; x++) {
      const adjacentPoints = findAdjacentPoints(x, y, dimension);

      const verifiedPoints = adjacentPoints.reduce((acc: number[][], curr) => {
        if (inputArray[curr[1]][curr[0]] > inputArray[y][x]) {
          acc.push(curr);
        }

        return acc;
      }, []);

      if (verifiedPoints.length === adjacentPoints.length) {
        const basin = createBasin(
          new Set<string>(),
          x,
          y,
          inputArray,
          dimension
        );

        if (basin !== undefined) {
          basinSizes.push(basin.size);
        }
      }
    }
  }

  const result = basinSizes
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, curr) => acc * curr, 1);

  return result;
};
