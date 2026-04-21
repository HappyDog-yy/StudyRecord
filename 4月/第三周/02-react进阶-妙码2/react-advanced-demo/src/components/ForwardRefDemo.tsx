import React, { useEffect ,useId,useRef} from 'react';

// 自定义组件INput
// 不是原生的html元素，不能直接使用ref引用
// 此处使用React.forwardRef来创建一个可以转发ref的组件
const Input=React.forwardRef<HTMLInputElement, InputProps>((props, ref )=>{
    // 上面的泛型说明
    // 第一个是ref指向的元素类型
    // 第二个是组件的属性类型
    const id  = useId();
    // 为了保证id的一致性
    // useId是一个React Hook，允许我们在组件中生成一个唯一的ID
    // 这个ID在组件的整个生命周期内保持不变，可以用来标识组件中的元素
    return (
    <div>
        <input ref = {ref} {...props}/>
        <label htmlFor={id}>children input</label>
    </div>);
    // 接受两个参数：props和ref
    // props是组件的属性对象，包含父组件传递给子组件的所有属性
    // ref是一个特殊的参数，用于接收父组件传递的ref引用

    // 接受父组件的ref引用，并将其转发给input元素
})

// 定义一个接口
interface InputProps{
    value?: string;
};


// 用于获取子组件的ref需要使用到
// 我们现在写得ref是react element提供的
// 如果我们自定义组件的话，就不支持这个
// 意思是目前只支持原生的html元素，
// 不能支持我们自定义的函数组件
export const ForwardRefDemo=()=>{
    // ref引用，初始值为null
    // 用于引用Input组件中的input元素
    const ref = useRef<HTMLInputElement|null>(null);

    // 副作用函数，依赖空数组
    // 仅在组件挂载时执行一次
    useEffect(()=>{
        // 副作用
        console.log(ref.current);

        //  清理函数，return是可选的
        return()=>{};
    },[]);

    // 此处将ref引用传递给子组件Input组件
    return(<div>
        <Input ref = {ref}></Input>
        <Input ref = {ref}></Input>
        <Input ref = {ref}></Input>
    </div>);
}