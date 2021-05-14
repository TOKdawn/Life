/**
 * JS采用静态的词法作用域
 * 函数在声明时绑定其作用域,从而决定执行函数时的变量访问权限
 * 
 */

 var value = 1;

 function foo() {//函数声明时就绑定了对应的作用域
     console.log(value);
 }
 
 function bar() {
     var value = 2;
     foo();
 }
 
 bar();  
 
 //res: 1


var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f();
}
checkscope();