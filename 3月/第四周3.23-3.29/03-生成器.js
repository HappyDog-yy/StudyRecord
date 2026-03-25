// 生成器函数，为了解决传统函数只能一次全部执行完函数体，而不能暂停的情况

function* simple(){
    console.log('开始执行');
    yield '第一次执行';
    
    console.log('执行2');
    yield '第2次执行';
    
    console.log('结束执行');
    yield '第三次执行';
}

const eg = simple();
// 第一次调用
eg.next();
// 第二次调用
console.log(eg.next())
// 第3次调用
console.log(eg.next())
console.log(eg.next())
// 注意第四次调用状态为true

// 输出

// 开始执行
// 执行2
// { value: '第2次执行', done: false }
// 结束执行
// { value: '第三次执行', done: false }
// { value: undefined, done: true }