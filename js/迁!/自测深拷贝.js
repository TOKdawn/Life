var isObj = (obj)=>{
    return typeof obj ==='object' || typeof obj ==='function' && obj !== null;
}
var depCopy = (obj, map  = new WeakMap()) =>{
    if(isObj(obj)){
        if(map.get(obj)){
            return map.get(obj) // 如果存在循环引用
        }
        var type = [Date,Map,RegExp,WeakMap,WeakSet,Set]
        if(type.includes(obj.constructor)){
            return new obj.constructor(obj)
        }
        var portotype = Object.getOwnPropertyDescriptors(obj)
        var newObj = Object.create(Object.getPrototypeOf(originObj),portotype)
        map.set(obj,newObj) //把克隆的对象存储到weakMap中
        for(prop in Reflect.ownKeys(originObj)){
            if(isObject(obj[prop]) && typeof obj[prop] !== 'function'){
                newObj[prop] = depCopy(obj[prop],map)
            }else{
                newObj[prop] = obj[prop]
            }
        }
        return newObj;
    }else{
        return obj
    }
}