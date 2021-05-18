/**
 * 
 * this指向只在词法环境内有意义
 * this指向的判断规则
 * 首先找到当前代码的词法环境是什么(主要就是当前代码在执行在那个函数内记录 MemberExpression )
 * 
 * */
 function foo() {
    console.log(this)
}

foo(); // MemberExpression 是 foo

function foo() {
    return function() {
        console.log(this)
    }
}

foo()(); // MemberExpression 是 foo()

var foo = {
    bar: function () {
        return this;
    }
}

foo.bar(); // MemberExpression 是 foo.bar
//然后判定 MemberExpression 是不是 Reference;类型 一般来说所有变量和函数都是Reference类型,除非是通过GetBase(ref)计算出来的结果
//如果不是Reference 则  this 值为undefined (浏览器环境下 undefined 就是windows)
// 如果 ref 是 Reference，并且 IsPropertyReference(ref) 是 true, 那么 this 的值为 GetBase(ref)
// 如果 ref 是 Reference，并且 base value 值是 Environment Record, 那么this的值为 ImplicitThisValue(ref)

var value = 1;

var foo = {
  value: 2,
  bar: function () {
    return this.value;
  }
}

//示例1
console.log(foo.bar()); // 2
//示例2
console.log((foo.bar)()); // 2
//示例3
console.log((foo.bar = foo.bar)()); // 1
//示例4
console.log((false || foo.bar)()); // 1
//示例5
console.log((foo.bar, foo.bar)()); // 1