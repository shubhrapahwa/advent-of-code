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

export const calculateResult = (filePath: string, diagonalIncluded: boolean): number => {
  const inputArray = readFileSync(filePath, "utf8").split("\n");

  const ventCoordinates = fetchVentCoordinates(inputArray);

  const matrixCoordinates = findXY(ventCoordinates);
  const [row, column] = [matrixCoordinates, matrixCoordinates];

  let matrix = fillMatrix(row, column);

  const filteredCoordinates = (diagonalIncluded === true) ? ventCoordinates : filterVentCoordinates(ventCoordinates);

  const allCoordinates = getAllCoordinates(filteredCoordinates, diagonalIncluded);

  // mark matrix
  matrix = markMatrix(allCoordinates, matrix);

  // count at least 2s in matrix
  return count(matrix, 2);
};
