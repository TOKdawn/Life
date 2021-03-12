function  debounce(fun,time,immediate) {
    let timer = null;
    return function(...args){
        clearTimeout(timer)
        //第一次是否立即执行
        if(immediate && !timer){
            fun.apply(this,args)
        }
        //设定延时函数
        timer = setTimeout(()=>{
            fun.apply(this,args);
        },time)
    }
    
}

function throttle(fun,time){
    let Timestamp = 0;
    return function(...args){
        if(  Date.now() - Timestamp > time){
            this.Timestamp =  Date.now()
            fun.apply(this,args)
        }
    }
}

var deepEqual = function(x, y) {
    // 指向同一内存
    if(x === y) {
        return true;
    }
    // 判断是否是对象
    if(typeof x === 'object' && x != null && typeof y === 'object' && y != null){
        // 判断对象属性的个数是否相等
        if(Object.keys(x).length !== Object.keys(y).length) {
            return false;
        }
        for(let prop in x) {
            if(y.hasOwnProperty(prop)) {
                if(!deepEqual(x[prop], y[prop])) {
                    return false;
                }
            } else {
                return false
            }
        }
        return true;
    } else {
        // 不是对象且不满足 === 则直接返回false
        return false;
    } 
}
var copyObj = function(obj){
    var newObj = {}
    for(prop in obj){
        if(obj.hasOwnProperty(prop)){
            newObj[prop] = obj[prop]
        }
    }
    return newObj
}
var deepObj = function(obj){
    var newObj = {}
    for(prop in obj){
        if(obj.hasOwnProperty(prop)){
            newObj[prop] = obj[prop]
        }
    }
}



function deepCopy(originObj, map = new WeakMap()) {//WeakMap对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的
    // 判断是否为基本数据类型
    if(isObject(originObj)) {
        // 判断是否为循环引用
        if(map.get(originObj)) {// originObj是可枚举对象则返回否则返回undefined
            return map.get(originObj);
        }
       
        // 判断是否为几种特殊需要处理的类型
        let type = [Date, RegExp, Set, Map, WeakMap, WeakSet];
        if(type.includes(originObj.constructor)) {//检查素组中是否包含某值 
            return new originObj.constructor(originObj);
        }
        // 其他类型
        let allDesc = Object.getOwnPropertyDescriptors(originObj);
        let cloneObj = Object.create(Object.getPrototypeOf(originObj), allDesc);

        // Reflect.ownKeys 可以获取到
        for(const prop of Reflect.ownKeys(originObj)) {
            cloneObj[prop] = isObject(originObj[prop]) && typeof originObj[prop] !== 'function' ? deepCopy(originObj[prop], map) : originObj[prop];
        }
        return cloneObj;
    } else {
        return originObj;
    }
}

// 是否为引用类型
function isObject(obj) {
    return typeof obj === 'object' || typeof obj === 'function' && obj !== null;
}

let obj = {
    fun: function(){},
    syb: Symbol('foo'),
    a: undefined,
    b: NaN,
    c: Infinity,
    reg : /^abc$/,
    date: new Date(),
    set: new Set([1, 2, 3, 4, 4]),
    map: new Map([
        ['name', '张三'],
        ['title', 'Author']
      ]),
    text:'aaa',
}
let cloneObj = deepCopy(obj);
console.log(cloneObj);

var add = (res,...args)=>{
    if(args.length>1){
        return this(args[0]+res,args)
    }else{
        return args[0]+res
    }
}

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
    : (..._args) => curry(fn, ...args, ..._args);
}

function add1(x, y, z) {
    return x + y + z;
}
const add = curry(add1);
console.log(add(1, 2, 3));
console.log(add(1)(2)(3));
console.log(add(1, 2)(3));
console.log(add(1)(2, 3));


const curry = (fn, ...args) => { return args.length >= fn.length ? fn(...args)  : (..._args) => curry(fn, ...args, ..._args)}

function add1(x, y, z) {
    return x + y + z;
}
const add = curry(add1);
console.log(add(1, 2, 3));
console.log(add(1)(2)(3));
console.log(add(1, 2)(3));
console.log(add(1)(2, 3));


const curry = (fn, ...args) => {
    // 函数的参数个数可以直接通过函数数的.length属性来访问
    // console.log('fn:',fn,'args:',args)
    args.length >= fn.length // 这个判断很关键！！！
    // 传入的参数大于等于原始函数fn的参数个数，则直接执行该函数
    ? fn(...args)
    /**
     * 传入的参数小于原始函数fn的参数个数时
     * 则继续对当前函数进行柯里化，返回一个接受所有参数（当前参数和剩余参数） 的函数
    */
    : (..._args) => curry(fn, ...args, ..._args);
}


