// function red(){
//     return new Promise((reslove)=>{
//         console.log("当前是红灯，2s后变成绿灯");
//         // 因为有等待时间，所以使用settimeout
//         setTimeout(()=>{
//         const greenPromise=green();
//         reslove(greenPromise)
//     },3000);
//     });
// }

// function green(){
//     return new Promise((reslove)=>{
//         console.log("当前是绿灯，5s后变成黄灯");
//         setTimeout(()=>{
//             const yellowPromise=yellow();
//             reslove(yellowPromise);
//         },5000)
//     });
// }

// function yellow(){
//     return new Promise((reslove)=>{
//         console.log("当前是黄灯，3s后变成红灯");
//         setTimeout(()=>{
//             const redPromise=red();
//             reslove(redPromise);
//         },3000)
//     });
// }

// red();

// 将以上三个函数抽象封装
function transport(color,time,next){
    return new Promise((resolve)=>{
        console.log(`当前是${color}灯，${time}秒之后变成${next}灯`);
        setTimeout(()=>{
            resolve();
        },time*1000)
    })
}

async function run(){
    // 长期递归调用会导致问题
    // await transport("红",2,'绿');
    // await transport("绿",5,'黄');
    // await transport("黄",3,'红');
    // // 如果只有以上3条只执行一轮
    // await run();

    // 解决：使用循环代替递归
    while(true){
        try{
            await transport("红",2,'绿');
            await transport("绿",5,'黄');
            await transport("黄",3,'红');
        }
        catch{
            console.log("信号灯出错");
            break;
        }
    }
    
}

run();