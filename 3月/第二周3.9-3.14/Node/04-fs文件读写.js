// const fs = require("fs");
// const path = require("path");

// // 当前文件所处目录
// const filename = path.resolve(__dirname,"./04-fs文件读写.js");
// // 如果使用相对路径，所有的都相对于命令行的工作路径，因此使用path拼接
// console.log(filename);
// fs.readFile(filename,"utf-8",(err,content)=>{
//     //输出其内容，并使用utf-8编码方式输出
//     // 否则会输出一堆数字
//     console.log(content);
// })

function createNN(n){
    return new Array(n).fill(null).map(
        ()=>{
        return new Array(n).fill(0)
        }
    );
}

let arr1 = createNN(3);
console.log(arr1)