
function KeLiHua(a){
    return function(b){
        return function(c){
            return a+b+c;
        }
    }
}

let mid=KeLiHua(1);
console.log(mid(2)(3));
// 闭包加法

// 闭包，可以简单理解为，外层函数执行完，变量内层还能活
// 函数调用的方式比较单一，只能一个参数一个参数的传递