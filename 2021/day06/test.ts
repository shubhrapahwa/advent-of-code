import { calculateNumberOfFishes } from '.';

console.log(
  '=================================Sample test================================='
);

// 5934
console.log(
  'Part 1 solution = ',
  calculateNumberOfFishes('src/day06/sample.txt', 80)
);

// 26984457539
console.log(
  'Part 2 solution = ',
  calculateNumberOfFishes('src/day06/sample.txt', 256)
);

console.log(
  '=================================Main test================================='
);

// 345793
console.log(
  'Part 1 solution = ',
  calculateNumberOfFishes('src/day06/input.txt', 80)
);

// 1572643095893
console.log(
  'Part 2 solution = ',
  calculateNumberOfFishes('src/day06/input.txt', 256)
);
