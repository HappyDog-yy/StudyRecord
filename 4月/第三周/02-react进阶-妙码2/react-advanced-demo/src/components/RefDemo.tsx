import  { useEffect ,useRef} from 'react';

interface Refs{
    // 定义一个接口，包含3个属性，分别是c1和c2，
    // 类型都是HTMLInputElement或者null
    // 可选属性表示可能存在也可能不存在，每个属性的数据类型是HTMLInputElement或者null
    // HTMLInputElement是一个表示（HTML输入框）元素的类型，null表示没有值或者不存在
    c1?: HTMLHeadingElement | null;
    c2?: HTMLHeadingElement | null;
    c3?: HTMLHeadingElement | null;
}

export const RefDemo=()=>{
    // 一个函数组件，组件名为RefDemo
    // useRef是一个React Hook，允许我们在函数组件中创建一个可变的引用对象
    // 这个引用对象在组件的整个生命周期内保持不变，可以用来存储任何可变的数据
    // 简单使用
    // 一个空对象，类型是Refs
    // 创建一个ref对象，初始值是一个空对象，类型是先前定义好的接口Refs
    const refs = useRef<Refs>({});

    useEffect(()=>{
        // 副作用函数，执行的次数和时机取决于依赖
        // 依赖为空数组：副作用函数只会在组件挂载时执行一次
        // 依赖为空：每次渲染之后执行
        // 依赖包含某个变量：当该变量发生变化时执行
        console.log(refs.current.c1);
    },[])
    // 此处的依赖是一个空数组，
    // 表示这个副作用函数只会在组件挂载时执行一次
    // 但是在严格模式下，React会在开发环境中调用两次这个副作用函数，
    // 因此在控制台中会看到两次undefined的输出，

    // <h2 ref={(node)=>{refs.current.c1=node}}>Ref 1 Demo</h2>
    // 创建一个h2元素，使用ref属性来获取这个元素的引用
    // node是一个回调函数的参数，表示当前h2元素的引用
    // refs.current.c1=node将这个引用存储在refs.current对象的c1属性中

    // 用于一个组件之中，有多个元素需要倍refs引用，引用之后获取其值的情况
    return (
        <div>
            <h2 ref={(node)=>{refs.current.c1=node}}>Ref 1 Demo</h2>
            <h2 ref={(node)=>{refs.current.c2=node}}>Ref 2 Demo</h2>
            <h2 ref={(node)=>{refs.current.c3=node}}>Ref 3 Demo</h2>
        </div>
    )
}