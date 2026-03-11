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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 以上类的定义还有一种简写方式
var Person = /** @class */ (function () {
    // 属性的类型声明
    // name:string;
    // age:number;
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.speak = function () {
        console.log("\u6211\u53EB".concat(this.name, ",\u4ECA\u5E74").concat(this.age, "\u5C81"));
    };
    return Person;
}());
var p1 = new Person("jerri", 20);
// 创建一个类的实例对象
// 新建一个学生类，如果不需要添加新的属性
// 仅仅需要添加新的方法，不需要写子类自己的构造方法
// 继承使用extends关键字
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    function Student(name, age, grade) {
        // 先调用父类的构造函数
        var _this = _super.call(this, name, age) || this;
        _this.grade = grade;
        return _this;
    }
    return Student;
}(Person));
// 类来实现接口，一个也不能少的实现
var stu = /** @class */ (function () {
    function stu(name, gender, age) {
        this.name = name;
        this.gender = gender;
        this.age = age;
    }
    stu.prototype.speak = function () {
        console.log("这是我的自我介绍");
    };
    return stu;
}());
