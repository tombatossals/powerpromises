var Q = require('q'),
    pw = require('../powerpromises');

const NUMBER = 25;
const PARALLEL = 5;

var waitFn = function(number) {
    var df = Q.defer();

    console.log("start " + number + ".");
    setTimeout(function() {
        if ( number % 2 === 0) {
            console.log("done " + number + ".");
            df.resolve({ number: number, status: true });
        } else {
            console.log("fail " + number + ".");
            df.reject({ number: number, status: false });
        }
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

pw.chainPromises(waitFn, arrayOfNumbers(), 5).then(function(results) {
    console.log(results);
});
