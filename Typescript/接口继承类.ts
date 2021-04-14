class Control { //带有私有属性的类型
    private state: any;
}

interface SelectableControl extends Control { //继承类的接口
    select(): void;
}

class Button extends Control implements SelectableControl {
    select() { }
}

class TextBox extends Control {

}

// Error: Property 'state' is missing in type 'Image'.
class Image implements SelectableControl {
    select() { }
}

class Location {

}

class Animal {
    move(distanceInMeters: number = 0) {
        console.log(`Animal moved ${distanceInMeters}m.`);
    }
}

class Dog extends Animal {
    bark() {
        console.log('Woof! Woof!');
    }
}

const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();