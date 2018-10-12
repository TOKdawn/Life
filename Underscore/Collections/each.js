const _ = require('../js/underscore.js')

function iteratee(element, index, list) {
    console.log('element:', element);
    console.log('index:', index);
    console.log('list:', list, '\n');
}
_.each([1, 2, 3], iteratee);
_.each({
    one: 1,
    two: 2,
    three: 3,
    text: function(data) {
        console.log('text run', data)
    }
}, iteratee);