var el = document.getElementsByClassName('button');

function addEL() {
    var i;
    for (i = 0; i < el.length; i = i + 1) {
        el[i].addEventListener('click', displayNumber);
    }
}

addEL();

var str1 = '';


function displayNumber() {
    console.log(str1);
    var number = this.dataset.number;
    var dsp = document.getElementById('display');
    if ((number === '+' || number === '-' || number === '*' || number === '/' || number === '.') && number === str1.toString().slice(-1)) {

    } else if (number === 'ac') {
        str1 = '0';
        dsp.innerHTML = str1;
    } else if (number === 'ce') {

    } else if (number === '=') {
        str1 = eval(str1);
        dsp.innerHTML = str1;
    } else {
        if (str1 === '0') {
            str1 = number;
            dsp.innerHTML = str1;
        } else {
            str1 += number;
            dsp.innerHTML = str1;
        }

    }

}
