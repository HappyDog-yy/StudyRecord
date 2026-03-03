
由于html的局限性，只关心元素的内容，美化起来比较繁琐
html做结构，CSS做样式，两者共同创造出美的网页

## 语法规范

- 选择器+{属性键值对}
- 写在`head`标签里，用`style`标签包裹起来
- 展开式风格

### CSS选择器

作用：选择不同的标签，为不同的标签提供不同的样式

##### 分类

- 标签选择器：标签名作为选择器，作用于页面中所有的特定标签，并修改其属性
- 类选择器：可差异化选择，类名是自己选择的

类名常见命名对应的英文，不强制，
- 头：header
- 内容：content、container
- 尾部：footer
- 导航：nav
- 侧边栏：sidebar
- 栏目：column
- 登陆条：Loginbar
- 标志：Logo
- 广告：banner
- 页面主体：main
- 热点：hot
- 下载：download
- 搜索：search
- 友情链接：friendlink
- 子菜单：submenu

一个标签的class属性也已使用多个样式，不同的样式名字之间使用空格隔开

- id选择器：名字前面加上#开头，一个标签只能选择一个id
- id也只能使用一次，相当于是一个一次性的东西

通配符：*


### CSS字体属性
- 在style中指定，可以为整个`body`标签指定
- font-family：字体
- font-size：定义字体大小，单位为px像素
- 标题标签在body李设定字体大小没用，必须单独设置
- font-weight：字体粗细，可选bold（加粗）、bolder（特粗）、lighter（细体）、数字700、任何数字都可以，不用加单位，默认400，加粗700
- font-style：文本风格
- font：复合属性，可以连着写好几个，但必须是size--》style--》style-->family的顺序，字号和字体不能少
如何让倾斜的文字不倾斜？加粗的不加粗


### CSS文本属性
color：颜色属性 rbb、
text-align：文本水平对齐方式，center left right
text-indent：文本的段落缩进，em和px均可做单位
text-decoration：文本修饰，可以为文本添加下划线、上划线和删除线等，取消是none
line-height：行高


### CSS引入的三种方式

- 1.内部样式表，放在style标签中，style标签可以放在任何地方，默认放在head里面。结构与样式分离
- 2.行内样式表，写在标签里面，直接针对某个标签，只控制当前标签
```
<p style="color:aquamarine;line-height: 26px;">
        Change Your word, Change your mindset.
 </p>
```

- 3.外部样式表：单独的css文件，里面只存放样式，不需要再任何标签之中
```
<link rel="stylesheet" href="style.css">
```

输入link之后，直接tba制表位，就可以出来，herf属性填写文件的地址即可


### Emmet语法

输入table，之后按tab键就可以将两个标签显示出来
`div*4 -->tab`可以直接生成4个div标签
包含关系（父子关系）使用大于号：ul>li-->tab
兄弟关系使用+加号
类和id如果用在`div`上，可以直接`.类名`和`#id名`，之后使用tab键就可以
`p.one`可以为p标签添加一个class=one的属性
`p#one`可以为p标签添加一个id=one的属性
div{我喜欢学习}-->tab：可以直接变成她的内容
还有CSS中缩写，w100-->tab直接设置宽度为100px

### 复合选择器

复合选择器是由基础选择器组合而成，包括后代选择器、子选择器、并集选择器、伪类选择器
#### 父代选择器

- 比如只想选中ol中的li标签，可以在设置样式的时候这么写
- `ol li{color:blue;}`
- 两个元素之间使用空格隔开，可以不止有两个元素，
- 父元素在前，子元素在后父子孙....
- 无论是儿子、孙子、重孙子，所有满足要求的都会选择

#### 子元素选择器

- 设置样式时只用大于号隔开
- 只会选择她的直系儿子中满足要求的



