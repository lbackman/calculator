let num1;
let num2;
let tempNum1;
let tempNum2;
let tempSymb1;
let tempSymb2;
let memory;
let currentOp;
let repeatOp;
let calcDone = false;
let cClicked = false;
let ceClicked = false;
const operation = {
    add : {
        fn : (num1, num2) => ((+num1) + (+num2)),
        symbol : '+',
    },
    subtract : {
        fn : (num1, num2) => (num1 - num2),
        symbol : '-',
    },
    multiply : {
        fn : (num1, num2) => (num1 * num2),
        symbol : 'x',
    },
    divide : {
        fn : (num1, num2) => (num2 == 0) ? 
        "uh oh" : (num1 / num2),
        symbol : '/',
    },
    
    negate : (num) => -num,
    reciprocal : (num) => num == 0 ? 'uh oh' : (1 / num),
    square : (num) => (num * num),
    sqrt : (num) => num >= 0 ? (Math.sqrt(num)) : 'uh oh',
    
    percent : {
        // addSub stands for 'add or subtract'
        addSub : (num1, num2) => (num1 * num2) / 100,
        regular : (num) => num / 100,
    },
};
const clearMem = document.getElementById('clear');
const recallMem = document.getElementById('recall');
const memButtons = document.querySelectorAll('.mem');
for (const button of memButtons) {
    button.addEventListener('click', function(e) {
        const value = primaryDisplay.textContent;
        const memId = e.target.id;
        cClicked = false;
        ceClicked = false;
        switch (memId) {
            case ('clear'):
                memory = null;
                clearMem.setAttribute('disabled', '');
                recallMem.setAttribute('disabled', '');
                recallMem.classList.remove('instore');
                return;
            case ('recall'):
                num2 = memory;
                primaryDisplay.textContent = num2;
                return;
            case ('add-to'):
                if (value == 'Infinity' ||
                    value == '-Infinity' ||
                    value == 'uh oh' ||
                    value == 'NaN') return;
                
                if (num1 || num2) {
                    if (num2 && memory) memory += +num2;
                    if (num2 && !memory) memory = num2;
                    if (!num2) memory += +num1;
                    if (!num1 && calcDone) {
                        secOne.textContent = '';
                        secTwo.textContent = '';
                        secThree.textContent = '';
                        secFour.textContent = '';  
                    }
                    clearMem.removeAttribute('disabled');
                    recallMem.removeAttribute('disabled');
                    recallMem.classList.add('instore');
                } else {
                    return;
                }
                return;
            case ('remove'):
                if (value == 'Infinity' ||
                    value == '-Infinity' ||
                    value == 'uh oh' ||
                    value == 'NaN') return;
                if (num1 || num2) {
                    if (num2 && memory) memory -= num2;
                    if (num2 && !memory) memory = num2;
                    if (!num2) memory -= num1;
                    if (!num1 && calcDone) {
                        secOne.textContent = '';
                        secTwo.textContent = '';
                        secThree.textContent = '';
                        secFour.textContent = '';  
                    }
                    clearMem.removeAttribute('disabled');
                    recallMem.removeAttribute('disabled');
                    recallMem.classList.add('instore');
                } else {
                    return;
                }
                return;
            case ('store'):
                if (value == 'Infinity' ||
                    value == '-Infinity' ||
                    value == 'uh oh' ||
                    value == 'NaN') return;
                if (num1 || num2) {
                    if (num2) memory = num2;
                    if (!num2) memory = num1;
                    if (!num1 && calcDone) {
                        secOne.textContent = '';
                        secTwo.textContent = '';
                        secThree.textContent = '';
                        secFour.textContent = '';  
                    }
                    clearMem.removeAttribute('disabled');
                    recallMem.removeAttribute('disabled');
                    recallMem.classList.add('instore');
                } else {
                    return;
                }
                return;
            default:
                return;
        }
    });
}

const cButton = document.getElementById('c');
cButton.addEventListener('click', clear);

const ceButton = document.getElementById('ce');
ceButton.addEventListener('click', clearLast);

