function deepCopy(originObj, map = new WeakMap()) {
    // 判断是否为基本数据类型
    if(isObject(originObj)) {
        // 判断是否为循环引用
        if(map.get(originObj)) { //检测是否存在已经处理过的对象
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
        map.set(originObj,cloneObj) //把克隆的对象存储到weakMap中
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
var b={gg:123,ff:a}
var a={
    c:{
        k:1,
        k2:2
    },
    d:{
        d1:[1,2],
        d2:b,
        d3:{
            f1:'kkk'
        }
    }
}
b.ff = a
console.log(deepCopy(a))