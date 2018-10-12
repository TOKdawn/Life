const _ = require('../js/underscore.js')
_.map([1, 2, 3], function(num) { return num * 3; });
console.log(
    _.map({ one: 1, two: 2, three: 3 }, function(num, key) { return num * 3; }))
console.log(
    _.map([
        [1, 2],
        [3, 4]
    ], _.first))