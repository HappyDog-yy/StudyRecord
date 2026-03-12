const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.json());
// 解析请求体req为对象格式

// 模拟村用户信息的数据库，或者服务器
// 用于后续比对用户是否已经注册过，或者是否登录失败
const users = [
    {
        id:1,
        username:"jojo",
        pwd:'$2a$10$N9qo8uLOickgx2ZMRZoMy.Mrq1LxHJ1FpZ.1J6q9L7z2wJQ4oOqW6',
        // 加密过后的123456
    }
];

const JWT_SECRET = "secret_key";

// 注册
// 首先账号密码不能为空
// 接着判断用户是否已存在，存在则响应
// 最后加密密码（异步await），存到数据库
app.post('/api/register',async(req,res)=>{
    // 解构出账号和密码
    const {username,pwd} = req.body;
    console.log(username,pwd);

    // 验证是否为空
    if(!username&&!pwd){
        return res.json({
            success:false,
            msg:"用户名和密码不能为空"
        });
    }

    // 检查用户是否已经存在,存在返回true
    const existU = users.find(u=>u.username === username);
    // 存在时，返回信息
    if(existU){
        return res.json({
            success:false,
            msg:"用户已存在"
        });
    }

    // 加密密码并存储用户数据到数据库
    const Spwd = await bcrypt.hash(pwd,10);
    // 第二个参数越大，越安全，同时也越慢

    const newU={
        id:users.length+1,
        username:username,
        pwd:Spwd
    }
    users.push(newU);

    // 返回响应
    res.json({
        success:true,
        msg:'注册成功',
        user:{id:newU.id,username:newU.username}
    });
})

// 登录
// 拿到req.body之后先查找用户是否存在
// 存在则验证密码，生成token令牌
app.post('/api/login',async(req,res)=>{
    // 结构请求体
    const {username,pwd}=req.body;
    console.log(username,pwd);

    // 查找用户是否存在,返回布尔值
    const user = users.find(u=>u.username === username);
    if(!user){
        return res.json({
            success:false,
            msg:"用户不存在"
        });
    }
    // 验证密码，生成token
    const isValid = await bcrypt.compare(pwd,user.pwd);
    if(!isValid){
        return res.json({success:false,msg:"密码错误"});
    }

    const token = jwt.sign(
        {id:user.id,username:user.username},
        JWT_SECRET,//密钥
        { //有效时间
            expiresIn:'24h'
        }
    );
    // 返回响应
    res.json({
        success:true,
        msg:'登录成功',
        token,
        user:{
            id:user.id,
            username:user.username,
        }

    });
})

// 启动服务器，监听端口3000
app.listen(3000,()=>{
    console.log('服务器启动成功');
})