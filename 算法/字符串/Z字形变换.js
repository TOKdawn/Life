
// [ Z 字形变换](https://leetcode-cn.com/problems/zigzag-conversion/) 
/*
*
* 暴力一时爽,一直暴力一直爽
*
*/
var convert = function(s, numRows) { 
    if(numRows == 1 ){
        return s
    }
    if(numRows == 2 ){
        var n = parseInt(s.length / 2)
    }else{
        var n = parseInt(s.length / (2 * numRows-2)); //n个z  
    }
    var nodeW = (numRows-2+1); //没个z有几行
    var nodeH = numRows; // 没个z的高度
    var res = [];
    var W = (n+1)*nodeW // 最后的总宽度
    for(var i = 0;i<W;i++){
        res.push([]) //二维数组储存
    }
    var p = 0;
    var state;
    for(var i = 0; i<W ;i++){
         state = i % nodeW
         if(state == 0){
            for(var j = 0; j<numRows;j++){
                res[i][j] = s[p];
                p++
            }
         }else{
            for(var j = 0; j<numRows;j++){
                if(j ==  (numRows - state -1)){
                    res[i][j] = s[p];
                    p++;
                }else{
                    res[i][j] = null
                }
            }
         }
    }
    var Op = '';
    for(var i = 0; i<numRows;i++){
        for(var j = 0;j<W;j++){
            if(res[j][i]){
                Op += res[j][i]
            }
        }
    }
    return Op
};