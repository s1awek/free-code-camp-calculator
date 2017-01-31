var el = document.getElementsByClassName('button');
var str1 = '0';
var dsp = document.getElementById('display');
var history = [];
dsp.innerHTML = '0'

function addEL() {
    var i;
    for (i = 0; i < el.length; i = i + 1) {
        el[i].addEventListener('click', displayNumber);
    }
}
addEL();

function displayNumber() {
    var number = this.dataset.number;
    var operators = ['.', '+', '-', '*', '/'];
    var lastChar = str1.toString().slice(-1);

    if (operators.indexOf(lastChar) !== -1 && this.dataset.nodouble) {
        return;
    } else if (number === operators[0] && str1.toString().indexOf(operators[0]) !== -1) {
        return;
    } else if (number === 'ac') {
        str1 = '0';
        dsp.innerHTML = str1;
    } else if (number === 'ce') {
        if (str1.length <= 1) {
            str1 = '0';
            dsp.innerHTML = str1;
        } else {
            str1 = str1.toString().slice(0, -1);
            dsp.innerHTML = str1;
        }

    } else if (number === '=') {
        str1 = eval(str1);
        dsp.innerHTML = str1;
    } else {
        if (str1 === '0' && number !== '.') {
            str1 = number;
            dsp.innerHTML = str1;
        } else {
            str1 += number;
            dsp.innerHTML = str1;
        }
    }
}
