var obj = {
    name:'das',
    age:12
}
var Pxy = new Proxy(obj,{
    deleteProperty: (target,key)=>{
        if(key==="name"){
            return false
        }else{
            return Reflect.deleteProperty(target,key)
        }
    }
})