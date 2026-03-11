// 可极大减少出错概率,是一组命名常量，不能改
var Direction;
(function (Direction) {
    Direction[Direction["up"] = 0] = "up";
    Direction[Direction["down"] = 1] = "down";
    Direction[Direction["left"] = 2] = "left";
    Direction[Direction["right"] = 3] = "right";
})(Direction || (Direction = {}));
console.log(Direction);
console.log(1);
// 规定函数的传入参数只能是枚举类型的
var walk;
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
walk = function (a) {
    if (a === Direction.up) {
        console.log("向上走");
    }
    else if (a === Direction.down) {
        console.log("向下走");
    }
    else if (a === Direction.left) {
        console.log("向左走");
    }
    else if (a === Direction.right) {
        console.log("向右走");
    }
};
