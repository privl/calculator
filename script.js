let firstOperand = '';
let secondOperand = '';
let currentOperator = null;
let shouldResetDisplay = false;

const textDisplay = document.querySelector('#text');
const numberBtns = document.querySelectorAll('[data-number]');
const operatorBtns = document.querySelectorAll('[data-operator]');
const pointBtn = document.querySelector('#point');
const equalBtn = document.querySelector('#equal');
const reverseBtn = document.querySelector('#reverse');
const deleteBtn = document.querySelector('#delete');
const clearBtn = document.querySelector('#clear');

pointBtn.addEventListener('click', appendPoint);
equalBtn.addEventListener('click', calculate);
deleteBtn.addEventListener('click', deleteBack);
clearBtn.addEventListener('click', clearAll);
reverseBtn.addEventListener('click', reverseNumber);

numberBtns.forEach(numberBtn => {
    numberBtn.addEventListener('click', () => {
        appenedNumber(numberBtn.textContent);
    })
})

operatorBtns.forEach(operatorBtn => {
    operatorBtn.addEventListener('click', () => {
        setOperation(operatorBtn.textContent);
    })
})

function appenedNumber(number) {
    if (textDisplay.textContent === '0' || shouldResetDisplay) {
        textDisplay.textContent = '';
        shouldResetDisplay = false;
        textDisplay.textContent += number;
    } else if (textDisplay.textContent.length >= 12) {
        return;
    } else textDisplay.textContent += number;
}

function setOperation(operator) {
    if (currentOperator !== null) calculate();
    firstOperand = textDisplay.textContent;
    currentOperator = operator;
    shouldResetDisplay = true;
}

function calculate() {
    if (currentOperator === null || shouldResetDisplay === true) return;
    secondOperand = textDisplay.textContent;
    let result = operate(firstOperand, currentOperator, secondOperand);
    textDisplay.textContent = handleResult(result);
    currentOperator = null;
}

function operate(operand1, operator, operand2) {
    switch (operator) {
        case '+':
            return (+operand1 + +operand2);
        case '−':
            return (+operand1 - +operand2);
        case '×':
            return (+operand1 * +operand2);
        case '÷':
            return (+operand1 / +operand2);
    }
}

function handleResult(number) {
    number = number.toString();
    if (number.includes('.')) {
        let intPart = number.split('.')[0];
        if (intPart.length > 12 || number.includes('e')) {
            return 'TOO LARGE';
        } else {
            number = (Math.round(number * Math.pow(10, 11 - intPart.length)) /
                Math.pow(10, 11 - intPart.length));
        }
    } else if (number.length > 12) {
        return 'TOO LARGE';
    }
    return number;
}

function appendPoint() {
    if (shouldResetDisplay) {
        textDisplay.textContent = '0';
        textDisplay.textContent += '.';
        shouldResetDisplay = false;
    } else if (textDisplay.textContent.length >= 12 ||
        textDisplay.textContent.includes('.')) {
        return;
    } else textDisplay.textContent += '.';
}

function deleteBack() {
    textDisplay.textContent = textDisplay.textContent.slice(0, -1);
}

function clearAll() {
    textDisplay.textContent = '0';
    firstOperand = '';
    secondOperand = '';
    currentOperator = null;
    shouldResetDisplay = false;
}

function reverseNumber() {
    textDisplay.textContent = -textDisplay.textContent;
}