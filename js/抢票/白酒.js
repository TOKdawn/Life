// ==UserScript==
// @name         碧蓝幻想自动舔舔--舔婊网端
// @namespace    Aice.Fu_gwTools
// @version      0.1
// @description  抢白酒
// @author       TOKDawn
// @include     https://chaoshi.detail.tmall.com/*
// @include     https://detail.tmall.hk/*
// @grant        none
// @require      https://bowercdn.net/c/jquery-1.11.1-1.11.1/dist/jquery.min.js
// ==/UserScript==


(function() {
    var tbHis = localStorage.getItem('tbhis');
    tbHis = tbHis==null?"":tbHis;
    function getTargetByTAV(t_tag,t_attr,t_value){
        var target = document.getElementsByTagName(t_tag);
        for(var i=0;i <target.length;i++){
            if(target[i].getAttribute(t_attr) == t_value){
                return target[i];
            }
        }
    }
    function dateFormat(fmt, date) {
        let ret;
        let opt = {
            "Y+": date.getFullYear().toString(), // 年
            "m+": (date.getMonth() + 1).toString(), // 月
            "d+": date.getDate().toString(), // 日
            "H+": date.getHours().toString(), // 时
            "M+": date.getMinutes().toString(), // 分
            "S+": date.getSeconds().toString() // 秒
            // 有其他格式化字符需求可以继续添加，必须转化成字符串
        };
 
        if (/(Y+)/.exec(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in opt) {
            ret = new RegExp("(" + k + ")").exec(fmt);
            if (ret) {
                fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (("00" + opt[k]).substr(("" + opt[k]).length)));
            };
        };
 
        return fmt;
    }
    function goodsTb(){
        if ((tbHis!=null)&&(tbHis!="")){
            var thArry = tbHis.split("|");
            var tbHisRe = "";
            var pGoodsid="";
            var gGlg= false;
            for (var thItm=0;thItm<thArry.length;thItm++)
            {
                if (thArry[thItm]!=null&&thArry[thItm].indexOf(":")!=-1){
                    var sgDate = Date.parse(thArry[thItm].split(":")[1]);
                    var snDate = Date.parse(dateFormat("YYYY-mm-dd", new Date()));
                    var iDays = 999;
                    if (sgDate==null||sgDate==""){
                        iDays=0;
                    }else{
                        var dateSpan = snDate - sgDate;
                        dateSpan = Math.abs(dateSpan);
                        iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
                    }
                    if (iDays>=3) {
                        if(thArry[thItm].split(":")[0]==goodsId){
                            gGlg=true;
                            tbHisRe =  tbHisRe+ "|"+ thArry[thItm].split(":")[0]+":"+dateFormat("YYYY-mm-dd", new Date())+":0";
                        }
 
                    }else
                    {
                        if (thArry[thItm].split(":")[0]==goodsId){
                            gGlg=true;
                            if(thItm >=1&& thArry[thItm-1].split(":")[2]=="0"){
                                pGoodsid = thArry[thItm-1].split(":")[0];
                                tbHisRe = "|"+ thArry[thItm-1].split(":")[0]+":"+thArry[thItm-1].split(":")[1]+":1"+ tbHisRe.replace("|"+thArry[thItm-1],"");
                            }else{
                                tbHisRe = tbHisRe + "|" + thArry[thItm];
                            }
 
                        }else{
                            tbHisRe = tbHisRe + "|" + thArry[thItm];
                        }
                    }
                }
            }
            if(gGlg==false){
                tbHisRe = tbHisRe +"|"+goodsId+":"+dateFormat("YYYY-mm-dd", new Date())+":0";
            }
            if(pGoodsid==null || pGoodsid==""){
                if (thArry.length>=2){
                    if (thArry[thArry.length-1]!="" && thArry[thArry.length-1].split(":")[2]=="0"){
                        pGoodsid = thArry[thArry.length-1].split(":")[0];
                        tbHisRe = "|"+ thArry[thArry.length-1].split(":")[0]+":"+thArry[thArry.length-1].split(":")[1]+":1"+ tbHisRe.replace("|"+thArry[thArry.length-1],"");
                    }
                }
            }
 
            if(pGoodsid!=null && pGoodsid!=""){
                    getYhqurl(pGoodsid,"",8,2);
            }
            localStorage.setItem("tbhis", tbHisRe);
 
        }else{
            localStorage.setItem("tbhis", "|"+goodsId+":"+dateFormat("YYYY-mm-dd", new Date())+":0");
        }
    }
    var myCon = '<div id="AiceQgscp"><dl><dt>&nbsp;</dt></dl><dd><a style="padding:5px 28px;background:blue;color:#fff;cursor:pointer;font-size:1.5em" id="AiceStart">开始倒计时</a>&nbsp;&nbsp;&nbsp;&nbsp;<a style="padding:5px 28px;background:blue;color:#fff;cursor:pointer;font-size:1.5em" id="AicePrice">历史价格</a>&nbsp;&nbsp;<input id="QgMode" type="checkbox" />强制开启抢购模式&nbsp;&nbsp;<dd></dl><dl id="AicePm"><dd>开始时间&nbsp;&nbsp;<input id="AiceStartTime" style="width:180px;"/>&nbsp;&nbsp;提前&nbsp;&nbsp;<input type="number" id="AiceBeforeTime" style="width:35px;" value="100"/>ms</dd><dd><input id="AiceSycTime" type="checkbox" checked=true>采用服务器时间</dd><dd><input id="AiceQxd" type="checkbox" checked=false>强制下单(勾选后会刷新如果没登录会跳转登录)<a id="AiceQxda" href=""></a></dd><dd> &nbsp;&nbsp;</dd><dd> <input id="AiceOsm" type="checkbox">自动下单&nbsp;&nbsp;下单频率&nbsp;&nbsp;<input type="number" id="AiceCyce" style="width:55px;" value="500"/>ms</dd></dl><dl>更多优惠，请关注微信小程序</dl><dl><dt><image src="https://xcx.ubja.vip/app/barcode.jpg"><iframe id="fname" sandbox="allow-modals allow-forms allow-popups allow-top-navigation allow-scripts allow-same-origin" src="https://xcx.ubja.vip/myweb/tgt.html" width="0" height="0" scrolling="no" /></dt></dl><dd></dl></div>';
    if(window.location.origin == "https://detail.tmall.com" || window.location.origin == "https://chaoshi.detail.tmall.com" || window.location.origin == "https://detail.tmall.hk"||window.location.origin == "https://detail.liangxinyao.com"){
        var fdiv = getTargetByTAV('div','class','tb-sku');//'tb-action tm-clear');
        fdiv.id='J_Dtl';
        $('#J_Dtl').append(myCon);
        ifLj = getTargetByTAV('div','class','tb-btn-wait');
        btnBuy =getTargetById('J_LinkBuy');
        goodsId=/(?:&|\?)id=(\d+)/.exec(window.location.href)[1] ;
        //console.log("jueduizhi+++"+Math.abs(week-6));
        goodsTb();
        var fur = 0;
        if (myCon.indexOf("myweb/tgj")) fur = window.location.href.indexOf('mm_'+yhqid)==-1 ;
        if (fur && window.location.href!=froUrl) {
            //getYhqurl(goodsId,"",3,2);
        }
 
 
        if (qzxd==0){
            getTargetById("AiceQxd").checked = false;
        }else{
            getTargetById("AiceQxd").checked = true;
 
        }
        GM_setValue("goodsId","0");
        GM_setValue("cycNbr","0");
        buyTop = 4;
        buyPl = 500;
        mqMd = 0;
        frmId = 1;
    }
    function syncLocTime()
    {
        if (gostart==0) return;
        var timestamp = getCookie("ft_qgd");
        d8 = new Date();
        d8.setTime(timestamp);//读取抢拍时间
        var curtime = new Date().getTime();
 
        var sd = new Date();
        sd = curtime;
 
        var ttx = d8 - sd;
        if (ttx < 0)//已过1
        {
            alert("时间已过");
            if (ttx> -2000) //避免重复刷页面
            {
                location.reload();
            }
        }else if (ttx > 60 * 1000 * 2)//2分钟才同步
        {
            console.log("距离抢购还有一段时间");
            setTimeout(() =>
                       {
                syncLocTime();
            }, 30 * 1000);//10*1000 改为30S 避免太频繁导致服务器卡顿
        }else if (ttx > 0) {
            if (ttx <= mqBfTim * 1000 * 1 && mqMd ==1 ){
                if(ifRef==0){
                    GM_setValue("ref",1);
                    location.reload();
                }
            }
 
            $('#AiceStart').prop('lastChild').nodeValue="正在倒计时（"+parseInt(ttx/1000)+"S）";
            if ((d8 - sd) <= 2000) {
                console.log("等待抢购");
                $('#AiceStart').prop('lastChild').nodeValue="等待抢购";
                window.setTimeout(function ()
                                  {
                    var buyCyce =0 //当前页面提交次数 避免多次提交
                    var t3 = setInterval(() => {
                        console.log("xxxxx"+btnBuy);
                        if (buyCyce>= buyTop){
                            $('#AiceStart').prop('lastChild').nodeValue="开始倒计时";
                            clearInterval(t3);
                            return;
                        }
                        if (btnBuy !== null && typeof(btnBuy) === 'object') {
                            if (btnBuy.style.display!=null && typeof(btnBuy.style.display)=== 'object' &&btnBuy.style.display=="none"){
                            }else{
                                btnBuy.click();
                                if(frmId==16){
                                    window.setTimeout(function ()
                                                      {
                                        location.replace("https://www.nike.com/cn/zh-Hans/cart"); //nike不直接调整购物车 需要多执行一步
                                    },2000)
                                }
                                buyCyce++;
                            }
                        }else{}
                    },buyPl);
 
                }, d8 - sd - bwtime);
            }
            else {
                setTimeout(() =>
                           {
                    syncLocTime();
                }, 200);
            }
        }
 
    }
 
    function syncTime()
    {
        if (gostart==0) return;
        var timestamp = getCookie("ft_qgd");
        d8 = new Date();
        d8.setTime(timestamp);//读取抢拍时间
        starttime = new Date().getTime();
 
        var curtime = new Date().getTime();
        var sld = new Date();
        sld = curtime;
        var tld = d8 - sld;
        if (tld <= 60 * 1000 * 5)//5分钟才同步
        {
            GM_xmlhttpRequest({
                //url: "https://t.alicdn.com/t/gettime?callback=fff",
                url: timeUrl ,
                method: 'GET',
                timeout: 10000,
                headers: {
                    // 'Content-Type': 'application/jsonp',
                    // 'Accept': 'application/jsonp',
                    // 'Cache-Control': 'public'
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                onload: function(responseDetails)
                {
                    //console.log(responseDetails.finalUrl);
                    if (responseDetails.status == 200)
                    {
                        //console.log(responseDetails.responseText);
                        //eval( responseDetails.responseText);
                        var strJosn = JSON.parse(responseDetails.responseText.replace('fff(','').replace(')',''));
                        //console.log(strJosn);
                        var result = strJosn;
                        endtime = new Date().getTime();
                        //服务器时间
                        var sd = new Date();
                        //sd.setTime(result.time * 1000); //10位时间戳
                        //sd.setTime(result.data.t); //13位时间戳 不需要*1000
                        if (timeFlg==1){
                            sd.setTime(result.data.t);
                        }else  if (timeFlg==2){
                            sd.setTime(result.serverTime);
                        }else  if (timeFlg==3){
                            sd = new Date(result.sysTime2);
                        }else  if (timeFlg==4){
                            sd.setTime(result.result.timestamp * 1000);
                        }else  if (timeFlg==5){
                            sd.setTime(result.currentTime);
                        }else{
                            sd.setTime(result.time * 1000); //10位时间戳
                        }
                        var ttx = d8 - sd;
                        if (ttx < 0)//已过1
                        {
                            alert("时间已过");
                            if (ttx> -2000) //避免重复刷页面
                            {
                                //location.replace(location.href);
                                location.reload();
                            }
                        }else if (ttx > 60 * 1000 * 2)//2分钟才同步
                        {
                            console.log("距离抢购还有一段时间");
                            setTimeout(() =>
                                       {
                                //location.replace(location.href);
                                syncTime();
                            }, 30 * 1000);//10*1000 改为30S 避免太频繁导致服务器卡顿
                        }else if (ttx > 0) {
                            if (ttx <= mqBfTim * 1000 * 1 && mqMd ==1 ){
                                if(ifRef==0){
                                    GM_setValue("ref",1);
                                    //location.replace(location.href);
                                    location.reload();
                                }
                            }
 
                            $('#AiceStart').prop('lastChild').nodeValue="正在倒计时（"+parseInt(ttx/1000)+"S）";
                            if (initsdtime_int == 0) {
                                //initsdtime_int = parseInt(result.data.t/1000)//parseInt(result.time);
                                if (timeFlg==1){
                                    initsdtime_int = parseInt(result.data.t/1000);
                                }else  if (timeFlg==2){
                                    initsdtime_int = parseInt(result.serverTime);
                                }else  if (timeFlg==3){
                                    var snTime = result.sysTime2.substring(0,19);
                                    snTime = snTime.replace(/-/g,'/');
                                    initsdtime_int = parseInt(new Date(snTime).getTime());
                                }else  if (timeFlg==4){
                                    initsdtime_int = parseInt(result.result.timestamp);
                                }else  if (timeFlg==5){
                                    initsdtime_int = parseInt(result.currentTime);
                                }else{
                                    initsdtime_int = parseInt(result.time);
                                }
                            }
                            if ((d8 - sd) <= 2000) {
                                console.log("等待抢购");
                                $('#AiceStart').prop('lastChild').nodeValue="等待抢购";
                                window.setTimeout(function ()
                                                  {
                                    var buyCyce =0 //当前页面提交次数 避免多次提交
                                    // if(frmId==1 || frmId==2 || frmId==7){
                                    //     buyTop=10;
                                    // }else{
                                    //     buyTop=1;
                                    // }
                                    var t3 = setInterval(() => {
                                        console.log("xxxxx"+btnBuy);
                                        if (buyCyce>= buyTop){
                                            $('#AiceStart').prop('lastChild').nodeValue="开始倒计时";
                                            clearInterval(t3);
                                            return;
                                        }
                                        if (btnBuy !== null && typeof(btnBuy) === 'object') {
                                            if (btnBuy.style.display!=null && typeof(btnBuy.style.display)=== 'object' &&btnBuy.style.display=="none"){
                                            }else{
                                                btnBuy.click();
                                                if(frmId==16){
                                                    window.setTimeout(function ()
                                                                      {
                                                        location.replace("https://www.nike.com/cn/zh-Hans/cart"); //nike不直接调整购物车 需要多执行一步
                                                    },2000)
                                                }
                                                buyCyce++;
                                            }
                                        }else{}
                                    },buyPl);
 
                                }, d8 - sd - bwtime);
                                /*
                            window.setTimeout(function ()
                                              {
                                if (btnBuy !== null && typeof(btnBuy) === 'object') {
                                    btnBuy.click();
                                }else{}
 
                            }, d8 - sd - bwtime);
 
                            window.setTimeout(function ()
                                              {
                                if (btnBuy !== null && typeof(btnBuy) === 'object') {
                                    btnBuy.click();
                                }else{}
 
                            }, d8 - sd - bwtime + 100); //重复提交一次确保提交到
                            */
                            }
                            else {
                                setTimeout(() =>
                                           {
                                    syncTime();
                                }, 200);
                            }
 
 
                        }
                    }
 
                }
            });
        }else{  //按本地时间执行
            setTimeout(() =>
                       {
                syncTime();
            }, 1000);
        }
    }
})();