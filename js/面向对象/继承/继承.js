function superclass(){
    this.superValue=true
}//为父类添加共有方
superclass.prototype.getsuperValue = function(){return this.superValue}


function subclass(){
    this.subValue=false
}//继承父
subclass.prototype = new superclass()//为子类添加共有方法subclass.prototype.getsubValue=function(){returnthis.subValue；}；

subclass.prototype.getsubValue=function(){
    return this.subValue
}
