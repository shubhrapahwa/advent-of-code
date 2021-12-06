import { calculateDepthIncrease, calculateDepthSumIncrease } from ".";


console.log('=================================Sample test=================================');

// 7
console.log('Part 1 solution = ', calculateDepthIncrease('src/day01/input1.txt'));

// 5
console.log('Part 2 solution = ', calculateDepthSumIncrease('src/day01/input1.txt'));

console.log('=================================Main test=================================');

// 1451
console.log('Part 1 solution = ', calculateDepthIncrease('src/day01/input2.txt'));

// 1395
console.log('Part 2 solution = ', calculateDepthSumIncrease('src/day01/input2.txt'));
