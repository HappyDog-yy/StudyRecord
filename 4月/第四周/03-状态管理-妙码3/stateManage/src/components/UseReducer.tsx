// import { useReducer, useState } from 'react';
import React, { memo, useEffect, useReducer  } from 'react';

// // 方法就是拆分子组件
// interface Person{
//     name?:string,
//     age?:number,
// }

// const Name:React.FC<Person> = memo(()=>{
//     return <div></div>;
// })

// const Age:React.FC<Person> = memo(()=>{
//     return <div>age</div>;
// })

// function UseReducer(){
//     const [person,setPerson] = useState({
//         name:"John",
//         age:20,
//         info:{
//             gender:'male'
//         }
//     });
//     return (
//         <div>
//             <Name></Name>
//             <Age></Age>
//             <button onClick={()=>{setPerson({
//                 ...person,
//                 name:'Jane'
//             })}}>修改名字为Jane</button>
//         </div>
//     );

//     // <button onClick={()=>{setPerson({...person,name:'Jane'})}}>
//     //                 修改名字为Jane</button>
//     // 这种方法会导致渲染的部分不符合预期，打开highlight就会发现


// }

// 上面的方法不好

// 定义person接口
interface Person{
    name?:string;
    age?:number;
}

// 定义name组件
const Name:React.FC<Person> = memo(
    ({name})=>{
        // 处理副作用（即和渲染无关的操作）
        useEffect(()=>{
            console.log("name Rendered");
        })

        return <div>{name}</div>
    },
    // 性能优化，只有name变化时才会重新渲染
    (prevProps,nextProps)=>{
        return prevProps.name === nextProps.name;
    }
);

const Age:React.FC<Person> = memo(
    ({age})=>{
        // 处理副作用（即和渲染无关的操作）
        useEffect(()=>{
            console.log("age Rendered");
        })

        return <div>{age}</div>
    },
    (prevProps,nextProps)=>{
        return prevProps.age === nextProps.age;
    }
);

type ActionType = "UPDATE_NAME" | "UPDATE_AGE";
// 定义两个action，后足针对这两个action分别进行处理
// 使用reducer负责处理状态变化
// 下面那个函数就是负责对应不同的action进行处理
const reducer = (state:Person,action:{type:ActionType,payload:any})=>{
    switch(action.type){
        case "UPDATE_NAME":
            return {
                ...state,
                name:action.payload,
            };
        case "UPDATE_AGE":
            return {
                ...state,
                age:action.payload
            };
        default:
            return state;
    }
}


function UseReducer(){
    const [state,dispatch] = useReducer(reducer,{
        name:"John",
        age:20,
    })
    return (<>
    <Name name={state.name}></Name>
    <Age age={state.age}></Age>

    <button
    onClick={()=>dispatch({
        type:"UPDATE_NAME",
        payload:"jerri"
    })}
    >修改用户名</button>
    </>);
}

export default UseReducer;