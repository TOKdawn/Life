//  [无重复字符的最长子串](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
	if(s == ''){
		return 0;
	}
	var charPosition = {};
	var minSize = 1;
	var start = 0;
	var leng = s.length;
	for(i=0;i<leng;i++){
		if(charPosition[s[i]] >= start ){ //此字符在当前子串内已经出现 这里从start开始判定而不是从字符串的一开始
			minSize = Math.max(minSize,i - start);
			start = charPosition[s[i]] + 1 ; //记录最后一个子串起始位置
		}
		charPosition[s[i]] = i;
	}
	minSize = Math.max(minSize,leng-start)//
	return minSize;
};