#powerpromises

Library for simplify the use of [javascript promises library q](http://documentup.com/kriskowal/q/). It allow us to chain a group of calls to a function and execute them in parallel, sequentially, or a limited parallel group of calls. Take a look at the examples:

##Parallel execution

```
var Q = require('q'),
    pw = require('../powerpromises');

const NUMBER = 100;

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

pw.chainPromises(waitFn, arrayOfNumbers());


```

##Sequential execution

```
var Q = require('q'),
    pw = require('../powerpromises');

const NUMBER = 3;
const PARALLEL = 1;

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
```

##Sequential execution with limited grouped calls in parallel

```
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

pw.chainPromises(waitFn, arrayOfNumbers(), 5);
```

##Sequential execution with limited grouped calls in parallel and error management

```
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
```
