const curry = (fn, ...args) => args.length >= fn.length ? fn(...args) : (..._args) => curry(fn, ...args, ..._args)
const curry2 = (fn, ...args) =>{ args.length >= fn.length ? fn(...args) : (..._args) => curry(fn, ...args, ..._args)}
function fun(x, y, z) {
    return x + y + z;
}
const add = curry(fun);
const add2 = curry2(fun);
console.log(add(1, 2, 3));
console.log(add2(1, 2, 3));
