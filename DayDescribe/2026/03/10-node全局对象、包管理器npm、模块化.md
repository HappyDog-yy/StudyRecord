- 如何将一个数组中的元素打乱
- arr.sort(a,b)=>{
- return Math.random()-0.5}
### 1.node全局对象global

- node是js的运行时环境，
- 使用全局对象本身，可以为他自己添加一个属性global
- `obj.global=obj`
- 浏览器的全局对象是window


- global和window有相同的属性，`setTimeout`和`setInterval`
- 使用方法相同，不同的是浏览器中，这两个函数返回对应的计时器id
- 而在node环境中，返回一个对象

- 1.新增`setImmediate`,相当于settimeout的时间设置为0
- 2.`__dirname`:获取当前模块所在目录
- 3.`__filename`：获取当前模块的文件目录
- 4.`Buffer`：类型化数组，继承自Uint8Array,无符号8字节整数
- `const arr = Buffer.from("abcd","utf-8");`
- 5.`process`:cwd()得到工作目录，命令行所在目录
- `process.argv`：获取所有命令行参数
- `process.platform`：获取当前操作系统
- `process.kill(进程id)`：杀死进程，进程id可在任务管理器获得
- `process.env`：获取环境变量


### 2.模块化

node一次只能运行一个js文件，该文件称为启动文件或者入口文件

#### 2.1模块是什么

- 可以简单理解为一个JS文件，实现了一些功能，同时隐藏内部实现和暴露外部接口
- 默认情况下都是隐藏的，暴露某个变量或者模块需要特殊的语法
- 使用这个被暴露的模块时，被称为模块的导入

#### 2.2 commonJS 规范

- exports导出
- require导入
- exports是一个空对象，可以为他添加任何需要被导出的属性
- `export.a=1;`
- `export.a=;`
- 导入模块使用require关键字
- `require("./1.js")`
- 导入时路径使用相对路径，必须以`./`或者`../`开头
- 如果一个JS文件中存在导入或者导出的关键字，称他是一个模块

#### 2.3 moudle.exports和exports的区别

- 实际导出的是moudle.exports的内容，刚开始两者相同
- 语法上，可以直接为moudle.exports添加对象，但exports只能通过属性添加
- moudle.exports={name:"jerri"};

#### 2.4模块缓存

- 为了避免重复加载同一个模块，开启了模块缓存
- 之前加载过的模块不会被重复加载

#### 2.5 ES6模块化

- import导入，export导出，注意此时没有s
- 依赖预加载，必须将所有import语句都放在最前面
- 可以使用as重命名
- `import {b as b2,a as a1} from "1.js"`
- 导入的东西可以简单理解为const修饰的，不能修改
- 如果要把所有的东西都导入，必须起名字
- `import * as a from ...`
- 如果仅想运行某个模块，而不导入其中的任何代码，直接import该模块即可
- `import "1.js"`,经常用于初始化代码

- 默认导入导出
- 允许多个基本导出和1个默认导出

### 3.包管理器npm

- 库：多个模块的组合，可以实现一个完整的功能
- 包：库的升级，包含一些元数据，往往会上传到npm官网上的各种所需数据


 - 前端包管理器：npm，node package manage
 - node内置该管理器，是其他包管理器的基石

- 查看当前的npm版本：npm -v
- 包管理器在国外，可使用淘宝镜像
- npm config set registry https://registry.npm.taobao.org
- 查看镜像配置npm config get registry
- npm安装包的命令
- 本地安装：npm install 包1 包2
- 全局安装：加上--global参数`npm install --global 包1 包2`

#### 本地安装
- 通常使用本地安装，会自动安装在项目根目录下的node_moudles文件夹下
- 本地安装的影响范围小
- 如果你要下载的包有依赖，会自动查找依赖树，一并安装它的依赖
- 若本地安装的包带有CLI，npm会自动将他的脚本文件放到node_moudles/.bin文件夹下，使用npx命令名即可调用
- 添加gitignore文件忽略所有包

#### 全局安装
- 全局安装的包并非所有i项目可用，他仅仅提供全局的CLI命令
- 全局安装的场景：包稳定、CLI的使用频繁、CLI仅在开发环境中用，不在生产环境中使用

#### 包配置package.json

- npm init课初始化项目，生成对应的包配置文件
- 包配置文件在项目根目录下
- npm init --yes代表所有都是默认条件
- 安装依赖时，默认都安装到生产环境中，如果要安装到开发环境中
- 加上--dev参数
- npm -i --save -dev或者npm -i --save -D
