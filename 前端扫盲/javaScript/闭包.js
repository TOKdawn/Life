var a = 1;
function foo(){
    console.log(a);
}
foo();
// 传统意义上: 当一个函数访问到非当前函数作用域的外部自由变量就形成了闭包
//实际开发中我们更关注的闭包,是那些通过访问了已经被销毁的函数里的自由变量而形成的闭包
//如下:
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}

var foo = checkscope();
foo();
//虽然从作用域的角度看checkscope函数执行后上下文已经销毁,但实际上f还保存着包含checkscope上下文的作用域链,所以可以读到'local scope'


//例题:
var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = function () {
    console.log(i);
  };
}

data[0]();
data[1]();
data[2](); 
// res: 3 3 3

var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = (function (i) { //构造了三个独立的匿名上下文
        return function(){
            console.log(i);
        }
  })(i);
}

data[0]();
data[1]();
data[2]();
// res: 1 2 3