//322. 零钱兑换
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    var DP = new Array(amount+1).fill(amount+1)
    DP[0] = 0;
    for(var i = 1;i<=amount;i++ ){
      coins.map((item)=>{
          if(i-item>=0){
              DP[i] = Math.min(DP[i],DP[i-item]+1)
          }
      })
    } 
    return DP[amount] > amount ? -1 : DP[amount];
  };

  
  class Solution {
    int ans=Integer.MAX_VALUE;
    public int coinChange(int[] coins, int amount) {
        Arrays.sort(coins);
        dfs(coins,coins.length-1,amount,0);
        return ans==Integer.MAX_VALUE?-1:ans;
    }
    public void dfs(int[] coins,int index,int amount,int cnt){
        if(index<0){
            return;
        }
        for(int c=amount/coins[index];c>=0;c--){
            int na=amount-c*coins[index];
            int ncnt=cnt+c;
            if(na==0){
                ans=Math.min(ans,ncnt);
                break;//剪枝1
            }
            if(ncnt+1>=ans){
                break; //剪枝2
            }
            dfs(coins,index-1,na,ncnt);
        }
    }
}

    
