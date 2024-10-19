import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },
    { a: 3, b: 2, action: Action.Subtract, expected: 1 },
    { a: 4, b: 2, action: Action.Subtract, expected: 2 },
    { a: 10, b: 3, action: Action.Subtract, expected: 7 },
    { a: 2, b: 2, action: Action.Multiply, expected: 4 },
    { a: 5, b: 6, action: Action.Multiply, expected: 30 },
    { a: 4, b: 3, action: Action.Multiply, expected: 12 },
    { a: 9, b: 3, action: Action.Divide, expected: 3 },
    { a: 12, b: 6, action: Action.Divide, expected: 2 },
    { a: 20, b: 5, action: Action.Divide, expected: 4 },
    { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
    { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
    { a: 1, b: 5, action: Action.Exponentiate, expected: 1 },
];

describe('simpleCalculator', () => {
  test.each(testCases)('$a $action $b', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});
