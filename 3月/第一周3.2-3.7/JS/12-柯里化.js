// 所有函数都可以柯里化，柯里化是一种技术
function curry(fn){
    // args收集所有传入的参数，使用数组存储起来
    return function curried(...args){
        // 如果传入的参数足够，直接执行函数fn
        // 函数的属性length代表函数参数的个数，
        // 有初始值的默认参数不计数
        if (args.length>=fn.length){
            // 为什么不是直接调用函数，而要通过apply
            // 因为如果直接调用，相当于为fn传递了一个数组
            // 而fn接受的参数类型并不是数组
            // apply可以将数组形式的参数直接拆解成单个参数的方式传入
            return fn.apply(this,args);
        }else{
            // 如果传入的参数不够，返回新函数接受更多参数
            return function(...nextargs){
                return curried.apply(this,args.concat(nextargs));
            }
        }
    }
}

function add(a,b,c){
    return a+b+c;
}

// 让add函数柯里化
const curriedAdd=curry(add);
console.log(curriedAdd(2,3)(1));
console.log(curriedAdd(2)(3)(1));
// 函数柯里化之后，调用方式变得更加多样
// 而使用闭包加法，函数的调用方式则比较确定
