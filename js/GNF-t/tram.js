const curry = (fn, ...args) => args.length >= fn.length ? fn(...args) : (..._args) => curry(fn, ...args, ..._args)
const curry2 = (fn, ...args) => {
    return (args.length >= fn.length ? fn(...args) : (..._args) => {
        console.log('...args', ...args, '..._args:', ..._args);
        return curry(fn, ...args, ..._args)
    })
}

function fun(x, y, z) {
    return x + y + z;
}
const add = curry(fun);
const add2 = curry2(fun);
console.log(add(1, 2, 3));
console.log(add2(1, 2, 3));
(make_fact => 
    make_fact(make_fact)
    )
    (make_fact => 
        (fact => n => n === 0 ? 0 : n + fact(n - 1))
        (x => make_fact(make_fact)(x)))
        (15)