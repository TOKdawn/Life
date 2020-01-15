//  [64. 最小路径和](https://leetcode-cn.com/problems/minimum-path-sum/) 

var minPathSum = function(grid) {
    var dp = Array.from(new Array(grid.length),()=> new Array(grid[0].length))
    dp[0][0] = grid[0][0]
    for(var i = 0;i<grid.length;i++){
        for(var j = 1;j<grid[0].length;j++){
            if(i == 0){
                dp[i][j] = dp[i][j-1]+grid[i][j]
                continue;
            }
            if(j == 0){
                dp[i][j] = dp[i-1][j]+grid[i][j]
                continue;
            }
            dp[i][j] = Math.min(dp[i-1][j]+grid[i][j],dp[i][j-1]+grid[i][j])
        }
    }
    return dp[i-1][j-1]
};