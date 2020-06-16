/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    return turn(root)
};

var turn = function(root, res){
    if(root == null){
        return "N,"
    }
    return root.val + ',' +  turn(root.left) + turn(root.right);
}
/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    return unturn(data.split(','));
};

var unturn = function(data){
    var val = data.shift()
    if(val == 'N'){
        return null
    }
    var node = new TreeNode(val);
    node.left = unturn(data)
    node.right = unturn(data)
    return node
}
/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */