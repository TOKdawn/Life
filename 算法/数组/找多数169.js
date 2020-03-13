var majorityElement = function(nums) {
    var data;
    var num = 0;
    for(var i=0; i<nums.length;i++){
        if(num == 0){
            data = nums[i]
        }
         nums[i] == data ? num++ : num--    
    }
    return data
};
