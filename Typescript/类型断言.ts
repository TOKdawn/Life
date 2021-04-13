interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}
let squ:SquareConfig;
squ.color = 'red'
squ.name = 'squ'
squ.age = 12
console.log(squ)