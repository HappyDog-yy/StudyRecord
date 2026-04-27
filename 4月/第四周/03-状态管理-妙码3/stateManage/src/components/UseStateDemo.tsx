import React, { useCallback, useState } from 'react';

// 如果初始值来自于本地缓存
const getInit = ()=>{
    const count = localStorage.getItem("count");
    return count?Number(count):0;
}

// 如果你此时在浏览器的窗口控制台输入
localStorage.setItem("count","100");
// 那么任何时候刷新初始值都是100，而不是0


function UseStateDemo(){
    // 这是直接设置初始值为0的情况，还有一种情况是初始值来自于缓存
    const [count,setCount] = useState(getInit());

    const handleClick = useCallback(()=>{
        // setCount(count+1);
        setCount(c=>c+1);
    },[]);


    return <div>
        {count}
        <button onClick={handleClick}>增加1</button>
    </div>
}

export default UseStateDemo;