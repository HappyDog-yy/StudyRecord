const express = require('express');
const multer = require('multer');
// 多文件上传
const cors = require('cors');
const fs = require('fs');

const app = express();

// 跨域
app.use(cors()); 

const uploadDir = 'uploads';
// 上传文件夹如果不存在就创建
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
// 后面的参数是什么作用？加上可以创建多级目录，递归创建
// 如果不加，会导致创建多级目录时失效
}

const upload = multer({
    dest: uploadDir,  
    // 上传目录
    limits: {
        fileSize: 1024 * 1024 * 5  // 大小<5MB
    },
    fileFilter: (req, file, cb) => {
        // 允许所有文件类型
        cb(null, true);
    }
});

// 让浏览器能访问上传的文件
app.use('/uploads', express.static('uploads'));

// 5. 文件上传接口
app.post('/api/upload', upload.single('file'), (req, res) => {
    // 中间件，上传单个文件
    console.log('收到文件:', req.file);
    
    if (!req.file) {
        return res.status(400).json({
        success: false,
        message: '没有收到文件'
        });
    }
    
    res.json({
        success: true,
        message: '上传成功',
        filename: req.file.filename,
        size: req.file.size,
        path: `/uploads/${req.file.filename}`,
    });
});

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`服务器启动成功: http://localhost:${PORT}`);
});