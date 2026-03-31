// 柯里化是将一个接受多个参数的函数，转化成一系列接受一个参数的函数

// 接受的参数是要柯里化的函数，返回一个函数
// 如果接收的参数个数小于预期，则继续收集剩余参数
function curry(fn){
    // 原来的函数是fn，预期的参数个数是fn.length
    // 收集curried函数的参数，因为curried是最后要执行的函数，实际接受参数的也是它
    return function curried(...args){
        if(args.length<fn.length){
            console.log('参数不足');
            // 第一次传递参数不足的情况
            // 返回一个新函数继续接受参数
            return function(...nextargs){
                // 如果第二次参数仍然不足够的话，会回到上面的if判断
                return curried.apply(this,args.concat(nextargs));
            };
        }else{
            // 参数足够的处理
            console.log('参数足够');
            return fn.apply(this,args);
        }
    };
}

function add(a,b,c,d,e){
    return a+b+c+d+e;
}

// 将该函数柯里化
let curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3)(4,5));
console.log(curriedAdd(1)(2)(3)(4)(5));
// console.log(curriedAdd(1)(2)(3));
