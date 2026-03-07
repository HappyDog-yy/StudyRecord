### PromiseA+规范

- promise A+规范
- 任务分为两个阶段和3个状态，未决（pending）和已决（完成fulfilled和失败rejected）
- 只要有结果，不论成功还是失败，都是已决状态
- 不能逆行（如：已决到未决，或者其他状态到pending，也不能再fulfilled和rejected之间切换状态）
- 状态一旦确定，就不能改变

- 对于任务的后续处理
- fulfilled：reslove成功，返回数据data，后续处理函数为onreslove
- rejected：reject失败，返回 原因reason，后续处理函数为onrejected
- 调用reslove，即可将任务状态变成fulfilled
- 调用rejected，任务状态变成rejected
### Promise使用

```javascript
const pro=new Promise((reslove,reject)=>{
    if(Math.random()<0.4){
        reslove("good");
    }else{
        reject("injury");
    }
})
```

- 后续处理使用then
- 第一个位置为成功的后续处理，第二个位置为失败的后续处理，可以填null，表示不做任何处理

```javascript
pro.then((data)=>{
    console.log("成功了！",data);
},
(reason)=>{
    console.log("失败原因",reason);
})
```
### Promise链式处理

- then返回一个promise对象
- 该对象的状态取决于后续处理

- 1.若没有相关的后续处理（如任务失败了，但没有对应失败的后续处理），新对象的状态和数据与之前保持一致
- 2.若有相关的后续处理，但后续处理还没有执行，新任务对象的状态为pending挂起状态
- 3.若有相关的后续处理，且相关的后续处理执行了，则新任务对象的状态取决于后续处理的执行情况
	- 若后续处理执行无措，新任务状态fulfilled，data为后续处理的返回值
	- 若后续处理执行出错，新任务状态为rejected，reason为出错原因，异常对象
	- 如果后续处理返回一个promise对象，则新任务对象的状态和数据与该返回对象保持一致

pro.then().catch()
代表成功的后续处理是then，失败的后续处理是catch中的函数
pro.then().then()
代表成功之后有很多步骤需要执行，该函数依次执行

### Promise的静态方法

- promise.reslove(data)：创建一个对象+将状态改成fulfilled+数据为data
- promise.rejected(reason)：创建一个对象+将状态改成rejected+数据为reason
- promise.all(pro1,pro2):传入一个对象数组，只有所有的都为fulfilled的才算成功，返回所有对象的成功原因；只要有一个为rejected，则返回该对象的失败原因，
- promise.any(pro1,pro2):传对象数组，任意一个成功就停止，返回该对对象成功原因，全部失败则失败，返回所有对象的失败原因
- promise.allselected():传对象数组,全部已决则已决
- promise.race():传对象数组,全部未决则未决

### async和await关键字的使用

- 是官方指定的关键字

- async
- 用于修饰函数，该函数返回一个任务对象
- 该函数的如果成功返回，就将返回的内容设置为reslove的data
- 如果未成功返回（函数执行过程中出错），则状态为rejected
- 若该函数本身就返回一个promise对象，就相当于async关键字此时可以去掉

- await
- 用在被async修饰的函数里面
- 表示等待一个任务对象完成，并得到一个数据
- const data=await promise.reslove(1);
- 如果等待的不是一个promise对象，就将他转换成promise对象
- const data=await 1;
- 相当于状态为fulfilled，data=1