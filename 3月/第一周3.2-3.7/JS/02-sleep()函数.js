// 由于JS是单线程的语言，sleep会导致整个页面同步阻塞一段时间

// // 不推荐的方法，阻塞整个主线程
// function delay(wait){
//     const start=Date.now();
//     while(Date.now()-start<wait){
//         console.log("空循环");
//     }
// }
// // 在1s的时间内一直输出空循环，完成后输出hello
// // 即阻塞了整个主线程
// delay(1000);
// console.log("hello");

// 使用promise实现
function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve("成功数据");
        },ms)
    })
}
// 使用
async function test() {
    console.log("开始");
    // 暂停2s时间
    const data=await sleep(2000);
    // await关键字用于等待某个任务完成，得到一个数据
    console.log(data);
    console.log("2s之后输出这句话");
    
}

console.log("其他任务不会阻塞");

test();