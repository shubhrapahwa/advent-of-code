import { readFileSync } from 'fs';

export const readInput = (filePath: string): string[][] =>
  readFileSync(filePath, 'utf8')
    .split('\n')
    .map((x) => x.split(''));

export const checkBrackets = (
  bracket: string,
  chars: string[],
  illegal: string[]
): { chars: string[]; illegal: string[] } => {
  if (
    bracket === '(' ||
    bracket === '[' ||
    bracket === '{' ||
    bracket === '<'
  ) {
    chars.push(bracket);
    return { chars, illegal };
  }

  switch (bracket) {
    case ')':
      if (chars[chars.length - 1] === '(') {
        chars.pop();
      } else {
        illegal.push(bracket);
      }
      return { chars, illegal };
    case ']':
      if (chars[chars.length - 1] === '[') {
        chars.pop();
      } else {
        illegal.push(bracket);
      }
      return { chars, illegal };
    case '}':
      if (chars[chars.length - 1] === '{') {
        chars.pop();
      } else {
        illegal.push(bracket);
      }
      return { chars, illegal };
    case '>':
      if (chars[chars.length - 1] === '<') {
        chars.pop();
      } else {
        illegal.push(bracket);
      }
      return { chars, illegal };
    default:
      return { chars, illegal };
  }
};

export const completeMissingBrackets = (
  bracket: string,
  incomplete: string[]
): string[] => {
  switch (bracket) {
    case '(':
      incomplete.push(')');
      return incomplete;

    case '[':
      incomplete.push(']');
      return incomplete;

    case '{':
      incomplete.push('}');
      return incomplete;

    case '<':
      incomplete.push('>');
      return incomplete;

    default:
      return incomplete;
  }
};

export const sortAsc = (a: number, b: number): number => {
  return a - b;
};
