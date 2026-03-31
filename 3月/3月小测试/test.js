var test = [3, 0, 11, 3, 8];
function sort(arr) {
    var min = arr[0];
    // 外层循环控制
    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[i]) {
                var temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}
console.log(sort(test));
