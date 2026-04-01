function foo1(nums) {
    // 两个变量，一个是当前的候选元素
    // 另一个计数器记录票数
    var counter = 0;
    var cur = nums[0];
    // 由于大于半数，所有最终结果可和所有其它元素1v1，counter>0
    for (var i = 0; i < nums.length; i++) {
        // 如果循环元素和当前元素相同就计数器加1
        if (counter === 0) {
            cur = nums[i];
        }
        else {
            // counter！==0作比较
            if (nums[i] === cur) {
                counter++;
            }
            else {
                counter--;
            }
        }
    }
    return cur;
}
var test2 = [1, 2, 3, 4, 3, 3, 8, 3, 3, 3];
console.log(foo1(test2));
