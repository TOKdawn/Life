// [最短公共超序列](https://leetcode-cn.com/problems/shortest-common-supersequence/) 
var shortestCommonSupersequence = function(str1, str2) {
    //dp[y][x] 表示str1的前Y项与str2的前X项最大的公共子序列个数
    //此题就是求公共子序列题的变种,只不过是要在回溯时把应该剔除的元素保留下来而已
    var dp = Array.from(new Array(str1.length+1),() => new Array(str2.length+1).fill(0)) //构建动态方程默认值为0
    for(var i = 0;i<str1.length;i++){ //从0开始遍历,由当前状态推导下一个状态
        for(var j = 0; j<str2.length;j++){
            if(str1[i] == str2[j]){
                dp[i+1][j+1] =  dp[i][j] + 1 // 相等则公共子序列加一
            }else{
                dp[i+1][j+1] = Math.max(dp[i][j+1],dp[i+1][j]) // 不等则取dp(str1[y],str2[x-1])或dp(str1[y-1],str2[x])这两个前置状态的最大值,没计算的状态都为0,不会被取到
            }
        }
    }
    var res = ''
    var y = str1.length;
    var x = str2.length;
    while(y > 0 && x > 0){//进行回溯拼接
        if(str1[y-1] == str2[x-1]){//如果相等
            res = str1[y-1]+res //则将公共的字符拼接进结果
            y--;//str1的当前节点处理完,抛弃
            x--;//str2的当前节点处理完,抛弃
        }else {//如不相等,我们要把不属于公共子序列的项加入结果中
            if(dp[y][x-1]>dp[y-1][x]){ //dp[y-1][x]为去除str1中一个值的情况,公共子序列变小了,那说明当前str1中的这个值在公共子序列中
                res = str2[x-1] + res // 因为str1[y-1] != str2[x-1]不在公共序列,且str1[y-1]在公共子序列里,
                x--;//str2[x-1]就要加入到结果中
            }else { // 跟上面情况相反
                res = str1[y-1] + res
                y--;
            }
        }
    }//两个字符串中有一个遍历完了
    res =  str1.slice(0,y) + res //把另外一个字符串剩余的值都加入到结果中输出
    res = str2.slice(0,x) + res
    return res
};

