async (function* () { //function* 表示定义一个生成器函数
    try {
        constninjas = yield getJSON("ninjas.json"); //yield 使生成器函数执行暂停，yield关键字后面的表达式的值返回给生成器的调用者。它可以被认为是一个基于生成器的版本的return关键字。
        constmissions = yield getJSON(ninjas[0].missionsUrl);
        constmissionDescription = yield getJSON(missions[0].detailsUrl); //Studythemissiondetails　
    } catch (e) {
        //Ohno,weweren'tabletogetthemissiondetails　

    }
});