var orangesRotting = function(grid) {
    var flash = [];
    for(var i = 0; i<grid.length; i++){
        for(var j = 0;j<grid[i].length; j++){
            if(grid[i][j]== 1){
                flash.push({
                    x:i,
                    y:j
                })
            }
        }
    } 
   var num = 0;
   var flag = true;
   var x1,x2,x3,x4,y1,y2,y3,y4;
    while(flag){
        flag = false;
        flash.map((item,index)=>{
            if(grid[item.x-1][item.y] == 2 ||grid[item.x+1][item.y] == 2||grid[item.x][item.y-1]== 2||grid[item.x][item.y+1] == 2){
                
            }
        })
    }
}