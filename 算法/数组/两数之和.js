//[ 两数之和](https://leetcode-cn.com/problems/two-sum/)
// 遍历同时做反向索引
var twoSum = function(nums, target) {
	let Arrlength = nums.length;
	let elementToIndex = []
	for(var i = 0;i < Arrlength; i++){
		var diff = target - nums[i]
		if(elementToIndex[diff] != undefined){
			return [i,elementToIndex[diff]]
		} 
		elementToIndex[nums[i]] = i 
	}
};