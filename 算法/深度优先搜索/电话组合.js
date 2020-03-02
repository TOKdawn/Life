var letterCombinations = function(digits) {
    if(digits == null || digits ==0){return []}
    var obj = {
        "2":"abc",
        "3":"def",
        "4":"ghi",
        "5":"jkl",
        "6":"mno",
        "7":"pqrs",
        "8":"tuv",
        "9":"wxyz"
    }
    var res = [""]
    for(var i=0;i<digits.length; i++) {
        var letter = obj[digits[i]];
        for(var j = 0;j<res.length;j++){
            var node = res.shift();
            for(var k=0;k<letter.length;k++){
                res.push(node+letter[k])
            }
        }
    return res;
}
};