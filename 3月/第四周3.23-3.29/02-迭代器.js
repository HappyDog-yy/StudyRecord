// 迭代器：提供一种统一的方法来访问各种可迭代对象
// 迭代器协议：一个对象要称为迭代器，必须实现一个next方法
// 该方法返回一个包含两个属性的对象
// 属性1--》value:当前值
// 属性2--》done:true或false，迭代玩成后为true

class counterIterator{
    constructor(start = 0,end = Infinity,step = 1){
        this.current = start;
        this.end = end;
        this.step = step;
    }

    // 迭代器必须要实现的next方法
    next(){
        if(this.current <= this.end){
            const value = this.current;
            this.current  += 1;
            return {
                value:value,
                done:false,
            };
        }else return {
            value:undefined,
            done:true,
        }
    }
}

// 迭代器的创建和使用
const counter = new counterIterator(1,3);

console.log(counter.next());
console.log(counter.next());
console.log(counter.next());
console.log(counter.next());
