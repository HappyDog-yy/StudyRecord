const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 解决跨域
app.use(cors());
// 块上传目录
const UPLOAD_DIR = 'uploads';
const CHUNK_DIR = path.join(UPLOAD_DIR, 'chunks');

// 目录不存在则创建，参数代表可以创建多级目录
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
if (!fs.existsSync(CHUNK_DIR)) fs.mkdirSync(CHUNK_DIR, { recursive: true });

// multer处理分片，dest是上传文件的目录
const upload = multer({ dest: CHUNK_DIR });

app.post('/upload-chunk', upload.single('chunk'), (req, res) => {
    // 解构，跟前端js的结构对饮
    const { fileId, chunkIndex, totalChunks, filename } = req.body;
    
    console.log('收到分片');
    
    // 为每个文件创建单独的目录
    const chunkDir = path.join(CHUNK_DIR, fileId);
    if (!fs.existsSync(chunkDir)) fs.mkdirSync(chunkDir, { recursive: true });
    
    // 移动分片文件
    const oldPath = req.file.path;
    const newPath = path.join(chunkDir, `chunk-${chunkIndex}`);
    fs.renameSync(oldPath, newPath);
    
    res.json({ success: true, message: '分片上传成功' });
});

// 合并分片,路径看index.html
app.post('/merge', (req, res) => {
    const { fileId, filename, totalChunks } = req.body;
    
    console.log('开始合并文件')
    const chunkDir = path.join(CHUNK_DIR, fileId);
    const finalPath = path.join(UPLOAD_DIR, filename);
    
    // 创建最终文件
    const writeStream = fs.createWriteStream(finalPath);
    
    // 按顺序合并所有分片
    for (let i = 0; i < totalChunks; i++) {
        const chunkPath = path.join(chunkDir, `chunk-${i}`);
        
        // 读取分片并写入最终文件
        const chunkData = fs.readFileSync(chunkPath);
        writeStream.write(chunkData);
    }
    
    writeStream.end();
    
    // 删除分片临时文件
    fs.rmSync(chunkDir, { recursive: true, force: true });
    
    console.log(`文件合并完成: ${finalPath}`);
    
    res.json({
        success: true,
        message: '文件合并成功',
        filename: filename,
        path: `/uploads/${filename}`
    });
});

// 让浏览器能访问上传的文件
app.use('/uploads', express.static('uploads'));

// 启动服务器
app.listen(3000, () => {
    console.log('服务器启动: http://localhost:3000');
});