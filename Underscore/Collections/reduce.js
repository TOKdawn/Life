const _ = require('../js/underscore.js')

function iteratee(memo, vaule, index, list) {
    console.log(memo, vaule, index, list)
    return memo + vaule;
}

var sum = _.reduce([2, 5, 8], iteratee, 0);