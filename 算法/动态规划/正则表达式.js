//[正则表达式匹配](https://leetcode-cn.com/problems/regular-expression-matching/) 
var isMatch = function(s, p) {
    var dp = Array.from(new Array(s.length+1),()=>{return new Array(p.length+1)});// 构建状态数组+1 因为存在空的情况做前置状态
    // dp[x][y] 代表s的前x位是否和p的前y位匹配
    dp[0][0] = true; // 空匹配空成立
    for(var i = 1;i<= p.length; i++){ //从一开始匹配
        if(p[i] == '*' ){ //对于空字符串匹配只有*可以等同前一个状态,其他的都是错误
            dp[0][i] = dp[0][i-1]
        }else{
            dp[0][i] = false;
        }
    }
    if(s.length>=1){
        for(var i=1;i<=s.length;i++){
            dp[i][0]=false;
        }
    }
    for(var i = 1;i<=s.length;i++){
        for(var j = 1;j<=p.length;j++){
            switch(p[j]){
                case '.':
                    dp[i][j] = dp[i-1][j-1]
                    break;
                case '*':
                    if(s[i-1] == p[j-1] || p[j-1] == '.'){
                        dp[i][j] = dp[i-1][j-1]
                    }else{
                        dp[i][j] = false; //默认为不匹配
                        dp[i][j] = dp[i][j-1] || //只多一个*  的情况成立条件是去掉这个*也能匹配
                                   dp[i-1][j]||// 一个匹配字符加个* 的情况成立条件是前一个字符也能匹配
                                   dp[i][j-2]// 不匹配字符加个*  的情况成立条件是去掉不匹配字符和*能匹配
                    }
                break;
                default:
                if(s[i] == p[j]){
                    dp[i][j] = dp[i-1][j-1]
                }else{
                    dp[i][j] = false;
                }
                break;
            }
        }

    }
    return dp[s.length][p.length];
}