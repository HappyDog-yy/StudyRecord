// class Person{
//     // 属性的类型声明
//     name:string;
//     age:number;
//     constructor (name:string,age:number){
//         this.name=name;
//         this.age=age;
//     }
//     speak(){
//         console.log(`我叫${this.name},今年${this.age}岁`)
//     }
// }

// 以上类的定义还有一种简写方式
class Person{
    // 属性的类型声明
    // name:string;
    // age:number;
    constructor (public name:string,public age:number){
    }
    speak(){
        console.log(`我叫${this.name},今年${this.age}岁`)
    }
}


const p1=new Person("jerri",20);
// 创建一个类的实例对象

// 新建一个学生类，如果不需要添加新的属性
// 仅仅需要添加新的方法，不需要写子类自己的构造方法
// 继承使用extends关键字
class Student extends Person{
    grade:string;
    constructor(name:string,age:number,grade:string){
        // 先调用父类的构造函数
        super(name,age);
        this.grade = grade;
    }
}


// 接口，不能有任何具体的实现
// 如果在某个属性名之后加上？表示该属性可选，可有可无
// 区别于抽象类，抽象类中可以有抽象方法和具体方法
// 接口和type的使用有时候是一样的，可以认为是一种数据类型
interface UserInterface{
    name:string;
    readonly gender :string;
    age?:number;
    // 函数不能有任何的函数体
    speak():void;
}

// 类来实现接口，一个也不能少的实现
class stu implements UserInterface{
    constructor(public name:string,public readonly gender :string,public age:number){
    }
    speak(): void {
        console.log("这是我的自我介绍");
    }
}
