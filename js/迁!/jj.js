function main() {
    console.log('do')
 var R =  new Promise((resolve, reject)=>{
  
   console.log('R',new Date())
   setTimeout(resolve(),3000)
 })
 R.then( ()=>{
      var G =  new Promise((resolve, reject)=>{
     
       console.log('G',new Date())
      setTimeout(resolve(),2000)
   })
   G.then(()=>{
     
       console.log('B',new Date())
   })
 })
 return
}
setInterval(main,6000)
