let test1:number[] = [3,0,11,3,8];

// 冒泡排序
function Sort(arr:number[]){
    let min:number = arr[0];
    // 外层循环控制
    for(let i:number = 0;i<arr.length;i++){
        for(let j:number = i+1;j<arr.length;j++){
            if(arr[j]<arr[i]){
                let temp:number = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

console.log(Sort(test1));

// // 选择排序
// function selectSort(arr:number[]){
//     let minIndex = 0;
//     for(let i:number=0;)
// }
