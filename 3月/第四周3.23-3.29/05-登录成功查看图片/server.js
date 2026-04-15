const express = require('express');
const app = express();
const path = require('path');

// 设置静态资源目录，静态资源是指不需要后端处理，直接返回给前端的文件
// 而其他请求需要处理，如get/post请求等
app.use('/imgs', express.static('imgs'));

app.use(express.json());  

// 跨域
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    // 允许所有的请求来源，便于跨域
    // 允许的请求头和方法
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    
    // 预检请求，直接返回200
    // 预检请求是浏览器在发送实际请求之前，先发送一个OPTIONS请求来检查服务器是否允许该请求
    // 这样设置之后浏览器会直接收到200状态码，继而发送实际请求，而不会因为跨域问题被阻止
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    
    next();
});

// 用户数据，这里使用数组简单模拟数据库
let users = [
    { username: 'admin', password: 'admin' },
    { username: 'user1', password: '123456' }
];

// 登录验证中间件
function requireLogin(req, res, next) {
    // 请求头里面的内容，前端发过来的格式是下面这样的
    // 'Authorization': `Bearer ${localStorage.getItem('token')}`
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        // 如果为空，代表用户还没有登录
        // 返回401状态码和状态字符串
        return res.status(401).json({ error: '需要登录' });
    }
    // split的作用是把字符串分割成数组，分割符是空格
    const token = authHeader.split(' ')[1]; // 获取Bearer token
    
    // 验证token
    if (token === 'dummy-token') {
        next();
    } else {
        res.status(401).json({ error: '登录无效' });
    }
}

// 原始数据
let todos = ['学习JavaScript', '学习Node.js', '学习HTTP'];

// 注册
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    
    console.log('注册请求:', username);
    
    if (!username || !password) {
        return res.status(400).json({ 
            success: false, 
            error: '用户名和密码不能为空' 
        });
    }
    
    // 检查用户是否已存在，在数据库中查找
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ 
            success: false, 
            error: '用户名已存在' 
        });
    }
    
    // 添加新用户
    users.push({ username, password });
    
    console.log('注册成功，当前用户:', users.map(u => u.username));
    
    res.json({ 
        success: true, 
        message: '注册成功',
        username 
    });
});

// 登录
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    console.log('登录请求:', username);
    
    if (!username || !password) {
        return res.status(400).json({ 
            success: false, 
            error: '用户名和密码不能为空' 
        });
    }
    
    // 查找用户
    const user = users.find(user => 
        user.username === username && user.password === password
    );
    
    if (user) {
        console.log('登录成功:', username);
        
        // 返回响应，下面是响应
        res.json({ 
            success: true, 
            message: '登录成功',
            username,
            token: 'dummy-token' 
        });
    } else {
        res.status(401).json({ 
            success: false, 
            error: '用户名或密码错误' 
        });
    }
});

// 获取所有数据
app.get('/todos', requireLogin, (req, res) => {
    console.log("前端请求数据", req.method);
    res.json(todos);
});

// 添加数据
app.post('/todos', requireLogin, (req, res) => {
    console.log("添加数据请求:", req.body);
    
    const newTodo = req.body.todo;
    
    if (!newTodo) {
        return res.status(400).json({ 
            success: false, 
            error: '待办事项不能为空' 
        });
    }
    
    todos.push(newTodo);
    
    res.json({ 
        success: true, 
        todo: newTodo,
        total: todos.length 
    });
});

// 删除数据
app.delete('/todos/:id', requireLogin, (req, res) => {
    console.log("删除数据请求:", req.params.id);
    
    const id = parseInt(req.params.id);
    
    if (isNaN(id) || id < 0 || id >= todos.length) {
        // 如果那边的参数不对，就返回失败
        return res.status(400).json({ 
            success: false, 
            error: '无效的ID' 
        });
    }
    
    // splice方法可以删除数组中的元素，参数是起始位置和删除的数量，删除一个元素，并且返回被删除的元素
    const deletedTodo = todos.splice(id, 1)[0];
    
    console.log("删除成功:", deletedTodo);
    
    res.json({ 
        success: true,
        deleted: deletedTodo 
    });
});

// 启动服务器
app.listen(3000, () => {
    console.log('服务器启动成功');
});