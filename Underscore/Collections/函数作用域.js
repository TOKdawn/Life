const flip = fn => (...args) => fn(args.pop(), ...args);

let a = {
    name: 'John Smith'
};
let b = {};
const mergeFrom = flip(Object.assign);
let mergePerson = mergeFrom.bind(null, a);
mergePerson(b); // == b
b = {};
Object.assign(b, a); // == b

// function flip(...args) {
//     return function(args) {
//         return fn(args.pop(), ...args)
//     }
// }

function ss() {
    Object.assign(a, )
}
var flip = function flip(fn) {
    return function(args) {
        return fn(args.pop(), args);
    };
};
// var flip = function flip(fn) {
//     return function() {
//         for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
//             args[_key] = arguments[_key];
//         }

//         return fn.apply(undefined, [args.pop()].concat(args));
//     };
// };
// flip(fn)(args)
// fn(args.pop(), args)