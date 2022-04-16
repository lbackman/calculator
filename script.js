let num1;
let num2;
let currentOp;
const add = (num1, num2) => (parseFloat(num1) + parseFloat(num2));
const subtract = (num1, num2) => (num1 - num2);
const multiply = (num1, num2) => (num1 * num2);
const divide = (num1, num2) => (num2 === 0) ? 
    null : (num1 / num2);

const square = (num) => (num * num);
const sqrt = (num) => (Math.sqrt(num));
const reciprocal = (num) => (1 / num);


// Percentage functions

// Returns the 2nd number's percentage of the first
// E.g. percentAdd(10, 20) = 20% of 10 = 2
// This value will be stored in the second operand
const percentAdd = (num1, num2) => {
    return (num1 * num2) / 100;
}
// operate takes 1 or 2 numbers as arguments
const operate = (op, num1, num2) => op(num1, num2);

const primaryDisplay = document.getElementById('primary');
const secondaryDisplay = document.getElementById('secondary');

const numButtons = document.querySelectorAll('.number');
const decimal = document.getElementById('decimal');
const backSpace = document.getElementById('backspace');

// const pmmde = document.querySelectorAll('.calc.operator');
// pmmde.forEach(button => {
//     button.addEventListener('click', function(e) {
//         const operator = e.target.id;
//         if (currentOp && num1 && num2) {
//             operate(currentOp, ...nums);
//             currentOp = add;
//         } 
//         switch (operator) {
//             case ('add'):
//                 currentOp = add;
//                 break;
//             case ('subtract'):
//                 currentOp = subtract;
//                 break;
//         }
//     });
// });
const plus = document.getElementById('add');
plus.addEventListener('click', function() {
    if (num1 && num2) {
        primaryDisplay.textContent = operate(add, num1, num2);
        num1 = primaryDisplay.textContent;
        num2 = null;
    } else if (!num1 && num2) {
        num1 = num2;
        num2 = null;
        currentOp = add;
    } else {
        return;
    }
});
// const minus = document.getElementById('subtract');
// const times = document.getElementById('multiply');
// const divided = document.getElementById('divide');
// const equals = document.getElementById('equal');

numButtons.forEach(button => {
    button.addEventListener('click', addToDisplay);
});

decimal.addEventListener('click', addToDisplay);

backSpace.addEventListener('click', function() {
    const num = primaryDisplay.textContent
    if (num.length == 1) {
        primaryDisplay.textContent = '0';
    } else {
        const newStr = num.slice(0, -1);
        primaryDisplay.textContent = newStr;
        num2 = primaryDisplay.textContent;
    }
});

function addToDisplay(e) {
    const input = e.target.textContent;
    let display = primaryDisplay.textContent;
    if (display.length >= 15) {
        return;
    } else if (input == '.' && display.includes('.')) {
        return;
    } else if (input == '.' && display == 0) {
        primaryDisplay.textContent += input;
    } else if (display === '0') {
        primaryDisplay.textContent = input;
    } else if (num1 && !num2) {
        primaryDisplay.textContent = input;
    } else {
        primaryDisplay.textContent += input;
    }
    num2 = primaryDisplay.textContent;
}