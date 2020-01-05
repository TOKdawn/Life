const _ = require('../js/underscore.js')
var globals = {}

function makeBindFun(resolver) {
    return function(k, v) {
        var stack = globals[k] || [];
        globals[k] = resolver(stack, v);
        return globals;
    }
}
// makBindFun(fun1)(data1, data2)
var stackBinder = makeBindFun(function(stack, v) {
    stack.push(v);
    return stack;
})

function aaa(k, v) {
    var stack = globals[k] || [];
    globals[k] = function(stack, v) {
        stack.push(v);
        return stack;
    }()
    return globals;
}


var stackUnbinder = makeBindFun(function(stack) {
    stack.pop();
    return stack;
})
aaa('a', 1);
stackBinder('b', 100);
console.log(globals);