import { calculateLeastDistance } from ".";


console.log('=================================Sample test=================================');

// 37
console.log('Part 1 solution = ', calculateLeastDistance('src/day07/input1.txt', "linear"));

// 168
console.log('Part 2 solution = ', calculateLeastDistance('src/day07/input1.txt', "exponential"));

console.log('=================================Main test=================================');

// 329389
console.log('Part 1 solution = ', calculateLeastDistance('src/day07/input2.txt',  "linear"));

// 86397080
console.log('Part 2 solution = ', calculateLeastDistance('src/day07/input2.txt', "exponential"));
