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
operation.add = (num1, num2) => ((+num1) + (+num2));
operation.subtract = (num1, num2) => (num1 - num2);
operation.multiply = (num1, num2) => (num1 * num2);
operation.divide = (num1, num2) => (num2 == 0) ? 
    "uh oh" : (num1 / num2);

operation.negate = (num) => -num;
operation.reciprocal = (num) => num == 0 ? 'uh oh' : (1 / num);
operation.square = (num) => (num * num);
operation.sqrt = (num) => num >= 0 ? (Math.sqrt(num)) : 'uh oh';

operation.percent = {};
// addSub stands for 'add or subtract'
operation.percent.addSub = (num1, num2) => (num1 * num2) / 100;
operation.percent.regular = (num) => num / 100;

const cButton = document.getElementById('c');
cButton.addEventListener('click', clear);

const ceButton = document.getElementById('ce');
ceButton.addEventListener('click', clearLast);

const primaryDisplay = document.getElementById('primary');
const secondaryDisplay = document.getElementById('secondary');

const numButtons = document.querySelectorAll('.number');
const decimal = document.getElementById('decimal');
const backSpace = document.getElementById('backspace');
const plusMinus = document.getElementById('negate');
const reciprocal = document.getElementById('reciprocal');
const square = document.getElementById('square');
const sqrt = document.getElementById('sqrt');
const percentBtn = document.getElementById('percent');