const primaryDisplay = document.getElementById('primary');
const secondaryDisplay = document.getElementById('secondary');
const secOne = document.getElementById('sec1');
const secTwo = document.getElementById('sec2');
const secThree = document.getElementById('sec3');
const secFour = document.getElementById('sec4');

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
// pmmd : plus, minus, multiply, divide
const pmmd = document.querySelectorAll('.calc.operator');
pmmd.forEach(button => {
    button.addEventListener('click', function(e) {
        cClicked = false;
        ceClicked = false;
        const symbol = operation[e.target.id]['symbol'];
        if (num1 && num2) {
            tempNum2 = num1;
            num1 = currentOp(num1, num2);
            primaryDisplay.textContent = round(num1);
            secOne.textContent = primaryDisplay.textContent;
            secTwo.textContent = symbol;
            tempNum1 = num2;
            secThree.textContent = '';
            secFour.textContent = '';
            num2 = null;
            repeatOp = currentOp;
            currentOp = operation[e.target.id]['fn'];
            pmmd.forEach(el => el.classList.remove('selected'));
            e.target.classList.add('selected');
        } else if (!num1 && num2) {
            num1 = num2;
            num2 = null;
            tempSymb1 = symbol;
            currentOp = operation[e.target.id]['fn'];
            pmmd.forEach(el => el.classList.remove('selected'));
            e.target.classList.add('selected');
            secOne.textContent = round(num1);
            secTwo.textContent = '';
            secTwo.textContent = symbol;
            secThree.textContent = '';
            secFour.textContent = '';
        } else if (num1 && !num2) {
            // if (!calcDone) tempSymb2 = secTwo.textContent;
            currentOp = operation[e.target.id]['fn'];
            pmmd.forEach(el => el.classList.remove('selected'));
            e.target.classList.add('selected');
            secTwo.textContent = symbol;
        } else if (!num1 && !num2) {
            currentOp = operation[e.target.id]['fn'];
            e.target.classList.add('selected');
            num1 = '0';
            secOne.textContent = round(num1);
            secTwo.textContent = symbol;
        }  
        else {
            return;
        }
    });
});

const equal = document.getElementById('equal');
equal.addEventListener('click', equals);

function equals() {
    cClicked = false;
    ceClicked = false;
    if (num1 && num2) {
        pmmd.forEach(el => el.classList.remove('selected'));
        tempNum1 = num2;
        tempNum2 = num1;
        num2 = currentOp(num1, num2);
        secThree.textContent = tempNum1;
        secFour.textContent = '=';
        primaryDisplay.textContent= round(num2);
        num1 = null;
        repeatOp = currentOp;
        currentOp = null;
        calcDone = true;
        tempSymb2 = secTwo.textContent;
    } else if (repeatOp) {
        if (!num2) {
            if (calcDone) secTwo.textContent = tempSymb2;
            if (!calcDone) secTwo.textContent = tempSymb1;
            num1 = tempNum2;
            num2 = tempNum1;
            pmmd.forEach(el => el.classList.remove('selected'));
            tempSymb2 = secTwo.textContent;
        } else {
           num1 = num2;
           secTwo.textContent = tempSymb2;
        }
        secOne.textContent = round(num1);
        
        secThree.textContent = tempNum1;
        secFour.textContent = '=';
        num2 = tempNum1;
        num2 = repeatOp(num1, num2);
        primaryDisplay.textContent = round(num2);
        num1 = null;
        calcDone = true;
    } else {
        return;
    }
}

numButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        cClicked = false;
        ceClicked = false;
        addToDisplay(e.target.textContent);
    });
});

decimal.addEventListener('click', (e) => {
    cClicked = false;
    ceClicked = false;
    addToDisplay(e.target.textContent)
});

/* These buttons are negate, reciprocal, square and squareroot.
Since their functions look very similar I have combined them into
one using their id as function calls. */
const simpleFnBtns = document.querySelectorAll('.simple');
simpleFnBtns.forEach(button => {
    button.addEventListener('click', e => {
        cClicked = false;
        ceClicked = false;
        nrssq(e.target.id);
    });
});

function nrssq(fn) {
    if (num2) {
        if (calcDone) {
            secOne.textContent = '';
            secTwo.textContent = '';
            secThree.textContent = '';
            secFour.textContent = '';
        }
        num2 = operation[fn](num2);
        primaryDisplay.textContent = round(num2);
    } else {
        if (num1) {
            num1 = operation[fn](num1);
            primaryDisplay.textContent = round(num1);
            secOne.textContent = primaryDisplay.textContent;
        }
    }
}

percentBtn.addEventListener('click', calcPercent);

