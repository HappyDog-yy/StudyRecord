### CSS引入的三种方式

- 1.行内样式，在标签的style属性中直接写样式，样式采用键值对的当时使用，中间用逗号隔开
- 2.内部样式表，在`<head>`中用`style`标签引入
- 3.外部样式表，单独的CSS文件，使用`<link src="">`引入
- **html中引入JS文件的方法**
- 内部脚本`script`标签中直接写JS代码
- 引入js文件`script`src属性为文件的路径

#### 多重选择器之间使用逗号分割
#### 选择器的优先级：特定的优先级大于一般的
#### 行内样式>id>类/元素>通用

1.通用选择器

```html
*{
}
```

2.元素选择器

```html
p{
}
```

针对页面中所有的p标签

3.类选择器

```html
.head{
}

<p class="head"></p>
```

4.ID选择器，只能用一次

```html
#head{
}

<p id="head"></p>
```

5.属性选择器

```html
button[disabled]{
}
%% 选择所有拥有disabled属性的按钮元素 %%
```

6.后代选择器

```html
.head h1{
}

<p class="head">
	<h1></h1>
</p>

%% 选择所有h1标签 %%
```

7.子元素选择器使用大于号

```html
.head >li{
}
```

8.相邻兄弟选择器时使用加号

```html
h2+p{
}
```

9.通用兄弟选择器~

```html
h3~p{
}
```

10.伪类选择器
（1）状态伪类

```html
//未访问的链接状态
a:link{
}

//已经访问过的
a:visited{
}

//鼠标悬停时的状态
a:hover{
}

//点击之后的状态
a:active{
}
```

(2)结构伪类
```html
//第一个孩子
li:first-child{}
//最后一个孩子
li:last-child{}
//第2个孩子
li:nth-child(2){}
```

11.伪元素选择器

```html
//在元素之前插入
.price::before{
}

//在元素之后插入
.price::after{
}

//占位样式
input::placeholder{
}
```

