const express = require("express");
const app = express();
const PORT = 3000;

const cors = require("cors");
app.use(cors());

// 前端要获取地变量
let num=0;

// 提供接口，供前端读取
app.get('/api/counter',(req,res)=>{
    // 访问一下，num就+1
    num++;
    // 把数据发过去
    res.json({
        counter:num,
        message:"这是后端的数据num",
    });
})

// 启动服务器
app.listen(PORT,()=>{
    console.log("服务器启动成功");
})
