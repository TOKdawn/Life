
let Person = {
    name: 'Tom',
    say(...age) {
        console.log(this)
        console.log(`我叫${this.name}我今年${age}`)
        return this
    }
}

Person1 = {
    name: 'Tom1'
}
function getR(){
    return (Math.random() + new Date().getTime()).toString(32).slice(0.8)
}
Function.prototype.myApply = function(content){
    content = content || window
    var fn  = getR();
    content[fn] = this
    content[fn]([...arguments].splice(1));
    delete  content[fn]
    return this
}
Function.prototype.myBind = function(content){
    content = content || window;
    var _this = this
    var args = [...arguments].slice(1)
    return function newbind(){
        return  _this.myApply(content,args.concat([...arguments]))
    }
}
Function.prototype.myBindPlus = function(content){
    if (typeof this !== "function") {
        throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
      }
    content = content || window;
    var _this = this
    var fNOP = function () {};
    var args = [...arguments].slice(1)
    var newbind = function(){
        return _this.apply(this instanceof newbind ? this : content,args.concat(...arguments))

    }
    fNOP.prototype = this.prototype;
    newbind.prototype = new fNOP();
    return newbind;
}

var fn = Person.say.myBind(Person1,123,111)
fn()
fn(999,000)
console.log('bind:',fn(),fn(999,000))
var fn2 = Person.say.bind(Person1,123,111)
fn2()
fn2(999,000)
console.log('mybind:',fn2(),fn2(999,000))

