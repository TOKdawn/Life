/**
 * 当你在js的词法环境内查找变量时,会先从当前上下文环境中查找,如果没找到则从父级上下文变量中查找
 * 直到找到全局上下文环境都,没有则报错
 * 这样的由多层上下文环境构成的链条就是作用域链
 */
 var scope = "global scope";
 function checkscope(){
     var scope2 = 'local scope';
     return scope2;
 }
 checkscope();

 //res: local scope