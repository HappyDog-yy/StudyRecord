var f1 = function () {
    return 100;
    // 上面限制了返回值类型为void
    // 但是此处可以返回一个数字
    // 但是还是不能依赖该返回值做任何逻辑判断
};
console.log(f1());
// if(f1())
// 无法测试 "void" 类型的表达式的真实性
