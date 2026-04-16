// 测试数组test
let test = [99,8,8,6,1,2,7,0]

// // 冒泡排序
// function bubbleSort(arr){
//     const len = arr.length;
//     // 外层循环控制的i元素要和他后面的元素逐个比较
//     for(let i=0;i<len;i++){
//         // 内层循环：后面要比较的【i+1,len-1】
//         for(let j=i+1;j<len;j++){
//             // 最后是升序，如果i比j大，就把i交换到后面去
//             if(arr[i]>arr[j]){
//                 let temp = arr[i];
//                 arr[i] = arr[j];
//                 arr[j] = temp;
//             }
//         }
//     }
//     return arr;
// }

// console.log(bubbleSort(test));


// // 快速排序算法,随机选一个数，比她小的都放在左边，比它大的都放在右边
// function quickSort(arr){
//     sort(arr,0,arr.length-1);
//     return arr;

//     function sort(arr,low,high){
//         // 首先处理数组只有一个数或者0个数的情况，不需要排序，直接返回
//         if(low>=high){
//             return arr;
//         }

//         let i=low;
//         let j=high;
//         // 随便找一个数作为x，大于他的都放他右边，小于它的都放它左边
//         let x = arr[i];
//         while(i<j){
//             // 找后面的,如果比x小就往前面放
//             // 循环停止时的j就满足上述情况
//             while(arr[j]>=x && i<j){
//                 j--;
//             }
//             if(i<j){
//                 arr[i] = arr[j];
//                 i++;
//             }

//             // 从数组头部开始找，找到比x大的就往后面放
//             while(arr[i]<=x && i<j){i++;}
//             if(i<j){
//                 arr[j] = arr[i];
//                 j--;
//             }

//             // 直到最后两个（i,j）相遇
//             // 此时i是空的，可以找个例子试试
//         }arr[i] = x;

//         // 对于左边和右边的区间分别再进行排序
//         sort(arr,low,i-1);
//         sort(arr,i+1,high);
//     }
// }

// console.log(quickSort(test));

// // 3.选择排序法
// // 先假设第一个就是最小的，然后后面的跟他比较，交换，
// // 直到第一圈走完，更新索引，第一个位置就是最小的，这时候只需要比较后面的len-1个元素
// function selectSort(arr){
    
//     for(let i=0;i<arr.length;i++){
//         let min = i;
//         for(let j=i+1;j<arr.length;j++){
//             if(arr[j]<arr[min]){
//                 // 如果找到更小的就交换i，j，
//                 let temp = arr[i];
//                 arr[i] = arr[j];
//                 arr[j] = temp;
//             }
//         }
//     }
//     return arr;
// }

// console.log(selectSort(test));

// // 插入排序法
// // i前面的是排好的，i以及后面的逐个找位置插入
// function insertSort(arr){
//     // 第0个元素只有一个，一定是拍好序的，所以i从1开始
//     for(let i=1;i<arr.length;i++){
//         let prevIndex = i-1;
//         let current = arr[i];
//         // 前面已经拍好的序列默认从小到大
//         // 如果current刚好比最后一个大，是不需要排的情况
//         while(prevIndex>=0 && current<arr[prevIndex]){
//             // 让前面的prev往前移动一位，腾出位置
//             arr[prevIndex+1] = arr[prevIndex];
//             prevIndex--;
//         }
//         // 此时已经到了要插入的位置
//         arr[prevIndex+1] = current;
//     }
//     return arr;
// }

// console.log(insertSort(test));

// x希尔排序法

// function shellSort(arr){
//     const len = arr.length;
//     // 外层循环控制gap值，只有最后gap值为1，才会拍好
//     // 希尔排序是对插入排序的优点的极大利用
//     for(let gap =Math.floor(len/2) ;gap>0;gap=Math.floor(gap/2)){
//         // 第二层循环控制每组中的第二个元素
//         // 如果gap为5，所有元素都会被分成5组
//         // 如第一组元素的索引是0 5 10，i就是5
//         // 第二组元素的索引是1 6 ，i后面就是6

//         // ???下表为10的元素什么时候进行比较了，在i循环到10的时候第一组才比较完毕
//         for(let i=gap;i<len;i++){
//             // 保存第二个元素，和第一个元素比较，进行排序
//             const temp = arr[i];
//             let j = i;

