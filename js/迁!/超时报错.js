
const timeoutLimit = (fn,time) => {
    const now  = new Date();
    let P = new Promise((resolve)=>{
        fn.then(_=>resolve())
    })
        P.then(()=>{
            if(new Date() - now > time){
                console.error('time out');
                return false
            }else{
                console.error('sccuess');
                return true
            }
        }
    )
}

var long = new Promise((resolve)=>{
    setTimeout(() => {
        resolve()
    }, 2000);
})
var short = new Promise((resolve)=>{
    setTimeout(() => {
        resolve()
    }, 100);
})
console.log('run long')
timeoutLimit(long,1000)
console.log('run short')
timeoutLimit(short,1000)