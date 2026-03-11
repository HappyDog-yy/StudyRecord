// 可极大减少出错概率,是一组命名常量，不能改
enum Direction{
    up,
    down,
    left,
    right,
}

console.log(Direction);
console.log(1);


// 规定函数的传入参数只能是枚举类型的
let walk:(a:Direction)=>void;
// 已经声明过的函数怎么定义
// 下面有两种方式

// 1111111111111111111箭头函数
// walk=(a):void=>{
//     if(a===Direction.up){
//         console.log("向上走");
//     }else if(a===Direction.down){
//         console.log("向下走");
//     }else if(a===Direction.left){
//         console.log("向左走");
//     }else if(a===Direction.right){
//         console.log("向右走");
//     }
// }

// 或者使用另一种方式定义
walk=function(a):void{
    if(a===Direction.up){
        console.log("向上走");
    }else if(a===Direction.down){
        console.log("向下走");
    }else if(a===Direction.left){
        console.log("向左走");
    }else if(a===Direction.right){
        console.log("向右走");
    }
}

