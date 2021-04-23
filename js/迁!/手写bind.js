// let Person = {
//     name: 'Tom',
//     say() {
//         console.log(this)
//         console.log(`我叫${this.name}`)
//     }
// }
//    // 先看代码执行效果
//    Person.say() //我叫Tom 
//    Person1 = {
//        name: 'Tom1'
//    }

//    // 我们尝试用原生方法call来实现this指向Person1
//    Person.say.call(Person1) //我叫Tom1

   function mySymbol(obj) {
    // 不要问我为什么这么写，我也不知道就感觉这样nb
    let unique = (Math.random() + new Date().getTime()).toString(32).slice(0, 8)
        // 牛逼也要严谨
    if (obj.hasOwnProperty(unique)) {
        return mySymbol(obj) //递归调用
    } else {
        return unique
    }
}
//接下来我们一并把多参数和执行完删除自定义方法删除掉一块搞定
Function.prototype.mycall = function(context,){
    context = context || window;
    var fn = (Math.random() + new Date().getTime()).toString(32).slice(0,8)
    context[fn] = this
    context[fn]( ...([...arguments].splice(1)))
    delete context[fn]
}

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

// Person.say.mycall(Person1,18)//我叫Tom1我今年18

Function.prototype.myapply = function(context){
    context = context || window;
    var fn = (Math.random()+ new Date().getTime()).toString(32).slice(0,8)
    context[fn] = this
    context[fn]([...arguments].splice(1))
    delete context[fn]
}

// Person.say.myapply(Person1,18,123,321)//我叫Tom1我今年18

Function.prototype.mybind = function(context){
    context = context || window;
    var _this = this
    var args = [...arguments].splice(1)
    return function newbind(...newArgs)  {
            return _this.apply(context, args.concat(newArgs)) //保证柯里话
         
        // console.log('args',args,'newArg:',newArgs)
    }
}
var fn = Person.say.mybind(Person1,123,111)
fn()
fn(999,000)
var fn2 = Person.say.bind(Person1,123,111)
fn2()
fn2(999,000)
console.log('bind:',fn2())
