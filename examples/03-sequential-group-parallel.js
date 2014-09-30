var Q = require('q'),
    pw = require('../powerpromises');

const NUMBER = 100;
const PARALLEL = 5;

var waitFn = function(number) {
    var df = Q.defer();

    console.log("start " + number + ".");
    setTimeout(function() {
        console.log("done " + number + ".");
        df.resolve(true);
    }, 3000);

    return df.promise;
}

var arrayOfNumbers = function() {
    var arr = [];
    for (var i=0; i<NUMBER; i++) {
        arr.push(i); 
    }
    return arr;
};

pw.chainPromises(waitFn, arrayOfNumbers(), PARALLEL);
