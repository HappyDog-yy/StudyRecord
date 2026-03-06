// 用于获取数组的最后一个元素
// 函数实现
const arr1=[1,2,3,[88,9]]

// // 普通函数实现
// function last(nums){
//     const size=nums.length;
//     return nums[size-1];
// }

// // 调用该函数
// console.log(last(arr1));

// 将该方法添加到圆形链上，让所有数组对象都可以使用
// 称为数组对象的一个属性
// 在圆形方法中，访问的是this，而不是形参
Array.prototype.last=function(){
    // 数组为空的情况也要考虑
    const size=this.length;
    if(size===0){
        return;
    }else{
        return this[size-1];
    }
}

// 作为属性调用时this指向
// 作为对象方法调用的，this指向调用该方法的对象
console.log(arr1.last());
// JS的内部处理时这样的
// 获取arr1,获取last函数
// 用arr1作为this调用last