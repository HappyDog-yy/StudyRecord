// 柯里化，可将一个多函数参数转化成一系列只接受一个参数的函数
// 需要注意，后者的参数个数之和与转化前的函数参数个数一样
function KeLiHua(a){
    return function(b){
        return function(c){
            return a+b+c;
        }
    }
}
// 每传入一个参数，返回的都是一个函数

let mid=KeLiHua(1);
// 此时函数内部记住参数a=1
// mid函数还可以继续接受参数
console.log(mid(2)(3));