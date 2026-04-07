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

    for (const ch of s ){
        if(ch==='('||ch==='['||ch==='{'){
            stack.push(ch);
        }else{
            if(stack.length ===0||stack.pop()!==pairs[ch]){
                return false;
            }
        }
    }

    return stack.length === 0;
};
```