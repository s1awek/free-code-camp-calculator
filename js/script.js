'use strict';
var el = document.getElementsByClassName('button');
var str = '';
var dsp = document.getElementById('display');
var operators = ['+', '-', '*', '/'];
dsp.innerHTML = '0';
// configure the default type of numbers as BigNumbers
math.config({
    number: 'BigNumber', // Default type of number:
    // 'number' (default), 'BigNumber', or 'Fraction'
    precision: 20 // Number of significant digits for BigNumbers
});

function addEL() {
    var i;
    for (i = 0; i < el.length; i = i + 1) {
        el[i].addEventListener('click', displayNumber);
    }
}
addEL();

function displayNumber() {
    var button = this.dataset.number;
    verify(button);
    if (str === 'error' || str === '') {
        str = '0';
    }
    dsp.innerHTML = str;
}

function verify(input) {
    var i;

    function checkDot() {
        var flag = false;
        for (i = str.lastIndexOf('.'); i < str.length; i = i + 1) {
            if (str.charAt(i) === '+' || str.charAt(i) === '-' || str.charAt(i) === '*' || str.charAt(i) === '/') {
                flag = true;
            }
        }
        if (flag) {
            return true;
        } else {
            return false;
        }
    }

    input = input.toString().replace('÷', '/');
    var lastChar = str.toString().slice(-1);


    if (lastChar === '.' && input === '.') {
        return;
    } else if (operators.indexOf(input) !== -1 && operators.indexOf(lastChar) !== -1) {
        return;
    } else if (dsp.innerHTML === '0' && (input === operators[2] || input === operators[3] || input === operators[0])) {
        return;
    } else if (input === '.' && str.lastIndexOf('.') > -1 && checkDot() === false) {
        return;
    } else if (input === 'ce') {
        if (dsp.innerHTML.length === 1) {
            str = '0';
            return str;
        } else {
            str = str.slice(0, -1);
            return str;
        }
    } else if (input === 'ac') {
        str = '0';
        return str;
    } else if (input === '=' && str !== 'error') {
        try {
            if (isNaN(math.eval(str).e)) {
                str = 'error';
            } else {
                str = math.format(math.eval(str));
            }
        } catch (err) {
            str = 'error';
        }
    } else if (input === '=' && str === 'error') {
        str = '0';

    } else {
        if (dsp.innerHTML === '0' && input !== '.') {
            str = input;
            return str;
        } else {
            str = str + input;
            return str;
        }

    }
}
