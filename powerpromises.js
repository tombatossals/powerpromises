'use strict';

var Q = require('q');

var parallelPromises = function(fn, values) {
    var df = Q.defer(),
        promises = [];

    for (var i in values) {
        var value = [].concat(values[i]);
        promises.push(fn.apply(this, value));
    }

    Q.allSettled(promises).then(function(results) {
        df.resolve(results);
    });

    return df.promise;
};

var chainSerialPromises = function(fn, arrayOfArguments) {
    var first = arrayOfArguments[0],
        results = [],
        df = Q.defer();

    arrayOfArguments = arrayOfArguments.splice(1);
    var promises = arrayOfArguments.reduce(function(previous, item) {
        return previous.then(function(partialResults) {
            for (var i in partialResults) {
                var p = partialResults[i];
                if (p.state === 'fulfilled') {
                    results.push(p.value);
                }
            }
            return parallelPromises(fn, item);
        });
    }, parallelPromises(fn, first));

    promises.then(function(partialResults) {
        for (var i in partialResults) {
            var p = partialResults[i];
            if (p.state === 'fulfilled') {
                results.push(p.value);
            }
        }
        df.resolve(results);
    });

    return df.promise;
};

var chainPromises = function(fn, arrayOfArguments, maxParallel) {
    var df = Q.defer();
    var blocks = [];
    for (var i=0; i<arrayOfArguments.length; i+=maxParallel) {
        var chunk = arrayOfArguments.slice(i, i+maxParallel);
        blocks.push(chunk);
    }

    return chainSerialPromises(fn, blocks);  
};

module.exports.chainPromises = chainPromises;
