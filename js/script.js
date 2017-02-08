// I spent some time trying to solve Floating-Point error: if you want to calculate "0.3 - 0.1" you'll get "0.19999999999999998" instead of "0.2"
// Tried many solutions but none of it worked good enough and some of them was quite complicated.
// At the end I decided to use math.js library http://mathjs.org which deals with the problem nicely. (⌐■_■)
// I noticed interesting thing: at codepen.io most of calculators don't deal with Floating-Point error at all!
// Check it for yourself: http://codepen.io/search/pens?q=calculator&limit=all&type=type-pens
// Also many of the calculators at codepen.io don't deal with text overflowing in case very long input ( ͡° ʖ̯ ͡° )
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
    } else if (dsp.innerHTML.length === 12) {
        $('#display').css('font-size', '26px');
        $('#display').css('padding-top', '2px');
    } else if (dsp.innerHTML.length === 23 && str.indexOf('<br />') === -1) {
        str = str + '<br />';
    } else if (str.length === 53) {
        str = str.slice(0, -1);
        dsp.innerHTML = str;
        // TODO add some cool info
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
    var button = this.dataset.number;
    verify(button);
    if (str === 'error' || str === '') {
        str = '0';
    }
    dsp.innerHTML = str;
    mechanics();
}


// Veryfies user input
function verify(input) {
    var i;
    // Decimal point check: returns 'true' if it's ok to display decimal point otherwise returns 'false'
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
                return str;
            } else {
                str = str.slice(0, -1);
                return str;
            }

        }
    } else if (input === 'ac') {
        str = '0'; // Clears entire display to '0'
        return str;
    } else if (input === '=' && str !== 'error') {
        str = str.replace('<br />', ''); // Removes '<br />' before calculation
        // I used eval() and I know that eval() is evil ( ͡° ͜ʖ ͡° ) however for this simple task it fits perfectly and it's easy to use. In case of not valid input '0' will be displayed.
        try {
            if (isNaN(math.eval(str).e)) { // Dividing by 0
                str = 'error';
                // TODO create some cool notification
            } else if (math.format(math.eval(str)).length < 12) {
                str = math.format(math.eval(str));
            } else if (math.format(math.eval(str)).length < 23) {
                $('#display').css('font-size', '26px');
                $('#display').css('padding-top', '2px');
                str = math.format(math.eval(str));
            } else if (math.format(math.eval(str)).length >= 23) {
                if (math.format(math.eval(str)).length <= 46) { // Insert <br /> in case of long calculation result between 23 and 46 characters
                    str = math.format(math.eval(str));
                    str = str.splice(23, 0, '<br />');
                } else { // In case of result longer than 45 characters
                    str = 'Char limit hit';
                    // TODO create char limit notification
                }
            } else {
                str = '0';
            }
        } catch (err) { // In case of error
            str = 'error';
        }
    } else if (input === '=' && str === 'error') {
        str = '0'; // Display '0' in case of invalid calculation

    } else {
        if (dsp.innerHTML === '0' && input !== '.') { // Change '0' to '.' if it's first input from user
            str = input;
            return str;
        } else { // If all above ok, display input
            str = str + input;
            return str;
        }

    }
}
