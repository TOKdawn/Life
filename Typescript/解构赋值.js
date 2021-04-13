// let key: string ='Isaac,Magdalene,Cain,Judas,Eve,Samson,Azazel,Lazarus,Eden,Lost,Lilith,Keeper,Apollyon';
// let obj = {
//     a:123,
//     b:null,
//     c:undefined
// }
// let {a ,b,c}: {a:number,b:any,c:any} = obj
// console.log(a,b,c)
// function keepWholeObject(wholeObject: { a: string, b?: number }) {
//     let { a, b = 1001 } = wholeObject;
// }
// type C = { a: string, b?: number }
// function fun({ a, b }: C): void { //类型断言
//     // ...
//     console.log(a,b)
// }
// fun({a:'ddd',b:123})
// function f({ a, b } = { a: "", b: 0 }): void { //默认值 
//     // ...
//     console.log(a,b)
// }
// fun({a:'ddd'})
// function f1({ a, b } = { a: "def", b: 123 }): void { //默认值 
//     // ...
//     console.log(a,b)
// }
// f1(); //def 123
// f1({a:'new',b:undefined}) //new undefined
// f1({a:'new',b:999})//new 999
// function f2(obj?: { a: string, b: number }): void{
//     let { a='def', b = 123 } = obj;
//     console.log(a,b)
// }
// f2();//Cannot read property 'a' of undefined
// f2({a:'new',b:undefined}) //new 123
// f2({a:'new',b:999})//new 999
function f3(_a) {
    var _b = _a === void 0 ? { a: 'def', b: 123 } : _a, _c = _b.a, a = _c === void 0 ? "def" : _c, _d = _b.b, b = _d === void 0 ? 123 : _d;
    // ...
    console.log(a, b);
}
f3(); //def 123
f3({ a: 'new', b: undefined }); //new 123
f3({ a: 'new', b: 999 }); //new 999
