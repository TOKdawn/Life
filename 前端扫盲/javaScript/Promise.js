// Promise 含有三个状态 Pending ,Fulfilled ,Rejected
// new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve({ test: 1 })
//         resolve({ test: 2 })
//         reject({ test: 2 })
//     }, 1000)
// }).then((data) => {console.log('result1', data)},(data1)=>{console.log('result2',data1)}).then((data) => {
//     console.log('result3', data)
// })
function Promise(fn){
    let stat = 'pending';
    let value = null; 
    const callbacks = [];
    this.then = function (onFulfilled) {
        return new Promise((resolve,reject)=>{
            handle({
                onFulfilled,
                resolve
            })
        })
    }
}
function handle(callbacks){
    if(state === 'pending'){
        callbacks.push(callback)
        return;
    }
    if(status === 'Fulfilled'){
        if(!callback.onFulfilled){
            callback.resolve(value)
            return;
        }
        const ret = callback.onFulfilled(value)
        callback.resolve(ret);
    }
}