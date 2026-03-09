// node中的全局对象是global
// 其属性可以随便使用，常见的属性由以下几种

// setTimeout
// 一段时间以后执行
// setInterval
// 搁固定的时间间隔就执行一次
// 不同的是，浏览器环境中返回计时器的id，是一个数字

// 而node环境中返回的是一个对象

// console.log(global);
// console.log(__dirname);
console.log(1);


// 类型化数组buffer
const buffer=Buffer.from("abc","utf-8");
console.log(buffer);

// process属性
console.log("当前命令行路径：",process.cwd())
// 仅仅取决于你运行node命令时，命令行所在路径，与运行的文件所处路径无关

// process.exit();
// 强制结束node进程，如果使用settimeout函数，会导致还没执行，就结束进程了

// 获取命令行参数
console.log(process.argv);