
- 如果一个标签要使用多个class样式，class="1 2 3",中间使用空格分隔开
- border属性，边框宽度、样式、颜色，如`5px solid black`
- 常用样式为solid，代表实线边框
### JS常见错误类型

- syntax Error:语法错误，代码不符合语法规范
- reference error：引用错误，引用不存在的变量
- type error：类型错误，值的类型不符合预期
- range  Error:范围错误,值超出有效范围

- 打开控制台：ctrl+shift+I，或者F12

### CSS引入的三种方式

- 行内样式表：直接在标签内部加入style属性,多个样式之间使用分号分割
- style="font-size:12px;"
- 内部样式表：将css代码写在style标签之内
- 外部样式表：独立的css文件，通过link标签的herf属性引入

1.CSS引入时放的位置尽可能靠前，置于head标签中?

- 浏览器渲染的流程为：加载html--》解析dom--》遇到css--》暂停dom解析--》加载并解析css--》构建cssom--》结合dom+cssom渲染
- 如果CSS在底部，用户会先看到无样式的页面，最后突然应用样式，导致页面样式闪动，用户体验不好。


```css
<link herf="1.css">
```

2.JS引入的位置尽可能靠后，置于body标签的最后一部分?

- JS会阻塞页面渲染
- 放在底部不阻塞DOM解析和渲染，用户先看到内容，体验更好

```css
<script src="1.js">
```


### CSS视觉

- 视觉对布局没有任何影响


#### 渐变 linear-gradient函数


- 函数linear-gradient（方向，起始颜色，最终颜色）
- 常见的应用于background属性
- 方向
- to buttom
- to top
- to right
- to left
- to buttom right对角方向，从坐上到右下
- to top left
- 45deg，45度角
- 颜色：可以有多个，都是变化过程中的
- red,blue,yellow,红到蓝到黄

#### 阴影 box-shadow

- 共5个参数，横向偏移，纵向偏移、模糊半径，扩散半径，颜色
- 5个参数之间使用空格分开
- 多组阴影使用逗号分开，前面一组覆盖后面一组

#### 圆角 border-radius

- 如果只提供一个参数，代表圆角的半径
- 可以是百分比，也可以是像素
- 对方形设置50%的百分比，显示为圆型，大于50的百分比和50%效果一样
- 还可以设置4个参数，分别代表左上、右上、左下、右下的半径

#### 变形

transform属性
- 旋转 transform:rotate()
- 参数单位为deg或者turn
- 缩放 scale(1.2)
- 扩大1.2倍
- 平移： transform:translate(x方向，y方向)
- 或者直接translateX（10px），translateY

变形原点默认为图形中心
也可以通过transform-origin属性修改
- 该属性有以下取值
- center：中心
- left top ：左上
- right buttom:右下
- 或者直接使用坐标指定位置：30px,60px


### CSS三角形实现

- 通过边框实现三角形
- 将盒子的宽度和高度设置为0
- 剩下的都是边框，此时4个三角形边框构成一个正方形
- 只需先将所有的三角形都设置为透明色，再显示想要方向的边框颜色即可