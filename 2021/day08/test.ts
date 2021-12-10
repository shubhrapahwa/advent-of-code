import { calculateResultPart1 } from './part1';
import { calculateResultPart2 } from './part2';

console.log(
  '=================================Sample test================================='
);

// 26
console.log('Part 1 solution = ', calculateResultPart1('day08/sample.txt'));

// 61229
console.log('Part 2 solution = ', calculateResultPart2('day08/sample.txt'));

console.log(
  '=================================Main test================================='
);

// 261
console.log('Part 1 solution = ', calculateResultPart1('day08/input.txt'));

// 987553
console.log('Part 2 solution = ', calculateResultPart2('day08/input.txt'));
