import { calculateLeastDistance } from '.';

console.log(
  '=================================Sample test================================='
);

// 37
console.log(
  'Part 1 solution = ',
  calculateLeastDistance('src/day07/sample.txt', 'linear')
);

// 168
console.log(
  'Part 2 solution = ',
  calculateLeastDistance('src/day07/sample.txt', 'exponential')
);

console.log(
  '=================================Main test================================='
);

// 329389
console.log(
  'Part 1 solution = ',
  calculateLeastDistance('src/day07/input.txt', 'linear')
);

// 86397080
console.log(
  'Part 2 solution = ',
  calculateLeastDistance('src/day07/input.txt', 'exponential')
);
