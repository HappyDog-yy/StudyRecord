let timeID;

function start(){
    // 如果存在就返回，不存在就创建
    // 而非创建多个计时器，造成资源占用与浪费
    if(timeID){
        return;
    }
    timeID = setInterval(function(){
        //清除上一秒的时间显示
        console.clear();
        // 造成时间一直在变化的错觉
        console.log(new Date().toLocaleTimeString());

    },1000)
}

start();

// 停止时仅需清除timeid
function end(){
    clearInterval(timeID);
    // 清除计时器之后，相当于仅仅把闹钟删掉了，但是timeid现在还寸的有值
    // 会导致start函数里面的if判断进去，使用start没有办法新开计时器
    // 做法：清除计时器之后，讲timeid设置为null等空值
    timeID = null;
}

end();