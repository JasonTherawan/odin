const display = document.querySelector("h1");
const buttons = document.querySelector(".buttons");
const buttonFill = ['C', 'CE', '√', '%', '7', '8', '9', '÷', '4', '5', '6', 'x', '1', '2', '3', '-', '0', '.', '=', '+'];
for(let i = 0; i < 20; i++) {
    const button = document.createElement('button');
    button.textContent = buttonFill[i];
    button.style.width = '70px';
    button.style.height = '50px';
    button.style.fontSize = '20px';
    button.addEventListener('click', (e) => {
        operate(e.target.textContent);
    });
    buttons.appendChild(button);
}

let arr = [];
let displayArr = [];
let result = 0;
let num = null;
let operationSign = null;
let isFirstNumFilled = false;
let nextNumber = false;
let lastOperator = '0';

function performOperation(operationSign, a, b) {
    switch (operationSign) {
        case '+': return a + b;
        case '-': return a - b;
        case 'x': return a * b;
        case '÷': return b === 0 ? 'Undefined' : a / b;
        case '√': return Math.sqrt(a);
        case '%': return a / 100;
    }
}

function operate(operator) {
    if(['+', 'x', '÷', '√', '%'].includes(operator) && (lastOperator < '1' || lastOperator > '9')) return;
    if(operator !== 'C' && operator !== 'CE') lastOperator = operator;
    if(!['+', '-', 'x', '÷', '√', '%', '=', 'C', 'CE'].includes(operator)) {
        arr.push(operator);
        displayArr.push(operator);
        display.textContent = displayArr.join('');
        if(nextNumber) {
            num = null;
            nextNumber = false;
        }
    } else if(operator == 'C') {
        if(['+', '-', 'x', '÷'].includes(lastOperator)) {
            lastOperator = arr[arr.length-1];
            arr = [num];
            num = null;
            operationSign = null;
            isFirstNumFilled = false;
        } else {
            arr.pop();
        }
        displayArr.pop();
        display.textContent = displayArr.join('');
    } else if(operator == 'CE') {
        arr = [];
        result = 0;
        num = null;
        operationSign = null;
        isFirstNumFilled = false;
        nextNumber = false;
        displayArr = [];
        display.textContent = '';
    } else {
        if(operator != '√' && operator != '%') {
            displayArr.push(operator);
            display.textContent = displayArr.join('');
        }
        if(nextNumber) nextNumber = false;
        if(num == null) {
            num = Number(arr.join(''));
            arr = [];
        }
        if(operator == '√' || operator == '%') {
            num = performOperation(operator, num);
            console.log(num);
            displayArr = [];
            displayArr.push(num);
            display.textContent = displayArr;
            arr = [];
            nextNumber = true;
        } else {
            if(isFirstNumFilled) {
                result = performOperation(operationSign, num, Number(arr.join('')));
                arr = [];
                if(operator == '=') {
                    num = null;
                    isFirstNumFilled = false;
                    displayArr = [];
                    display.textContent = result;
                } else {
                    num = result;
                    operationSign = operator;
                }
                console.log(result);
            } else {
                operationSign = operator;
                isFirstNumFilled = true;
            }
        }
    }
}