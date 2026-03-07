// 数组常用API

// 去重
let nums=[1,1,1,4,4,6,6,8,99];
let arr1=[9856,79];
let arr2=[8,69];

let res=[... new Set(nums)];
console.log(res);

// 数组合并
// 1.使用concat函数，不改变原数组
let concat=nums.concat(arr1,arr2);
console.log(concat);
console.log(nums);

// 2.使用扩展运算符
let open=[...arr1,...arr2];
console.log(open);
