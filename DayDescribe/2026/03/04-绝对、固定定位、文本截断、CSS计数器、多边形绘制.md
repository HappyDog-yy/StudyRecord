### 1.绝对定位与固定定位

- 什么时候使用这两种定位？
- 1.元素相对于页面中得位置不变，并且有点天马行空
- 2.不影响其他元素得位置
- 3.某个元素得水平和垂直都居中在某个区域

- 绝对定位：`position:absloute`：相对于父元素的定位，此时往往将父元素设置为realative
- 固定定位：`position:fixed`：相对于视口位置不变
- 相对定位：`position:relative`：相对于自身原来的位置，往往在微调时使用
- 默认是静态定位static
### 2.文本截断效果

#### 2.1单行文本截断

- 必须设置宽度
- white-space:nowrap;禁止换行
- overflow：hidden;超出部分隐藏
- text-overflow:ellipsis;显示省略号
#### 2.2多行文本截断

- 必须设置高度或设置行高line-height
- display:-webkit-box使用弹性盒子模型
- -webkit-box-orient:vertical竖直方向排列
- text-overflow:ellipsis;显示省略号
### 3.CSS计数器实现

- 可实现纯CSS的计数
- counter-reset创建计数器，类比变量初始化
- counter-increment:增加计数器，类比自增自减
- 使用counter()或者counters()可以显示值

```css
body{
    counter-reset: numH1;
    text-align: center;
}

/* 遇见h1就递增 */
h1{
    counter-increment: numH1;
    display: block;
    flex-direction: column;
}

/* 如何显示 */
h1::before{
    content: "第" counter(numH1) "章:";
    color: black;
    font-weight: bold;
}
```

### 4.多边形绘制

裁剪路径属性`clip-path:polygon()`
- 给出每个多边形顶点的坐标，不同顶点之间使用逗号隔开
- `clip-path:polygon(30% 0%,0% 70%,90% 100%)`
- 可以在矩形的基础上裁剪得到任意形状的多边形

菱形的绘制
- 使用上述方法，规则裁剪
- 或者直接旋转正方形