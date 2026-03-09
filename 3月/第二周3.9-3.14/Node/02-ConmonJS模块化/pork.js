// 用于创建一副新的扑克牌，暴露构造函数

// 
function Pork(color,num){
    this.color = color;
    this.num = num;
}

// 拼接字符串，让花色和数字都能正常显示
Pork.prototype.toString=function(){
    let str="";
    // ♠ ♥ ♣ ♦
    // 花色
    if(this.color===1){
        str="♠";
    }else if(this.color===2){
        str="♥";
    }else if(this.color===3){
        str="♣";
    }else if(this.color===4){
        str="♦";
    }

    // 数组
    if(this.num >=2 && this.num <=10){
        str += this.num;
    }else if(this.num===1){
        str += "A";
    }else if(this.num===11){
        str += "J";
    }else if(this.num===12){
        str += "Q";
    }else if(this.num===13){
        str += "K";
    }else if(this.num===14){
        str = "joker";
    }else if(this.num===15){
        str = "JOKER";
    }

    return str;
};

// 导出
exports.Pork=Pork;