function calcPercent() {
    cClicked = false;
    ceClicked = false;
    const ADD = operation.add.fn;
    const SUB = operation.subtract.fn;
    const MULT = operation.multiply.fn;
    const DIV = operation.divide.fn;
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

backSpace.addEventListener('click', remove);

function remove() {
    cClicked = false;
    ceClicked = false;
    const num = primaryDisplay.textContent
    if (num.length == 1) {
        if (num2 && !num1 && calcDone) {
            primaryDisplay.textContent = '0';
            secOne.textContent = '';
            secTwo.textContent = '';
            secThree.textContent = '';
            secFour.textContent = '';
        }
        primaryDisplay.textContent = '0';
        console.log('here');
    } else if (
        num == 'NaN' ||
        num == 'uh oh' ||
        num == 'Infinity' ||
        num == '-Infinity' ||
        num.includes('e')) {
            primaryDisplay.textContent = '0';
            secOne.textContent = '';
            secTwo.textContent = '';
            secThree.textContent = '';
            secFour.textContent = '';
            currentOp = null;
            pmmd.forEach(el => el.classList.remove('selected'));
            console.log('here');
    } 
    else {
        const newStr = num.slice(0, -1);
        if (num2 && !num1 && calcDone) {
            secOne.textContent = '';
            secTwo.textContent = '';
            secThree.textContent = '';
            secFour.textContent = '';
            repeatOp = null;
            console.log('here');
        }
        if (newStr.charAt(newStr.length - 1) == '.') {
            primaryDisplay.textContent = newStr.slice(0, -1);
            console.log('here');
        } else {
            primaryDisplay.textContent = newStr;
            console.log('here');
        }
    }
    num2 = primaryDisplay.textContent;
}

function addToDisplay(input) {
    // const input = e.target.textContent;
    let display = primaryDisplay.textContent;
    if (display =='NaN' ||
        display == 'uh oh' ||
        display == 'Infinity' ||
        display == '-Infinity' ||
        display.includes('e')) {
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
            if (num1) {
                return;
            } else {
                primaryDisplay.textContent = input;
            }
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
        secOne.textContent = '';
        secTwo.textContent = '';
        secThree.textContent = '';
        secFour.textContent = '';
        repeatOp = null;
        primaryDisplay.textContent = input;
        num1 = null;
        calcDone = false;
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
            if (num <= -1e100) {
                roundedNumber = num.toExponential(7);
            }
            else if (num > -1e100 && num < 0) {
                roundedNumber = num.toExponential(8);
            } else if (num > 0 && num < 1e100) {
                roundedNumber = num.toExponential(9);
            } else {
                roundedNumber = num.toExponential(8);
            }
            
        }
        else if (intValue == 14) {
            roundedNumber = Math.floor(num);

        } else {
            if (Math.floor(num) == 0) {
                if (Math.abs(num) <= 1e-100) {
                    roundedNumber = num.toExponential(8);
                }
                else if (Math.abs(num) < 1e-12 && Math.abs(num) > 1e-100) {
                    roundedNumber = num.toExponential(9);
                } else {
                    roundedNumber = num.toFixed(13);
                }
            // If the number is below 0 and above -1
            } else if (Math.floor(num) == -1) {
                if (Math.abs(num) <= 1e-100) {
                    roundedNumber = num.toExponential(7);
                }
                if (Math.abs(num) < 1e-12 && Math.abs(num) > 1e-100) {
                    roundedNumber = num.toExponential(8);
                } else {
                    roundedNumber = num.toFixed(12);
                }
            }
             else {
                for (let i = 1; i < 14; i++) {
                    if (i == intValue) {
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
        clearMem.setAttribute('disabled', '');
        recallMem.setAttribute('disabled', '');
        recallMem.classList.remove('instore');
        cClicked = false;
    }
    if (memory) cClicked = true;
    num1 = null;
    num2 = null;
    tempNum1 = null;
    tempNum2 = null;
    tempSymb1 = null;
    tempSymb2 = null;
    currentOp = null;
    repeatOp = null;
    calcDone = false;
    pmmd.forEach(el => el.classList.remove('selected'));
    primaryDisplay.textContent = '0';
    secOne.textContent = '';
    secTwo.textContent = '';
    secThree.textContent = '';
    secFour.textContent = '';
}

function clearLast() {
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

// Keyboard input

document.addEventListener('keydown', (e) => {
    const name = e.key;
    if (name === 'Backspace') remove();
    if (name >= '0' && name <= '9') addToDisplay(name);
    if (name === '.') addToDisplay(name);
    if (name === 'Enter' || name === '=') {
        e.preventDefault();
        equals();
    }
    if (name === 'Escape') clear();
    if (name ==='z') clearLast();
    if (name === '+') {
        e.preventDefault();
        document.getElementById('add').click();
    }
    if (name === '-') {
        e.preventDefault();
        document.getElementById('subtract').click();
    }
    if (name === '*') {
        e.preventDefault();
        document.getElementById('multiply').click();
    }
    if (name === '/') {
        e.preventDefault();
        document.getElementById('divide').click();
    }
    if (name === '%') calcPercent();
    if (name === 's') nrssq('square');
    if (name === 'q') nrssq('sqrt');
    if (name === 'r') nrssq('reciprocal');
    if (name === 'n') nrssq('negate');
}, false);