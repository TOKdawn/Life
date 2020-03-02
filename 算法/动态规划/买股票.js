// 123

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    if(prices.length == 1){return 0}
    function MAX(start,end){
        var res = 0;
        var MIN = prices[start];
        if(end==start){
            return 0;
        }
        for(var i = start+1; i <= end;i++){
            if(prices[i]<MIN){
            MIN = prices[i];
            continue; 
            }
            res = Math.max(res,prices[i] - MIN);
        }
        return res
    }
    var res = 0;
    for(var i = 0;i<prices.length;i++){
        res = Math.max(res,MAX(0,i)+MAX(i,prices.length-1))
    }
    return res; 
};


var maxProfit = function(prices) {
    
}