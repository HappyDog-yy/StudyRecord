### 1.let关键字声明了一个块级作用域的局部变量

- 声明的变量仅仅在作用域内有效
- 在for循环之外访问变量i，会出错
- 每次循环有自己的i变量

```js
for(let i=0;i<5;i++){
    setTimeout(function () {
            console.log(i);
    },1000)
}

// for循环外部访问变量i出错
// 1s之后执行0 1 2 3 4
// 创建5个计时器，但是5个计时器的创建几乎是同时的
// 因此看起来1s之后，五个计时器同时输出01234
```

将上述代码中的let改成var，会输出什么？

```js
for(var i=0;i<5;i++){
    setTimeout(function () {
            console.log(i);
    },1000)
}

// 输出5个5
// 因为var没有块级作用域，所有变量共享一个i，使用的是1s之后的i
```

- 为什么一个输出的是4，一个是5
- 对于for(条件1，条件2，自增)
- 条件1，初始化，只执行一次-->条件2-->自增

- 5次循环的执行过程如下
- i=0，i<5,i++,let记住i=0
- i=1，i<5,i++,let记住i=1
- i=2，i<5,i++,let记住i=2
- i=3，i<5,i++,let记住i=3
- i=4，i<5,i++,let记住i=4
- 此时i=5，不满足循环条件，不进入循环
- 循环结束之后，i的值变成5了

- 因此let定义变量输出0 1 2 3 4
- var定义变量输出5个5（相当于定义了一个全局的i，var没有块级作用域）


### 2.函数的词法环境和变量环境分析

- **变量环境**
- 存储var声明的对象
- 块内的var声明的变量也会存储到这里
- 在整个函数执行期间都存在

- **词法环境**
- 存储let/const声明的变量
- 分为多个层级，函数/块
- 块级作用域结束后，对应的词法环境销毁
- 内层可以遮蔽外层的同名变量

```js
function foo() {
    var a_var = 1;
    let b_let = 2;
    {
        let b_let = 3;
        var c_var = 4;
        let d_let = 5;
        console.log('a_var',a_var);
        console.log('b_let',b_let);
    }
    console.log('b_let',b_let);
    console.log('c_var',c_var);
    console.log('d_let',d_let);
}
foo();
```

1.foo的变量环境(var)-->存a_var=undefined、c_var=undefined
  foo的词法环境(let,const)-->b_let(啥也没有，没有undefinted)

2.foo的变量环境(var)-->存a_var=1、c_var=undefined
  foo的词法环境(let,const)-->b_let = 2

3.此时执行到块级作用域
  foo的变量环境(var)-->存a_var=1、c_var=4
  foo的词法环境(let,const)-->b_let = 2
    此时词法环境中再包含一个块级作用域
    块级词法环境：b_let = 3(遮蔽外层的2),d_let = 5

4.块级作用域中的输出 1-->3
    块级词法环境在执行完之后被销毁
    foo的变量环境(var)-->存a_var=1、c_var=4
    foo的词法环境(let,const)-->b_let = 2

5.外层输出：2 4 报错：未定义