/* 
Uses object so a string can be passed as a function, in this
case, e.target.id, which is add, subtract, multiply or divide.
*/
const pmmd = document.querySelectorAll('.calc.operator');
pmmd.forEach(button => {
    button.addEventListener('click', function(e) {
        if (num1 && num2) {
            num1 = currentOp(num1, num2);
            primaryDisplay.textContent = round(num1);
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
        } else if (!num1 && !num2) {
            currentOp = operation[e.target.id];
            e.target.classList.add('selected');
            num1 = '0';
        }  
        else {
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
        primaryDisplay.textContent= round(num2);
        num1 = null;
        repeatOp = currentOp;
        currentOp = null;
        calcDone = true;
    } else if (repeatOp) {
        num1 = num2;
        num2 = tempNum;
        num2 = repeatOp(num1, num2);
        primaryDisplay.textContent = round(num2);
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

plusMinus.addEventListener('click', negate);

function negate() {
    if (num2) { 
        num2 = -num2;
        primaryDisplay.textContent = round(num2);
    } else {
        if (num1) {
            num1 = -num1;
            primaryDisplay.textContent = round(num1);
        }
    }
}

reciprocal.addEventListener('click', invert);

function invert() {
    if (num2) {
        num2 = operation.reciprocal(num2);
        primaryDisplay.textContent = round(num2);
    } else {
        if (num1) {
            num1 = operation.reciprocal(num1);
            primaryDisplay.textContent = round(num1);
        }
    }
}
square.addEventListener('click', toSquare);

function toSquare() {
    if (num2) {
        num2 = operation.square(num2);
        primaryDisplay.textContent = round(num2);
    } else {
        if (num1) {
            num1 = operation.square(num1);
            primaryDisplay.textContent = round(num1);
        }
    }
}

sqrt.addEventListener('click', toSqrt);

function toSqrt() {
    if (num2) {
        num2 = operation.sqrt(num2);
        primaryDisplay.textContent = round(num2);
    } else {
        if (num1) {
            num1 = operation.sqrt(num1);
            primaryDisplay.textContent = round(num1);
        }
    }
}

percentBtn.addEventListener('click', calcPercent);

function calcPercent() {
    const ADD = operation.add;
    const SUB = operation.subtract;
    const MULT = operation.multiply;
    const DIV = operation.divide;
    if (num2) {
        if (num1 && (currentOp == ADD || currentOp == SUB)) {
            num2 = operation.percent.addSub(num1, num2)
        } else {
            num2 = operation.percent.regular(num2);
        }
        primaryDisplay.textContent = round(num2);
    } else {
        if (num1 && (currentOp == ADD || currentOp == SUB)) {
            num2 = operation.percent.addSub(num1, num1);
            primaryDisplay.textContent = round(num2);
        } else if (num1 && (currentOp == MULT || currentOp == DIV)) {
            num2 = operation.percent.regular(num1);
            primaryDisplay.textContent = round(num2);
        }
    }
}

// Add eventuality for backspacing on calculation output
// Suggestion: later when defining C and CE buttons,
// use the function of one of those.
backSpace.addEventListener('click', function() {
    const num = primaryDisplay.textContent
    if (num.length == 1) {
        primaryDisplay.textContent = '0';
    } else if (
        num == 'NaN' ||
        num == 'uh oh' ||
        num.includes('e')) {
        primaryDisplay.textContent = '0';
        currentOp = null;
        pmmd.forEach(el => el.classList.remove('selected'));
    } 
    else {
        const newStr = num.slice(0, -1);
        if (newStr.charAt(newStr.length - 1) == '.') {
            primaryDisplay.textContent = newStr.slice(0, -1);
        } else {
            primaryDisplay.textContent = newStr;
        }
    }
    num2 = primaryDisplay.textContent;
});

function addToDisplay(e) {
    const input = e.target.textContent;
    let display = primaryDisplay.textContent;
    if (display =='NaN' || display == 'uh oh') {
        repeatOp = null;
        calcDone = false;
        if (input == '.'){
            primaryDisplay.textContent = '0.';
        } 
        else {
            primaryDisplay.textContent = input;
        }
    }
    else if (display.length >= 15) {
        if (num1 && !num2) {
            if (input == '.') {
                primaryDisplay.textContent ='0.';
            } else {
                primaryDisplay.textContent = input;
            }
        } else if (calcDone) {
            primaryDisplay.textContent = input;
        }
        else {
            return;
        }
    } else if (input == '.' && display.includes('.')) {
        if (num1 && !num2) {
            primaryDisplay.textContent = '0.';
        } else {
            return;
        }
    } else if (input == '.' && display == 0) {
        primaryDisplay.textContent += input;
    } else if (display === '0') {
        primaryDisplay.textContent = input;
    } else if (num1 && !num2) {
        if (input == '.') {
            primaryDisplay.textContent = '0.';
        }
        else {
            primaryDisplay.textContent = input;
        }
    } else if (calcDone && !num1 && num2) {
        repeatOp = null;
        primaryDisplay.textContent = input;
        num1 = null;
        calcDone = false;
        console.log('yes');
    } else if (!num1 && !num2) {
        pmmd.forEach(el => el.classList.remove('selected'));
        currentOp = null;
        num1 = null;
        primaryDisplay.textContent = input;
    }
    else {
        primaryDisplay.textContent += input;
    }
    num2 = primaryDisplay.textContent;
    cClicked = false;
    ceClicked = false;
}

function round(answer) {
    if (answer == 'uh oh') return answer;
    const num = parseFloat(answer);
    let roundedNumber;
    if (num.toString().length > 15) {
        const intValue = Math.floor(num).toString().length
        if (intValue >= 15) {
            if (num < 0) {
                console.log('exp-minus');
                roundedNumber = num.toExponential(8);
            } else {
                console.log('exp-plus');
                roundedNumber = num.toExponential(9);
            }
            
        }
        else if (intValue == 14) {
            console.log('x=14');
            roundedNumber = Math.floor(num);

        } else {
            if (Math.floor(num) == 0) {
                if (Math.abs(num < 1e-12)) {
                    roundedNumber = num.toExponential(9);
                } else {
                    console.log('0.0000...');
                    roundedNumber = num.toFixed(13);
                }
            // If the number is below 0 and above -1
            } else if (Math.floor(num) == -1) {
                if (Math.abs(num) < 1e-12) {
                    roundedNumber = num.toExponential(8);
                } else {
                    console.log('-0.0000...');
                    roundedNumber = num.toFixed(12);
                }
            }
             else {
                for (let i = 1; i < 14; i++) {
                    if (i == intValue) {
                        console.log('1<x<14');
                        console.log(i);
                        roundedNumber = num.toFixed(14-i);
                    }
                }
            }
            
        } 

    } else {
        roundedNumber = num;
    }
    return roundedNumber.toString();
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