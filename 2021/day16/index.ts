import { readFileSync } from 'fs';

const getValue = (typeId: number, subBinaries: number[]): number => {
  switch (typeId) {
    case 0:
      return subBinaries.reduce((acc, curr) => acc + curr);
    case 1:
      return subBinaries.reduce((acc, curr) => acc * curr);
    case 2:
      return Math.min(...subBinaries);
    case 3:
      return Math.max(...subBinaries);
    case 5:
      return subBinaries[0] > subBinaries[1] ? 1 : 0;
    case 6:
      return subBinaries[0] < subBinaries[1] ? 1 : 0;
    case 7:
      return subBinaries[0] == subBinaries[1] ? 1 : 0;
    default:
      return 0;
  }
};

const hexToBinary = (hex: string): string =>
  hex
    .split('')
    .map((x) => parseInt(x, 16).toString(2).padStart(4, '0'))
    .join('');

const binaryToDecimal = (binary: string): number => parseInt(binary, 2);

const getVersion = (binary: string, i: number): number =>
  binaryToDecimal(binary.slice(i, i + 3));

const getTypeId = (binary: string, i: number): number =>
  binaryToDecimal(binary.slice(i + 3, i + 6));

interface Result {
  length: number;
  sumOfVersions: number;
  value: number;
}

const processBinary = (binary: string, index: number): Result => {
  const version = getVersion(binary, index);
  const typeId = getTypeId(binary, index);

  let currIndex = index + 6;

  let versionSum = 0;

  if (typeId === 4) {
    // literal value
    const output = [];
    let ended = false;

    while (!ended) {
      if (binary[currIndex] === '0') {
        // end on '0'
        ended = true;
      }

      output.push(binary.slice(currIndex + 1, currIndex + 1 + 4));
      currIndex += 5;
    }

    return {
      value: binaryToDecimal(output.join('')),
      sumOfVersions: version,
      length: currIndex - index,
    };
  } else {
    // operator value
    const lengthTypeId = binary[currIndex];

    const subBinaries = [];

    if (lengthTypeId === '0') {
      const bitLength = binaryToDecimal(
        binary.slice(currIndex + 1, currIndex + 1 + 15)
      );

      currIndex += 16;

      const endOfBinary = currIndex + bitLength;

      while (currIndex < endOfBinary) {
        const { length, sumOfVersions, value } = processBinary(
          binary,
          currIndex
        );

        subBinaries.push(value);
        versionSum += sumOfVersions;
        currIndex += length;
      }
    }

    if (lengthTypeId === '1') {
      const subPacketCount = binaryToDecimal(
        binary.slice(currIndex + 1, currIndex + 1 + 11)
      );

      currIndex += 12;
      let i = 0;

      while (i < subPacketCount) {
        const { length, sumOfVersions, value } = processBinary(
          binary,
          currIndex
        );
        subBinaries.push(value);
        versionSum += sumOfVersions;
        currIndex += length;

        i++;
      }
    }

    return {
      length: currIndex - index,
      sumOfVersions: version + versionSum,
      value: getValue(typeId, subBinaries),
    };
  }
};

const calculate = () => {
  const input = readFileSync('./input.txt', 'utf-8');

  const binary = hexToBinary(input);

  const result = processBinary(binary, 0);

  console.log('Part 1: ', result.sumOfVersions);
  console.log('Part 2: ', result.value);
};

calculate();