//             // 在第一组中，从后往前移动索引比较大小
//             // 第一组是0 5 10 ，就从5移动到0
//             // 如果索引5的元素小于索引0的元素，就进行交换
//             // 如果temp是这一组中最大的，就直接插进去
//             // 如果不是，就等待找到这个位置
//             while(j-gap>=0 && temp<arr[j-gap]){
//                 arr[i] = arr[j-gap];
//                 j = j-gap;
//                 // 继续向前移动，直至改组所有元素排序完成
//             }
//             // 找到合适位置
//             arr[j] = temp;
//         }
//     }
//     return arr;
// }

// console.log(shellSort(test))


// // 归并排序
// function mergeSort(arr){
//     return sort(arr,0,arr.length-1);
//     function sort(arr,left,right){
//         if(left<right){
//             const mid = Math.floor((left+right)/2);
//             const leftArr = sort(arr,left,mid);
//             const rightArr = sort(arr,mid+1,right);

//             return merge(leftArr,rightArr);
//         }

//         return left >=0?[arr[left]]:[];
//     }

//     // 合并两个有序数组的方法
//     function merge(leftArr,rightArr){
//         let left = 0;
//         let right = 0;
//         let res = [];

//         while(left<leftArr.length && right<rightArr.length){
//             if(leftArr[left] <= rightArr[right]){
//                 res.push(leftArr[left]);
//                 left++;
//             }else{
//                 res.push(rightArr[right]);
//                 right++;
//             }
//         }

//         // while循环结束之后合并其中一个数组剩下的内容
//         // 检查哪个数组剩下内容
//         if(left<leftArr.length){
//             while(left<leftArr.length){
//                 res.push(leftArr[left]);
//                 left++;
//             }
//         }else{
//             while(right<rightArr.length){
//                 res.push(rightArr[right]);
//                 right++;
//             }
//         }
//         return res;
//     }
// }

// console.log(mergeSort(test));


// // 计数排序

// function countSort(arr){
//     // 缺陷是会造成空间的浪费，且改进前不能处理数组中有负数的情况
//     let max = -Infinity;
//     let min = Infinity;

//     // 找到数组中的最大值，用于计数的数组的长度为max+1
//     for(let v of arr){
//         max = Math.max(max,v);
//         min = Math.min(min,v);
//     }

//     const count = new Array(max-min+1).fill(0);
//     // 计数数组count全部用0初始化
//     for(let v of arr){
//         count[v-min]++;
//     }
//     const res = [];
//     // 把count数组中的东西从小到大全部输出，直至全部输出
//     for(let i = 0;i<count.length;i++){
//         let temp = count[i];
//         while(temp--){
//             res.push(i+min);
//         }
//     }
//     return res;
// }

// console.log(countSort(test));


// 基数排序
function basicSort(arr){
    // 获取数字num的digit位数字,个位为0，十位为1
    function getDigitNum(num,digit){
        // Math.pow(10,2)用于计算10的2次方
        return Math.floor(num/Math.pow(10,digit)%10);
        // 例如获取123的2位，123/10**2=1.23，向下取整得到1
        // 获取到百位的数字
    }

    // 求出最大的数字,循环遍历得到
    let maxNum = arr[0];
    arr.forEach(num => {
        if(num>maxNum){
            maxNum = num;
        }
    });

    // 获取最大数字有几位
    let maxDigit = 0;
    while(maxNum>0){
        maxNum = Math.floor(maxNum/10);
        maxDigit ++;
    }

    // 对每个进制位上的数进行排序，i代表当前是哪一位的数字
    // 以下代码的作用是将arr中的所有元素按照第i位的数字放在对应的桶中
    for(let i=0;i<maxDigit;i++){
        // 初始化10个桶，分别代表0-9，每个桶是一个数组
        let buckets = new Array(10).fill(0).map(()=>[]);
        for(let k=0;k<arr.length;k++){
            // 获取该元素的第i位数字，看看能放在哪个桶中
            const bucketIndex = getDigitNum(arr[k],i);
            buckets[bucketIndex].push(arr[k]);
        }
        // 目前已将所有元素放进对应的数字桶中，现在将其取出放在res中
        const res = [];
        // 双层遍历循环，依次取出元素放在res中
        // store是一个一个的桶，即数组
        buckets.forEach(store=>{
            store.forEach(ele=>{
                res.push(ele);
            })
        });

        arr = res;
    }

    return arr;
}

console.log(basicSort(test));