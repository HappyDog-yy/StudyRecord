import {useContext,createContext} from 'react';

// 避免了组件间层层传递
// 相当于是一个全局变量
// 逻辑是：创建-->提供-->使用
const ThemeContext = createContext('light');
const LocaleContext = createContext('en');

const ThemeButton = ()=>{
    // 在这个组件里面可以使用上面定义的变量
    const theme = useContext(ThemeContext);
    const locale = useContext(LocaleContext);
    return (
        <button
            style = {{
                backgroundColor:theme === 'dark'?"black":"white",
                color:theme === 'dark'?"white":"black"

            }}
        >
            {locale === 'en'?"Click me":"点击我"}
        </button>
    );
}

function UseContextDemo(){
    return <>
    <ThemeContext.Provider value = 'dark'>
        <LocaleContext.Provider value = 'en'>
            <ThemeButton></ThemeButton>
        </LocaleContext.Provider>
    </ThemeContext.Provider>
    </>;
}

export default UseContextDemo;