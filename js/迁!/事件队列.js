let executeCount = 0
const fn = nums => {
  executeCount++
  return nums.map(x => x * 2)
}
const batcher = f => {
    let numPonds = [];
    const P = Promise.resolve().then(function dosub() {
        var res  = 0;
        res = f(numPonds)
        return res
    });
    return function UserCallFun(userArr) {
        var nowStart = numPonds.length
        numPonds = numPonds.concat(userArr)
        var nowend = numPonds.length
       var resArr =  P.then(function finishData(resPonds) {
            var resArr = []
            resArr = resPonds.slice(nowStart, nowend);
            return resArr;
        })
        return resArr
    }
  };
const batchedFn = batcher(fn);

const main = async () => {
  const [r1, r2, r3] = await Promise.all([
    batchedFn([1,2,3]),
    batchedFn([4,5]),
    batchedFn([7,8,9])
  ]);

  console.log([r1, r2, r3],executeCount)
}
main()