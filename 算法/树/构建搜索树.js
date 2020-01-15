/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number} n
 * @return {TreeNode[]}
 */
var generateTrees = function(n) {
    if(n == 0){return []}
    function BST(start,end){ //从0----n的连续字符串分为两段
        var TreeList = []
        if(start > end){ // 某段为空
            return [null];
        }
        if(start == end) {
            return [new TreeNode(start)]; // 某段为1,为次子树的最后一个节点
        };
        for(var i = start; i<=end;i++){ // 分段
               var left = BST(start,i-1); // 左段可以构成的子树
               var right  = BST(i+1,end); // 右段可以构成的子树
               for(var x = 0;x<left.length;x++){ 
                   for(var y = 0;y<right.length;y++){
                       var node = new TreeNode(i) //从 i 分段,i为根借点
                       node.left = left[x]; // 所有左子树的可能
                       node.right = right[y]; // 所有右子树的可能
                       TreeList.push(node) // 组合返回
                   }
               }
        }
        return TreeList;
    }
    return BST(1,n)
};