//function splitA(str3) {
//    var arrS = [];
//    arrS = str3.split(/\*|\-|\+|\//g);
//    return arrS;
//}
//
//function splitB(str4) {
//    var arrS = [];
//    var newArr = [];
//    arrS = str4.split('');
//    for (var elem in arrS) {
//        if (arrS[elem] === '-' || arrS[elem] === '+' || arrS[elem] === '*' || arrS[elem] === '/') {
//            newArr.push(arrS[elem]);
//        }
//    }
//    return newArr;
//}
//
//function concat() {
//    var tempArr3 = [];
//    var tempArr4 = [];
//    for (var elem in tempArr1) {
//        if (tempArr1[0] === '') {
//            //tempArr2[elem] = '-' + tempArr2[elem];
//
//            if (elem === '0') {
//                tempArr3.push('-' + (tempArr1[parseInt(elem) + 1]));
//            } else {
//                tempArr3.push(tempArr2[elem]);
//                tempArr3.push(tempArr1[parseInt(elem) + 1]);
//            }
//        } else {
//            tempArr3.push(tempArr1[elem]);
//            tempArr3.push(tempArr2[elem]);
//        }
//    }
//
//    for (var i = 0; i < tempArr3.length; i = i + 1) {
//        if (tempArr3[i] !== undefined) {
//            tempArr4.push(tempArr3[i]);
//        }
//    }
//    return tempArr4;
//}
//
//function result() {
//    while (conArr.length > 1) {
//        var tempStr = '';
//        var tempArr = [];
//
//        function reduceArr(a) {
//            var index = conArr.indexOf(a);
//            tempArr.push(conArr[index - 1]);
//            tempArr.push(conArr[index]);
//            tempArr.push(conArr[index + 1]);
//            tempStr = tempArr.join('');
//            console.log(tempStr);
//            tempStr = calculateInteger(tempStr);
//            console.log('tempStr=', tempStr, 'tempArr', tempArr);
//            conArr.splice(index - 1, 3);
//            conArr.splice(index - 1, 0, tempStr.toString());
//            tempArr = [];
//            tempStr = '';
//        }
//        if (conArr.indexOf('/') > 0 || conArr.indexOf('*') > 0) {
//            if (conArr.indexOf('*') === -1) {
//                reduceArr('/');
//            } else if (conArr.indexOf('/') === -1) {
//                reduceArr('*');
//            } else {
//                if (conArr.indexOf('/') < conArr.indexOf('*')) {
//                    reduceArr('/');
//                } else {
//                    reduceArr('*');
//                }
//            }
//        } else {
//            if (conArr.indexOf('-') > 0 || conArr.indexOf('+') > 0) {
//                if (conArr.indexOf('-') === -1) {
//                    reduceArr('+');
//
//                } else if (conArr.indexOf('+') === -1) {
//                    reduceArr('-');
//
//                } else {
//                    if (conArr.indexOf('-') < conArr.indexOf('+')) {
//                        reduceArr('-');
//                    } else {
//                        reduceArr('+');
//                    }
//                }
//
//            }
//        }
//    }
//}
//
//function calculateInteger(str1) {
//    var res = '';
//    var arr = [];
//    var x;
//
//    //    function returnRes(op) {
//    //        var tempRes;
//    //        x = new Decimal(arr[0]);
//    //        if (x.e >= 0) {
//    //            tempRes = x[op](arr[1]).d.join('');
//    //        } else if (x.e < 0) {
//    //            tempRes = x[op](arr[1]).d;
//    //            tempRes = tempRes.toString();
//    //            for (var i = x.e; i < 0; i = i + 1) {
//    //                tempRes = '0' + tempRes;
//    //            }
//    //            tempRes = '.' + tempRes;
//    //        }
//    //        if (x[op](arr[1]).s === -1) {
//    //            res = '-' + tempRes;
//    //        } else {
//    //            res = tempRes;
//    //        }
//    //    }
//
//    if (str1.lastIndexOf('-') > 0) {
//        //arr = str1.split('-');
//        x = math.eval(str)
//
//        if (arr[0] === '') {
//            arr.shift();
//            arr[0] = '-' + arr[0];
//        }
//    } else if (str1.indexOf('*') !== -1 || str1.indexOf('/') !== -1 || str1.indexOf('+') !== -1) {
//        if (str1.indexOf('+') !== -1) {
//            arr = str1.split('+');
//            returnRes('add');
//        } else if (str1.indexOf('*') !== -1) {
//            arr = str1.split('*');
//            returnRes('times');
//        } else if (str1.indexOf('/') !== -1) {
//            arr = str1.split('/');
//            returnRes('div');
//        }
//    }
//    return res;
//}
