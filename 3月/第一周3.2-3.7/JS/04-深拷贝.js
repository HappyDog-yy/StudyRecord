// 对于基本数据类型来说，是赋值，也可以说是深拷贝
// 所谓深拷贝，就是新旧之间无共享的内存空间，相互之间不影响
// 使用扩展运算符，可以实现第一层的拷贝

const old=[1,2,3,[88]];
const new_=[...old];

new_[3][0]=66;
new_[0]=9;
console.log(old);
console.log(new_);
// 可以发现仅仅第一层的修改不影响原对象

// 如何实现深拷贝，只需要考虑引用类型
// 常见的有对象、函数、数组
// 对于对象和数组的深拷贝，可以用json转换
let a=[1,2,3,{age:20,say:function(){console.log('hello')}}]
let b=JSON.parse(JSON.stringify(a));
console.log(a);
console.log(b);
// 但这种方法对函数毫无作用
// 因此考虑一种更加完美的深拷贝

function deepClone(oldObj){
    // 筛选出所有对象，特殊的，typeof(null)也是object
    if(typeof oldObj==='object' && oldObj !== null){
        // 判断是对象还是数组
        let res=Array.isArray(oldObj)?[]:{};
        for(let k in oldObj){
            // 仅对对象自身属性拷贝，继承而来的属性不予考虑
            if(oldObj.hasOwnProperty(k)){
                res[k]=deepClone(oldObj[k])
            }
        }
        return res;
    }
    else{
        return oldObj;
    }

}

let copyA=deepClone(a);
console.log(copyA);

