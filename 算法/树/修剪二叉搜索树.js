/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} L
 * @param {number} R
 * @return {TreeNode}
 */
var trimBST = function(root, L, R) {
    if(root == null){
        return null // 为空特判
    }
    //对于当前节点进行判断
    if(root.val < L){
       return trimBST(root.right,L,R); //减掉整个左子树
    }
    if(root.val > R){
      return  trimBST(root.left,L,R); //减掉整个右子树
    }
    root.left = trimBST(root.left, L, R); 
    root.right = trimBST(root.right, L, R);//后序遍历所有的节点
    return root;
};