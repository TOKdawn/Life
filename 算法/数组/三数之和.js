//[三数之和](https://leetcode-cn.com/problems/3sum/) 
/*
* 先排序,然后从头开始设定基准值向后遍历到此值大于1
* 前后指针从首尾向中间遍历找到三值相加为0的结果
* 插入结果后去除前后指针相邻的重复项,因为数组有序,所以重复值只能为相邻的值
* 首指针每次从当前基准值后一位开始,基准值大于0为结束条件此时三个数都是正数了.
*/
var threeSum = function(nums) {
    var start,end;
    var res = []
    nums.sort(function(a,b){
        return a - b
    })
    for(var i = 0;i<nums.length;i++){
        if(nums[i] > 0){
            break;
        }
        if(i > 0 && nums[i] == nums[i-1]) continue;
        start = i+1
        end = nums.length-1
        while(start<end){
            var sum = nums[i]+nums[start]+nums[end] 
            if(sum == 0){
            res.push([nums[i],nums[start],nums[end]])
                while (start<end && nums[start] == nums[start+1]) start++; 
                while (start<end && nums[end] == nums[end-1]) end--; 
                start++;
                end--;
            } else if (sum < 0) start++;
            else if (sum > 0) end--;
        }
    }
    return res;
};