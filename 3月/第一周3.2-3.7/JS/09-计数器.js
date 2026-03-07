let num=document.querySelector('.number');
let add=document.querySelector('.add');
let less=document.querySelector('.less');

let content=0;

function display(){
    num.textContent=content;
}
// 初始化显示
display();

add.addEventListener('click',()=>{
    content += 1;
    // console.log(content);
    display();
})

less.addEventListener('click',()=>{
    content -= 1;
    // console.log(content);
    display();
})

// num.textContent=content;
// 这样写的后果是，只更新一次显示，考虑将其封装为函数
