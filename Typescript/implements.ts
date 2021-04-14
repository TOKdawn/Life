interface ClockConstructor { //构造函数接口
    new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface { //返回接口
    tick();
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface { //构造类函数
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {//实现接口的类
    constructor(h: number, m: number) { }
    tick() {
        console.log("beep beep");
    }
}
class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("tick tock");
    }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);