const express = require('express');
const app = express();
const path = require('path');

// 设置静态资源目录
app.use('/imgs',  express.static('imgs'));

app.use(express.json());  

// 跨域
app.use((req, res, next) => {
    // 定义一个express中间件函数
    res.header('Access-Control-Allow-Origin', '*');
    // 在请求头中设置，允许所有来源
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    // 允许的请求头
    // 允许的HTTP方法
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    // 预检请求OPTIONS，返回状态码200，告诉浏览器可以继续发送真正的请求
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
// 用于处理前端的GET请求，给前端提供当前地列表数据
// '/todos'是路由路径，表示当请求的URL路径是/todos时，执行这个函数，这个在从前端中对应过来地URL路径
app.get('/todos', (req, res) => {
    // 发给前端地数据是JSON格式的字符串，前端可以解析成JavaScript对象或数组
    res.json(todos);
    console.log("前端请求数据",req.method);
});

// 添加数据，根据前端界面中用户添加的todo
app.post('/todos', express.json(), (req, res) => {
    const newTodo = req.body.todo;
    todos.push(newTodo);
    // 给前端发送的消息
    res.json({ success: true, todo: newTodo });
});

// 删除数据
// 前端发请求地路径${API_URL}/${id}
// 路径后面地id是动态的，表示要删除哪个todo
// 这里的:id是一个占位符，表示这个位置可以是任意的值，
// express会把这个值解析出来，放在req.params对象中，供后续使用
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

// 设置imgs文件夹为静态资源目录(是指服务器直接返回给客户端地文件，不需要经过其他处理)，
// 当请求的URL路径以/imgs开头时，express会在imgs文件夹中查找对应的文件并返回给客户端


// 启动服务器
app.listen(3000, () => {
    console.log('服务器启动'); 
});