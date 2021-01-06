// ==UserScript==
// @name         碧蓝幻想自动舔舔--舔婊网端
// @namespace    https://gbf-raidfinder.la-foret.me/
// @version      0.1
// @description  简单汉化计算器gbf.xzz.jp
// @author       Dawn
// @match        https://gbf-raidfinder.la-foret.me/
// @grant        none
// @require      https://bowercdn.net/c/jquery-1.11.1-1.11.1/dist/jquery.min.js
// ==/UserScript==


(function() {
    var Data = {
        iD:'',
        time:''
    }
    'use strict';
    var timer=setInterval( function(){
        if($('.mdl-list.gbfrf-tweets').length>0){
            var list = $('.mdl-list.gbfrf-tweets')[0]
            var item = $(list).children(":first") 
            if(item){
                var id = item.data('raidid')
                // console.log('获取ID:',id)
                var time = item.find('.gbfrf-tweet__timestamp').text()
                if(id && Data.id != id){
                    // console.log('更新数据:',Data)
                    Data.id = id
                    Data.time = time.substring(15,18)
                    // localStorage.setItem("GBF_T_Data", Data)
                    window.parent.postMessage(JSON.stringify(Data),'*')
                }
            }
        }
    },1000)
    setTimeout(function(){
        window.clearInterval(timer)
    },50000)
})();