import { readFileSync } from "fs";
import {
  count,
  fetchVentCoordinates,
  fillMatrix,
  filterVentCoordinates,
  findXY,
  getAllCoordinates,
  markMatrix,
} from "./utils";

/**
 * Part - 1
 */
export const calculateResultPart1 = (filePath: string): number => {
  const inputArray = readFileSync(filePath, "utf8").split("\n");

  const ventCoordinates = fetchVentCoordinates(inputArray);

  const matrixCoordinates = findXY(ventCoordinates);
  const [row, column] = [matrixCoordinates, matrixCoordinates];

  let matrix = fillMatrix(row, column);

  const filteredCoordinates = filterVentCoordinates(ventCoordinates);

  const allCoordinates = getAllCoordinates(filteredCoordinates);

  // mark matrix
  matrix = markMatrix(allCoordinates, matrix);

  // count at least 2s in matrix
  return count(matrix, 2);
};

/**
 * Part - 2
 */
export const calculateResultPart2 = (filePath: string): number => {
  const inputArray = readFileSync(filePath, "utf8").split("\n");

  const ventCoordinates = fetchVentCoordinates(inputArray);

  const matrixCoordinates = findXY(ventCoordinates);
  const [row, column] = [matrixCoordinates, matrixCoordinates];

  let matrix = fillMatrix(row, column);

  const allCoordinates = getAllCoordinates(ventCoordinates, true);

  // mark matrix
  matrix = markMatrix(allCoordinates, matrix);

  // count at least 2s in matrix
  return count(matrix, 2);
};
