var minInsertions = function(s) {
    var dp = Array.from(new Array(s),() => new Array(s));// dp[x][y] 以x为起点时,y为终点的最长回文子序列
    for(var k = 0; k<s.length;k++){
        dp[i][i+0] = 1
    }
    for(var i = 0;i<s.length;i++){ // i对应dp方程中的x
        for(var j = 1; i+j<s.length;j++){ // i+j对应dp方程中的y
            if(s[i] == s[ i+j ]){
                dp[i][i+j] = dp[i+1][i+j-1]+2
            }else{
                dp[i][i+j] = Math.max(dp[i+1][i+j],dp[i][i+j-1])
            }
        }
    }
    return dp[0][s.length-1]
};