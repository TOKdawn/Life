const _ = require('../js/underscore.js')
var evens = _.filter([1, 2, 3, 4, 5, 6], function(num) {
    return num % 2 == 0;
});