function deepCopy(originObj, map = new WeakMap()) {
    // 判断是否为基本数据类型
    if(isObject(originObj)) {
        // 判断是否为循环引用
        if(map.get(originObj)) {
            return map.get(originObj);
        }
        // 判断是否为几种特殊需要处理的类型
        let type = [Date, RegExp, Set, Map, WeakMap, WeakSet];
        if(type.includes(originObj.constructor)) {
            return new originObj.constructor(originObj);
        }
        // 其他类型
        let allDesc = Object.getOwnPropertyDescriptors(originObj);
        let cloneObj = Object.create(Object.getPrototypeOf(originObj), allDesc);

        // Reflect.ownKeys 可以获取到
        for(const prop of Reflect.ownKeys(originObj)) {
            cloneObj[prop] = isObject(originObj[prop]) && typeof originObj[prop] !== 'function' ? deepCopy(originObj[prop], map) : originObj[prop];
        }
        return cloneObj;
    } else {
        return originObj;
    }
}

// 是否为引用类型
function isObject(obj) {
    return typeof obj === 'object' || typeof obj === 'function' && obj !== null;
}

let obj = {
    fun: function(){},
    syb: Symbol('foo'),
    a: undefined,
    b: NaN,
    c: Infinity,
    reg : /^abc$/,
    date: new Date(),
    set: new Set([1, 2, 3, 4, 4]),
    map: new Map([
        ['name', '张三'],
        ['title', 'Author']
      ]),
    text:'aaa',
}
let cloneObj = deepCopy(obj);
console.log(cloneObj);


var curry = (fun,...args) => fun.length<=args ? fun(...args) : (..._args) => curry(fun,...args,..._args)

const handler = {
    get: function(obj, prop) {
        return prop in obj ? obj[prop] : 37;
    }
};

const p = new Proxy({}, handler);
p.a = 1;
p.b = undefined;

console.log(p.a, p.b);      // 1, undefined
console.log('c' in p, p.c); // false, 37


class Promise {
    constructor(fn) {
        /**
         *  三种状态 
         *  pending：进行中
         *  fulfilled：已成功
         *  rejected: 已失败
         */
        this.status = 'pending';
        this.resoveList = []; // 成功后回调函数
        this.rejectList = []; // 失败后的回调函数

        fn(this.resolve.bind(this), this.reject.bind(this));
    }
    then(scb, fcb) {
        if (scb) {
            this.resoveList.push(scb);
        }
        if(fcb) {
            this.rejectList.push(fcb);
        }
        return this;
    }
    catch(cb) {
        if (cb) {
            this.rejectList.push(cb);
        }
        return this;
    }
    resolve(data) {
        if (this.status !== 'pending') return;
        this.status = 'fulfilled';
        setTimeout(() => {
            this.resoveList.forEach(s => {
                data = s(data);
            })
        })
    }
    reject(err) {
        if (this.status !== 'pending') return;
        this.status = 'rejected';
        setTimeout(() => {
            this.rejectList.forEach(f => {
                err = f(err);
            })
        })
    }
    /**
     * 实现Promise.resolve
     * 1.参数是一个 Promise 实例, 那么Promise.resolve将不做任何修改、原封不动地返回这个实例。
     * 2.如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的 Promise 对象，状态为resolved。
    */ 
    static resolve(data) {
        if (data instanceof Promise) {
            return data;
        } else {
            return new Promise((resolve, reject) => {
                resolve(data);
            })
        }
    }
    // 实现Promise.reject
    static reject(err) {
        if (err instanceof Promise) {
            return err;
        } else {
            return new Promise((resolve, reject) => {
                reject(err);
            })
        }
    }
    /**
     * 实现Promise.all
     * 1. Promise.all方法接受一个数组作为参数，p1、p2、p3都是 Promise 实例，如果不是，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。
     * 2. 返回值组成一个数组
    */
    static all(promises) {
        return new Promise((resolve, reject) => {
            let promiseCount = 0;
            let promisesLength = promises.length;
            let result = [];
            for(let i = 0; i < promises.length; i++) {
                // promises[i]可能不是Promise类型，可能不存在then方法，中间如果出错,直接返回错误
                Promise.resolve(promises[i])
                    .then(res => {
                        promiseCount++;
                        // 注意这是赋值应该用下标去赋值而不是用push，因为毕竟是异步的，哪个promise先完成还不一定
                        result[i] = res;
                        if(promiseCount === promisesLength) {
                           return resolve(result);
                        }
                    },(err) => {
                        return reject(err);
                    }
                )
            }
        })
    }
    /**
     * 实现Promise.race
     * 1. Promise.race方法的参数与Promise.all方法一样，如果不是 Promise 实例，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。
     * 2. 返回那个率先改变的 Promise 实例的返回值
    */
    static race(promises) {
        return new Promise((resolve, reject) => {
            for(let i = 0; i < promises.length; i++) {
                Promise.resolve(promises[i])
                    .then(res => {
                        return resolve(res);
                    },(err) =>{
                        return reject(err);
                    }
                )
            }
        })
    }
}