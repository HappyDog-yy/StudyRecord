const express = require('express');
const app = express();

// 跨域
app.use((req, res, next) => {
    // 定义一个express中间件函数
    res.header('Access-Control-Allow-Origin', '*');
    // 允许所有来源
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    // 允许的请求头
    // 允许的HTTP方法
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    // 预检请求OPTIONS
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    // 告诉express这个中间件处理完了，继续处理后面的路由和中间件
    // 如果没有，就卡在这里了
    next();
});

// 原始数据
let todos = ['学习JavaScript', '学习Node.js', '学习HTTP'];

// 获取所有数据
app.get('/todos', (req, res) => {
    res.json(todos);
});

// 添加数据，根据前端界面中用户添加的todo
app.post('/todos', express.json(), (req, res) => {
    const newTodo = req.body.todo;
    todos.push(newTodo);
    // 给前端发送的消息
    res.json({ success: true, todo: newTodo });
});

// 删除数据
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    // id是字符串
    // 先转成数字，才能删除
    // id = parseInt(id);
    todos.splice(id, 1);
    // 测试
    console.log("前端请求删除数据");
    res.json({ success: true });
});

// 设置imgs文件夹为静态资源目录
app.use('/imgs', express.static('imgs'));

// 启动服务器
app.listen(5500, () => {
    console.log('服务器启动'); 
});