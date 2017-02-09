// I spent some time trying to solve Floating-Point error: if you want to calculate "0.3 - 0.1" you'll get "0.19999999999999998" instead of "0.2"
// Tried many solutions but none of them worked good enough and some of them was quite complicated.
// At the end I decided to use math.js library from here: http://mathjs.org - which nicely deals with the problem. (⌐■_■)
// I noticed interesting thing: at codepen.io most of calculators don't deal with Floating-Point error at all!
// Check it for yourself: http://codepen.io/search/pens?q=calculator&limit=all&type=type-pens
// Also many of the calculators at codepen.io don't deal with text overflowing in case of very long input ( ͡° ʖ̯ ͡° )
// If you found any bug in my code please let me know
'use strict';
var el = document.getElementsByClassName('button');
var str = '';
var dsp = document.getElementById('display');
var operators = ['+', '-', '*', '/'];
dsp.innerHTML = '0';

String.prototype.splice = function (idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
}; // splice() for strings prototype, http://stackoverflow.com/questions/4313841/javascript-how-can-i-insert-a-string-at-a-specific-index


// configure the default type of numbers as BigNumbers
math.config({
    number: 'BigNumber', // Default type of number: 'number' (default), 'BigNumber', or 'Fraction'
    precision: 20 // Number of significant digits for BigNumbers
});


// Takes care of display overflow
function mechanics() {
    if (dsp.innerHTML.length < 12) {
        $('#display').css('font-size', '54px');
        $('#display').css('padding-top', '0');
        $('#special').css('display', 'none');
    } else if (dsp.innerHTML.length === 12) {
        $('#display').css('font-size', '26px');
        $('#display').css('padding-top', '1px');
        $('#special').css('display', 'none');
    } else if (dsp.innerHTML.length === 23 && str.indexOf('<br />') === -1) {
        str = str + '<br />';
        $('#special').css('display', 'block');
    } else if (str.length === 53) {
        str = str.slice(0, -1);
        $('#special').css('display', 'block');
        dsp.innerHTML = str;
        $('#error').css('display', 'block');
        document.getElementById('message').innerHTML = 'Char limit hit';
    }
}


// Adds event listeners to all buttons
function addEL() {
    var i;
    for (i = 0; i < el.length; i = i + 1) {
        el[i].addEventListener('click', displayNumber);
    }
}
addEL();


// Takes user input, veryfies it by verify() and displays
function displayNumber() {
    var button = this.dataset.number; //reads button value from HTML5 'data-number'
    verify(button);
    if (str === '') {
        str = '0';
    } else if (str === 'error') {
        str = '0';
        $('#error').css('display', 'block');
        document.getElementById('message').innerHTML = 'Error';
    }
    dsp.innerHTML = str;
    mechanics();
}


// Veryfies user input
function verify(input) {
    // Decimal point check: returns 'true' if it's ok to display decimal point otherwise returns 'false'
    function checkDot() {
        var flag = false;
        var i;
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


    if (lastChar === '.' && input === '.') { // Avoid two decimal points next to each other
        return;
    } else if (operators.indexOf(input) !== -1 && operators.indexOf(lastChar) !== -1) { // Avoid two operators next to each other
        return;
    } else if (dsp.innerHTML === '0' && (input === operators[2] || input === operators[3] || input === operators[0])) { //Avoid operators as a first character (not including '-')
        return;
    } else if (input === '.' && str.lastIndexOf('.') > -1 && checkDot() === false) { // Avoid decimal point if not valid
        return;
    } else if (input === 'ce') { // Replaces last character to '0' if 'CE' was clicked
        if (dsp.innerHTML.length === 1) {
            str = '0';
            return str;
        } else {
            if (lastChar === '>') { // If input was too long for one line <br /> was added so before deleting last character it has to be removed
                str = str.replace('<br />', ''); // Removes <br />
                str = str.slice(0, -1); // Removes last character
                $('#special').css('display', 'none');
                return str;
            } else {
                $('#error').css('display', 'none');
                document.getElementById('message').innerHTML = '';
                str = str.slice(0, -1);
                return str;
            }
        }
    } else if (input === 'ac') {
        str = '0'; // Clears entire display to '0'
        $('#error').css('display', 'none');
        document.getElementById('message').innerHTML = '';
        return str;
    } else if (input === '=' && str !== 'error') {
        str = str.replace('<br />', ''); // Removes '<br />' before calculation
        // I used eval() and I know that eval() is evil ( ͡° ͜ʖ ͡° ) however for this simple task it fits perfectly and it's easy to use. In case of invalid input '0' will be displayed. NO BIG DEAL
        try {
            if (isNaN(math.eval(str).e)) { // Dividing by 0
                str = 'error';
            } else if (math.format(math.eval(str)).length < 12) {
                str = math.format(math.eval(str));
                $('#special').css('display', 'none');
            } else if (math.format(math.eval(str)).length < 23) {
                $('#display').css('font-size', '26px');
                $('#display').css('padding-top', '1px');
                $('#special').css('display', 'none');
                str = math.format(math.eval(str));
            } else if (math.format(math.eval(str)).length >= 23) {
                if (math.format(math.eval(str)).length <= 46) { // Insert <br /> in case of long calculation result between 23 and 46 characters
                    str = math.format(math.eval(str));
                    str = str.splice(23, 0, '<br />');
                    $('#display').css('font-size', '26px');
                    $('#special').css('display', 'block');
                } else { // In case of result is longer than 45 characters
                    $('#special').css('display', 'none');
                    $('#error').css('display', 'block');
                    document.getElementById('message').innerHTML = 'Char limit hit';
                    str = '0';
                }
            } else {
                str = '0';
            }
        } catch (err) { // In case of error
            str = 'error';
            console.log(err);
            $('#error').css('display', 'block');
            document.getElementById('message').innerHTML = 'Error';
        }
    } else if (input === '=' && str === 'error') {
        $('#error').css('display', 'block');
        document.getElementById('message').innerHTML = 'Error';
        str = '0'; // Display '0' in case of invalid calculation

    } else {
        if (dsp.innerHTML === '0' && input !== '.') { // Change '0' to '.' if it's first input from user
            str = input;
            $('#error').css('display', 'none');
            document.getElementById('message').innerHTML = '';
            return str;
        } else { // If all above ok, display input
            $('#error').css('display', 'none');
            document.getElementById('message').innerHTML = '';
            str = str + input;
            return str;
        }

    }
}
