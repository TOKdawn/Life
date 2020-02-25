// 广度优先搜索的基础上加上根据层次判定插入方式
var zigzagLevelOrder = function(root) {
    var data = []
    function tree(root, level){
        if(root  == null){
            return;
        }
        if(data[level] == undefined){
            data[level] = []
        }
        if(level % 2){
            data[level].unshift(root.val)
        }else{
            data[level].push(root.val)
        }
        tree(root.left,level + 1);
        tree(root.right,level + 1);
    }
    tree(root,0)
    return data;
};