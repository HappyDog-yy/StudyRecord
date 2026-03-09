// 入口文件，因为node一次只能执行一个文件

// 导入模块
let obj1 = require("./util.js");
let obj2 = require("./pork.js");

// 必须使用相对路径

let arr = [1,2,3,4,5];
console.log(obj1.sortRandom(arr));


// // 使用构造函数创建对象时要使用new关键字
// let p=new obj2.Pork(1,1);
// console.log(p.toString());

// 创建一副扑克牌并
let arrPork=[];
for(let i=1;i<=4;i++){
    for(let j=1;j<=13;j++){
        arrPork.push(new obj2.Pork(i,j));
    }
}

arrPork.push(new obj2.Pork(null,14));
arrPork.push(new obj2.Pork(null,15));

// 打印输出
for(let i=0;i<arrPork.length;i++){
    console.log(arrPork[i].toString());
}
// console.log(arrPork[i].toString());

// 洗牌
let res = obj1.sortRandom(arrPork);
console.log(res);

