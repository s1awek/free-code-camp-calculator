var el = document.getElementsByClassName('button');
var str = '';
var dsp = document.getElementById('display');
var history = [];
var tempArr1 = [];
var tempArr2 = [];
var conArr = [];
var conArr1 = [];
var operators = ['+', '-', '*', '/'];
var ans;
dsp.innerHTML = '0';

function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

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
    dsp.innerHTML = str;
}

function verify(input) {

    function checkDot() {
        var flag = false;
        for (var i = str.lastIndexOf('.'); i < str.length; i = i + 1) {
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


    if (input === '0' && lastChar === '/') { //TODO make it working
        return;
    } else if (lastChar === '.' && input === '.') {
        return;
    } else if (operators.indexOf(input) !== -1 && operators.indexOf(lastChar) !== -1) {
        return;
    } else if (str.length === 0 && (input === operators[2] || input === operators[3] || input === operators[1])) {
        return;
    } else if (input === '.' && str.lastIndexOf('.') > -1 && checkDot() === false) {
        return;
    } else if (input === 'ce') {
        str = str.slice(0, -1);
        return str;
    } else if (input === 'ac') {
        str = '';
        return str;
    } else if (input === '=') {
        tempArr1 = splitA(str);
        tempArr2 = splitB(str);
        conArr = concat();
        result();
        str = conArr[0];
    } else {
        str = str + input;
        return str;
    }

}

function splitA(str3) {
    var arrS = [];
    arrS = str3.split(/\*|\-|\+|\//g);
    return arrS;
}

function splitB(str4) {
    var arrS = [];
    var newArr = [];
    arrS = str4.split('');
    for (var elem in arrS) {
        if (arrS[elem] === '-' || arrS[elem] === '+' || arrS[elem] === '*' || arrS[elem] === '/') {
            newArr.push(arrS[elem]);
        }
    }
    return newArr;
}

function concat() {
    var tempArr3 = [];
    var tempArr4 = [];
    for (var elem in tempArr1) {
        if (tempArr1[0] === '') {
            //tempArr2[elem] = '-' + tempArr2[elem];

            if (elem === '0') {
                tempArr3.push('-' + (tempArr1[parseInt(elem) + 1]));
            } else {
                tempArr3.push(tempArr2[elem]);
                tempArr3.push(tempArr1[parseInt(elem) + 1]);
            }
        } else {
            tempArr3.push(tempArr1[elem]);
            tempArr3.push(tempArr2[elem]);
        }
    }

    for (var i = 0; i < tempArr3.length; i = i + 1) {
        if (tempArr3[i] !== undefined) {
            tempArr4.push(tempArr3[i]);
        }
    }
    return tempArr4;
}

function result() {
    while (conArr.length > 1) {
        var tempStr = '';
        var tempArr = [];

        function reduceArr(a) {
            var index = conArr.indexOf(a);
            tempArr.push(conArr[index - 1]);
            tempArr.push(conArr[index]);
            tempArr.push(conArr[index + 1]);
            tempStr = tempArr.join('');
            console.log(tempStr);
            tempStr = calculateInteger(tempStr);
            console.log('tempStr=', tempStr, 'tempArr', tempArr);
            conArr.splice(index - 1, 3);
            conArr.splice(index - 1, 0, tempStr.toString());
            tempArr = [];
            tempStr = '';
        }
        if (conArr.indexOf('/') > 0 || conArr.indexOf('*') > 0) {
            if (conArr.indexOf('*') === -1) {
                reduceArr('/');
            } else if (conArr.indexOf('/') === -1) {
                reduceArr('*');
            } else {
                if (conArr.indexOf('/') < conArr.indexOf('*')) {
                    reduceArr('/');
                } else {
                    reduceArr('*');
                }
            }
        } else {
            if (conArr.indexOf('-') > 0 || conArr.indexOf('+') > 0) {
                if (conArr.indexOf('-') === -1) {
                    reduceArr('+');

                } else if (conArr.indexOf('+') === -1) {
                    reduceArr('-');

                } else {
                    if (conArr.indexOf('-') < conArr.indexOf('+')) {
                        reduceArr('-');
                    } else {
                        reduceArr('+');
                    }
                }

            }
        }
    }
}

function calculateInteger(str1) {
    var res = '';
    var arr = [];
    var x;

    function returnRes(op) {
        var tempRes;
        tempRes = math[op](math.bignumber(arr[0]), math.bignumber(arr[1]));
        res = math.number(tempRes);
    }

    if (str1.lastIndexOf('-') > 0) {
        arr = str1.split('-');
        returnRes('subtract');

        if (arr[0] === '') {
            arr.shift();
            arr[0] = '-' + arr[0];
        }
    } else if (str1.indexOf('*') !== -1 || str1.indexOf('/') !== -1 || str1.indexOf('+') !== -1) {
        if (str1.indexOf('+') !== -1) {
            arr = str1.split('+');
            returnRes('add');
        } else if (str1.indexOf('*') !== -1) {
            arr = str1.split('*');
            returnRes('multiply');
        } else if (str1.indexOf('/') !== -1) {
            arr = str1.split('/');
            returnRes('divide');
        }
    }
    return res;
}
