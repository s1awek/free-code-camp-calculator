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

//function displayNumber() {
//    var str = event.path[0];
//    var dsp = document.getElementById('display');
//    dsp.innerHTML = str.id;
//    switch (str.id) {
//    case 'one':
//        str1 += '1';
//        console.log(str1);
//        dsp.innerHTML = str1;
//        break;
//    case 'two':
//        str1 += '2';
//        dsp.innerHTML = str1;
//        break;
//    case 'three':
//        str1 += '3';
//        dsp.innerHTML = str1;
//        break;
//    case 'four':
//        str1 += '4';
//        dsp.innerHTML = str1;
//        break;
//    case 'five':
//        str1 += '5';
//        dsp.innerHTML = str1;
//        break;
//    case 'six':
//        str1 += '6';
//        dsp.innerHTML = str1;
//        break;
//    case 'seven':
//        str1 += '7';
//        dsp.innerHTML = str1;
//        break;
//    case 'eight':
//        str1 += '8';
//        dsp.innerHTML = str1;
//        break;
//    case 'nine':
//        str1 += '9';
//        dsp.innerHTML = str1;
//        break;
//    case 'zero':
//        str1 += '0';
//        dsp.innerHTML = str1;
//        break;
//    case 'plus':
//        str1 += '+';
//        dsp.innerHTML = str1;
//        break;
//    case 'minus':
//        str1 += '-';
//        dsp.innerHTML = str1;
//        break;
//    case 'divide':
//        str1 += '/';
//        dsp.innerHTML = str1;
//        break;
//    case 'multip':
//        str1 += '*';
//        dsp.innerHTML = str1;
//        break;
//    case 'eql':
//        console.log(eval(str1));
//        if (eval(str1)) {
//            //console.log(eval(str1));
//            str1 = eval(str1);
//            dsp.innerHTML = str1;
//        } else {
//            dsp.innerHTML = 'error';
//        }
//
//
//        break;
//    case 'dot':
//        str1 += '.';
//        dsp.innerHTML = str1;
//        break;
//    case 'ac':
//        str1 += 'ac';
//        dsp.innerHTML = str1;
//        break;
//    case 'ce':
//        str1 += 'ce';
//        dsp.innerHTML = str1;
//        break;
//    default:
//        dsp.innerHTML = '';
//
//    }
//}
