// 函数防抖，防止事件频繁触发
// 传入要执行的函数和延迟时间
function debunce(fn,delay){
    let timer=null;

    // 返回一个函数
    // 这个函数的作用是，隔一段时间再执行传入的函数fn
    return function(){
        // 当有这个计时器的时候，清除计时器，重新开始计时
        if(timer){
            clearTimeout(timer);
        }
        timer=setTimeout(function(){
            // 调用这个传入的函数
            fn();
        },delay)
    }
}

// function func(){
//     console.log("用户有点击操作");
// }

// // 最后要执行的函数是返回的那个函数
// let finally_fn=debunce(func,2000);

// window.addEventListener('mousemove',finally_fn)

// 函数节流
function JL(fn,delay){
    let lastTime = 0;
    // 上次执行时间

    return function(){
        // 记录当前时间
        const now=Date.now();

        // 如果距离上次执行时间已经超过delay
        if(now-lastTime >= delay){
            // 执行函数
            fn.apply(this,arguments);
            // 更新上次执行时间
            lastTime = now;
        }

    }
}

function func(){
    console.log("用户有点击操作");
}

// 最后要执行的函数是返回的那个函数
let finally_fn=JL(func,2000);

window.addEventListener('mousemove',finally_fn)