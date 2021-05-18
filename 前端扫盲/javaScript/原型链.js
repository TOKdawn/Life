function Person() {//这是一个构造函数
    this.age = 11
}
var person = new Person();//通过构造函数构建实例
person.name = 'Kevin';

//每一个JavaScript对象(null除外)在创建的时候就会与之关联另一个对象，这个对象就是我们所说的原型，每一个对象都会从原型"继承"属性。
//这是每一个JavaScript对象(除了 null )都具有的一个属性，叫__proto__，这个属性会指向该对象的原型。
//每个原型都有一个 constructor 属性指向关联的构造函数

function Person() {

}

var person = new Person();

console.log(person.__proto__ == Person.prototype) // true
console.log(Person.prototype.constructor == Person) // true
// 顺便学习一个ES5的方法,可以获得对象的原型
console.log(Object.getPrototypeOf(person) === Person.prototype) // true





function Person() {

}
var person = new Person();
console.log(person.constructor === Person); // true
// 当获取 person.constructor 时，其实 person 中并没有 constructor 属性,当不能读取到constructor 属性时，会从 person 的原型也就是 Person.prototype 中读取，正好原型中有该属性，所以：

person.constructor === Person.prototype.constructor