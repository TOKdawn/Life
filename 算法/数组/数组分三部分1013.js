var canThreePartsEqualSum = function(A) {
    var sum = A.reduce((t,n)=>{return t+n})
    if(sum % 3){//不能整除肯定不符合
        return false
    }
    function sub(s,e){
        var num = 0;
        for(var i = s;i<=e;i++){
            num +=A[i]
        }
        return num
    }
    var num = sum / 3; 
    for(var i = 0;i<A.length;i++){
        if(sub(0,i)==num){//第一部分
            for(var j = i+1;j<A.length - 1;j++){//第二部分只能到倒数第二位,留给第三部分至少一个数
                if(sub(i+1,j)==num){
                    return true
                }
            }
        }
    }
    return false
};