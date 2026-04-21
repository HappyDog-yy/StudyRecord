import React,{Suspense} from 'react';
import {Header} from "./Header";
import {Footer} from "./Footer";
// 上面是静态引入的方式
// 下面是动态引入的方式
// 什么叫做动态导入？就是在需要的时候才去加载这个模块，而不是一开始就加载
const HeaderModule = React.lazy(() => import('./Header').then(module => ({ default: module.Header })));
console.log(HeaderModule);
export const SuspenseDemo = () => {
    return (<div>
        {/* 只有里面的异步组件HeaderModule状态变成resolved时才会显示
        否则一直渲染loading */}
        <Suspense fallback={<div>Loading...</div>}> 
            <HeaderModule />
        </Suspense>
        <Header />
        <Footer />
    </div>);
}

export default SuspenseDemo;