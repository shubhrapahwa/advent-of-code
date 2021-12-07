import { calculateResult } from ".";


console.log('=================================Sample test=================================');

// 5
console.log('Part 1 solution = ', calculateResult('src/day05/input1.txt', false));

// 12
console.log('Part 2 solution = ', calculateResult('src/day05/input1.txt', true));

console.log('=================================Main test=================================');

// 7085
console.log('Part 1 solution = ', calculateResult('src/day05/input2.txt', false));

// 20271
console.log('Part 2 solution = ', calculateResult('src/day05/input2.txt', true));
