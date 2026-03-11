// 可以为类型起一个别名，名字你自己定义

type Status = number|string;
// 常常用于联合类型，可以是num，也可以是str

function printStatus(a:Status):void{
    console.log(a);
}

printStatus(123);
printStatus("hello");
// 两种类型都不会出错

// 也可以为两个字面量起一个别名，不会报错
type Gender = "女"|"男";
function printGender(a:Gender):void{
    console.log(a);
}

printGender("女");

// 交叉类型,联合类型是或者，交叉类型就是并
type Area={
    width:number,
    height:number;
}
type Address={
    cell:number,
    room:number,
}

type House = Area&Address;
// house类型就是两个类型的所有属性都要有，一个也不能少
// 少了任何一个就不能编译
const myhome:House={
    width:1,
    height:1,
    cell:1,
    room:1,
}