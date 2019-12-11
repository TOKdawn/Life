//[最长回文子串](https://leetcode-cn.com/problems/longest-palindromic-substring/)
var longestPalindrome = function(s) {             
    var X = 1; //记录剩余未匹配项的起始位置
    var MAX = 0;//当前回文串的最大值
    var res = 1;
    var Dstr ='$#' + s.split('').join('#')+'#' //插入#,$标识边界
    var centre = [0,0]//前两位
    //R = X + centre[X]    L = X - centre[X] 
    var computeLength = (defaultValue, i) => {
        while(1){
            if(Dstr[i + defaultValue + 1] == Dstr[i - defaultValue - 1]){//不符合回文
                defaultValue ++;
            }else{
                centre[i] = defaultValue;
                if(defaultValue > MAX){
                    MAX = defaultValue
                    res = i
                }
                if(i + centre[i] > X + centre[X]){
                    X = i
                }
                return;
            }
        }
    }
    for(var i = 2; i<Dstr.length; i++){//先判断越界
        var i_mirror = 2 * X - i; // i的相对下标
       if(i_mirror == 1 ||  i + centre[i_mirror]  >= X + centre[X]){ // A遇到了原列表左边界 || B大于等于了R        对于初始状态,i会大于R 
            computeLength(0,i)
        }else if((i - X) * 2 > centre[X] ){
            computeLength(X + centre[X] - i, i)
        }else{
            centre[i] = centre[ i_mirror] //理想情况等于关于X的对称点
        }
    }     
    return s.slice(parseInt((res - centre[res] )/2),parseInt((res - centre[res] )/2)+MAX) 
};
