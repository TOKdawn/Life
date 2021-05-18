/**
 * 原型链继承
*/
function parent(){
    this.name = 'zzz'
}
parent.prototype.getName = function(){
    console.log(this.name)
}

function Child () {

}

Child.prototype = new Parent(); //构造函数Child的原型指向Parent的实例

var child1 = new Child();

console.log(child1.getName()) // kevin
//无法调用在实例化的时候传参,且父级实例对象属性共享

//构造函数继承

function Parent(){
    
}