import { readFileSync } from 'fs';

const isSmallCave = (str: string): boolean => str.toLowerCase() === str;

export const calculate = (filePath: string): number => {
  const input = readFileSync(filePath, 'utf8')
    .split('\n')
    .map((x) => x.split('-'));

  const caveMap = new Map<string, string[]>();

  input.forEach((cave) => {
    caveMap.set(cave[0], [...(caveMap.get(cave[0]) ?? []), cave[1]]);
    caveMap.set(cave[1], [...(caveMap.get(cave[1]) ?? []), cave[0]]);
  });

  const paths: string[][] = [];
  const stack = [['start']];

  while (stack.length > 0) {
    const currentPath = stack.pop() ?? [];

    const currentLastCave = currentPath.at(-1);

    if (currentLastCave === undefined) {
      break;
    }

    if (currentLastCave === 'end') {
      paths.push(currentPath);
      continue;
    }

    const cavePaths = caveMap.get(currentLastCave) ?? [];

    cavePaths.forEach((cave: string) => {
      if (cave === 'start') {
        return;
      }

      if (isSmallCave(cave) && currentPath.includes(cave)) {
        return;
      }

      stack.push([...currentPath, cave]);
    });
  }

  console.log(paths.length);

  return paths.length;
};

calculate('./input.txt');
