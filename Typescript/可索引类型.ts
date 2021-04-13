// interface StringArray {
//     [index: number]: string;
//   }
  
//   let myArray: StringArray;
//   myArray = ["Bob", "Fred"];
  
//   let myStr: string = myArray[0];
  

class Animal {
    name: string;
}
class Dog extends Animal {
    breed: string;
}

// 错误：使用'string'索引，有时会得到Animal!
interface NotOkay {
    [x: string]: Animal;
    [x: number]: Dog;
}