const express = require('express');
const app = express();
const PORT = 3000;

// 解析表单数据,参数为true代表可以处理复杂一点的数据
app.use(express.urlencoded({ extended: true }));

app.post('/api/submit-form', (req, res) => {
    // res请求对象，req相应对象
    // req.body是请求体中的数据
    const { username, age, gender } = req.body;
  
    // 打印到控制台
    console.log('收到表单数据');
    console.log('姓名:', username);
    console.log('年龄:', age);
    console.log('性别:', gender);
    
    // 验证必填字段
    if (!username) {
        return res.json({
        success: false,
        message: '姓名不能为空'
        });
    }
  
    // // 返回响应
    // res.json({
    //     success: true,
    //     message: '表单提交成功'
    // });

    // 重定向
    // res.redirect("/index.html?success=true");
});

// 启动服务器
// 服务器监听的端口号为port
app.listen(PORT, () => {
  console.log(`服务器已启动: http://localhost:${PORT}`);
});