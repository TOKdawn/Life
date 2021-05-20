const curry = (fn, ...args) => {
    // 函数的参数个数可以直接通过函数数的.length属性来访问
    console.log('fn:',fn.length,'args:',args)
    return args.length >= fn.length // 这个判断很关键！！！
    // 传入的参数大于等于原始函数fn的参数个数，则直接执行该函数
    ? fn(...args)
    /**
     * 传入的参数小于原始函数fn的参数个数时
     * 则继续对当前函数进行柯里化，返回一个接受所有参数（当前参数和剩余参数） 的函数
    */
    : (..._args) => { console.log('...args:',...args,'..._args:',..._args); return curry(fn, ...args, ..._args)}
}
function add1(x, y, z) {
    console.log('do:',x,y,z)
    return x + y + z;
}

const curry3 = (fn, ...args) => args.length >= fn.length ? fn(...args) : (..._args) => curry(fn, ...args, ..._args)
// const curry2 = (fn, ...args) =>{ return (args.length >= fn.length ? fn(...args) : (..._args) => { console.log('...args',...args,'..._args:',..._args); return curry(fn, ...args, ..._args)})}
const add = curry3(add1);
console.log(add(1, 2, 3));
console.log(add(1)(2)(3));
console.log(add(1, 2)(3));
console.log(add(1)(2, 3));

var curry11 = function(fn) {
    var args = [...arguments].slice[1];
    return function(){
        var _args = args.concat([...arguments])
        return fn.apply(this,_args);
    }
}

function add(a, b) {
    return a + b;
}

var addCurry = curry11(add, 1, 2);
addCurry() // 3
//或者
var addCurry = curry11(add, 1);
addCurry(2) // 3
//或者
var addCurry = curry11(add);
addCurry(1, 2) // 3

