var mySingletion = (function(){
    var instance;
    function init(){
        function privateMethod(){
            console.log("I am private");
        }
        var privateVariable = "Im also private";
        var privateRandomNumber = Math.random();
        return {
            publicMethod:function(){
                console.log("The public can see me!");
            },
            publicProperty: "I am also public",
            getRandomNumber:function(){
                return privateRandomNumber;
            }
        }
    }
    return{
        getInstance:function(){
            if(!instance){
                instance = init();
            }
            return instance;
        }
    }

})();
var singleA = mySingletion.getInstance();
var singleB = mySingletion.getInstance();
singleA.publicMethod();
console.log(singleA.getRandomNumber())
console.log(singleB.getRandomNumber())
console.log(singleA === singleB)
