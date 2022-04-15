const add = (num1, num2) => (num1 + num2);
const subtract = (num1, num2) => (num1 - num2);
const multiply = (num1, num2) => (num1 * num2);
const divide = (num1, num2) => (num1 / num2);

const square = (num) => (num * num);
const sqrt = (num) => (Math.sqrt(num));
const reciprocal = (num) => (1 / num);

// operateTwo takes to number as arguments, e.g. add
const operateTwo = (op, num1, num2) => op(num1, num2);

// operateOne takes one number as argument, e.g. square root
const operateOne = (op, num) => op(num);