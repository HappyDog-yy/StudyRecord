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

### 2.数组实现栈及基本操作CRUD

https://leetcode.cn/problems/min-stack/submissions/716741150/?envType=study-plan-v2&envId=top-100-liked

```ts
class MinStack {
    // 栈：先进后出的原则，最先删除的是栈顶元素，加入的元素作为新的栈顶
    // 栈的数据结构如果用数组实现，数组的尾部作为栈顶元素
    // 链表的话，链表头作为栈顶元素

    // 创建栈-->不能在类内使用let或者const，应换成对应的修饰private等
    private stack:number[] = [];

    constructor() {
        // this.arr = arr;
        this.stack = [];
    }

    // 加入元素
    push(val: number): void {
        this.stack.push(val);
    }

    // 弹出栈顶元素
    pop(): void {
        this.stack.pop();
    }

    // 获取栈顶元素
    top(): number {
        return this.stack[this.stack.length-1];
    }

    // 获取其中的最小元素
    getMin(): number {
        let min:number = this.stack[0];
        for(let i=0;i<this.stack.length;i++){
            if(this.stack[i]<min){
                min = this.stack[i];
            }
        }
        return min;
    }
}

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */

//  ["MinStack","push","push","push","getMin","pop","top","getMin"]
// [[],[-2],[0],[-3],[],[],[],[]]
// 第一个数组是要执行的方法名，第二个数组是传递的参数
// 传递的参数数组每一个元素又是一个数组，最后一个对应就是，执行getMin()的执行结果
```