let num1;
let num2;
let tempNum;
let memory;
let currentOp;
let repeatOp;
let calcDone = false;
let cClicked = false;
let ceClicked = false;
const operation = {};
operation.add = (num1, num2) => (parseFloat(num1) + parseFloat(num2));
operation.subtract = (num1, num2) => (num1 - num2);
operation.multiply = (num1, num2) => (num1 * num2);
operation.divide = (num1, num2) => (num2 == 0) ? 
    "You fool!" : (num1 / num2);

operation.square = (num) => (num * num);
operation.sqrt = (num) => (Math.sqrt(num));
operation.reciprocal = (num) => (1 / num);

const cButton = document.getElementById('c');
cButton.addEventListener('click', clear);

const ceButton = document.getElementById('ce');
ceButton.addEventListener('click', clearLast);

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

/* 
Uses object so a string can be passed as a function, in this
case, e.target.id, which is add, subtract, multiply or divide.
*/
const pmmd = document.querySelectorAll('.calc.operator');
pmmd.forEach(button => {
    button.addEventListener('click', function(e) {
        if (num1 && num2) {
            num1 = currentOp(num1, num2);
           primaryDisplay.textContent = num1;
            tempNum = num2;
            num2 = null;
            repeatOp = currentOp;
            currentOp = operation[e.target.id];
            pmmd.forEach(el => el.classList.remove('selected'));
            e.target.classList.add('selected');
        } else if (!num1 && num2) {
            num1 = num2;
            num2 = null;
            currentOp = operation[e.target.id];
            pmmd.forEach(el => el.classList.remove('selected'));
            e.target.classList.add('selected');
        } else if (num1 && !num2) {
            currentOp = operation[e.target.id]
            pmmd.forEach(el => el.classList.remove('selected'));
            e.target.classList.add('selected');
        } else {
            return;
        }
    });
});

const equal = document.getElementById('equal');
equal.addEventListener('click', function() {
    if (num1 && num2) {
        pmmd.forEach(el => el.classList.remove('selected'));
        tempNum = num2;
        num2 = currentOp(num1, num2);
        primaryDisplay.textContent= num2;
        // tempNum = num2;
        num1 = null;
        repeatOp = currentOp;
        currentOp = null;
        calcDone = true;
        // console.log('num1: ' + num1);
        // console.log('num2: ' + num2);
        // console.log('op: ' + currentOp);
    } else if (repeatOp) {
        num1 = num2;
        num2 = tempNum;
        num2 = repeatOp(num1, num2);
        primaryDisplay.textContent = num2;
        num1 = null;
        calcDone = true;
    } else {
        return;
    }
});

numButtons.forEach(button => {
    button.addEventListener('click', addToDisplay);
});

decimal.addEventListener('click', addToDisplay);
// Add eventuality for backspacing on calculation output
// Suggestion: later when defining C and CE buttons,
// use the function of one of those.
backSpace.addEventListener('click', function() {
    const num = primaryDisplay.textContent
    if (num.length == 1) {
        primaryDisplay.textContent = '0';
    } else {
        const newStr = num.slice(0, -1);
        primaryDisplay.textContent = newStr;
    }
    num2 = primaryDisplay.textContent;
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
    } else if (calcDone && !num1 && num2) {
        repeatOp = null;
        primaryDisplay.textContent = input;
        num1 = null;
        calcDone = false;
    } else {
        primaryDisplay.textContent += input;
    }
    num2 = primaryDisplay.textContent;
    cClicked = false;
    ceClicked = false;
}

// A function to display exponential numbers without overflowing
// The same logic can be used on regular numbers

function expo(x) {
    const num = Number.parseFloat(x).toExponential();
    if (num.toString().length > 15) {
        return Number.parseFloat(x).toExponential(9);
    } else {
        return num;
    }
}

function clear() {
    if (cClicked) {
        memory = null;
        cClicked = false;
    }
    if (memory) cClicked = true;
    num1 = null;
    num2 = null;
    tempNum = null;
    currentOp = null;
    repeatOp = null;
    calcDone = false;
    pmmd.forEach(el => el.classList.remove('selected'));
    primaryDisplay.textContent = '0';
}

function clearLast () {
    if (ceClicked) {
        clear();
        ceClicked = false;
        cClicked = true;
    } else {
        if (num1 && num2) {
            num2 = null;
            primaryDisplay.textContent = '0';
            ceClicked = true;
        } else if (num1 && currentOp && !num2) {
            currentOp = null;
            pmmd.forEach(el => el.classList.remove('selected'));
            num2 = num1;
            num1 = null;
            ceClicked = true;
        } else {
            clear();
            ceClicked = false;
            cClicked = true;
        }
    }
}