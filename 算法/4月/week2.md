### 1.字符串括号匹配->使用栈

https://leetcode.cn/problems/valid-parentheses/submissions/716102120/?envType=study-plan-v2&envId=top-100-liked

```ts
function isValid(s: string): boolean {
    const stack:string[]=[];
    const pairs:Record<string,string>={
        ')':"(",
        "}":"{",
        "]":"["
    }

    // ch是其中的每一个属性
    for (const ch of s ){
        if(ch==='('||ch==='['||ch==='{'){
            // 如果是左括号，加入对应的栈中
            stack.push(ch);
        }else{
            // 如果不是左括号，看目前的ch属性与刚刚加入栈中的属性是否匹配
            // 先弹出，再看是否匹配，不匹配就直接返回false
            // 如果没有左括号的特殊情况也要直接返回false
            // 两者是或的关系，满足其一即可
            if(stack.length ===0||stack.pop()!==pairs[ch]){
                return false;
            }
        }
    }
    // 如果所有的都弹出了了，此时的长度为0，代表是匹配的，否则不匹配
    return stack.length === 0;
};
```

### 2.