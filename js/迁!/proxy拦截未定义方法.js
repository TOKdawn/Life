let XHRList = {
};
const systemXHR = new Proxy(XHRList,{
    get(target, prop) {
        if (prop in target) {
            return target[prop]
        }
        throw new Error(`${prop} is error XHR request`);
    }
})
XHRList.login = function(data) {
   console.log('login',data)
   return;
}

systemXHR.login(111)
systemXHR.logout(111)