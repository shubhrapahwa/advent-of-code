import { calculateResult } from '.';

console.log(
  '=================================Sample test================================='
);

// 5
console.log(
  'Part 1 solution = ',
  calculateResult('day05/sample.txt', false)
);

// 12
console.log(
  'Part 2 solution = ',
  calculateResult('day05/sample.txt', true)
);

console.log(
  '=================================Main test================================='
);

// 7085
console.log(
  'Part 1 solution = ',
  calculateResult('day05/input.txt', false)
);

// 20271
console.log('Part 2 solution = ', calculateResult('day05/input.txt', true));
