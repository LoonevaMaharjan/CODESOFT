const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let currentValue = '';
let result = null;
let lastOperator = null;

for (let button of buttons) {
    button.addEventListener('click', handleButton);
}

function handleButton(event) {
    const buttonValue = event.target.value;

    if (event.target.id === 'clearButton') {
        currentValue = '';
        result = null;
        lastOperator = null;
        display.value = '';
        return;
    }

    if (buttonValue === undefined) {
        return;
    }

    if (!isNaN(buttonValue) || buttonValue === '.') {
        if (result !== null && lastOperator === null) {
            currentValue = '';
            result = null;
        }
        currentValue += buttonValue;
        display.value = currentValue;
    } else if (['+', '-', '*', '/'].includes(buttonValue)) {
        if (lastOperator && !currentValue.endsWith(lastOperator)) {
            calculate();
        }
        currentValue += buttonValue;
        display.value = currentValue;
        lastOperator = buttonValue;
    } else if (buttonValue === '=') {
        calculate();
        lastOperator = null;
    }
}

function calculate() {
    try {
        const expression = currentValue.replace(/÷/g, '/');
        result = eval(expression);
        display.value = result;
        currentValue = '' + result; 
    } catch (e) {
        display.value = 'Error';
        currentValue = '';
    }
}
