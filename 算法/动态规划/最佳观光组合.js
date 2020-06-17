//1014. 最佳观光组合
/**
 * @param {number[]} A
 * @return {number}
 */
// (j>i)  A[i]+A[j]+j-i 
//j从0到A.length 遍历
//对于每个j; A[j]+j 都是固定值; A[j]-j也是固定值
//j向前推进一位,就j就成了i集合中的一员
//所以每次循环都可以计算到 A[j]-j 作为 i集合中的一个值 和A[j]+j作为当前节点的值
//维护一个i集合中最大值 maxA ,随着j推进不断更新
//
var maxScoreSightseeingPair = function(A) {
    var res = 0;
    var maxA = 0;
    for(var j=0;j<A.length;j++){
        res = Math(maxA + A[j]+j,res); //判断当前项和之前项集合中的最大值组合是不是结果
        maxA = Math.max(maxA,A[j]-j);//把当前项加入到之前项集合中,继续推进
    }
    return res;
};
