// 洗牌模块

function sortRandom(arr){
    // 获得一个打乱顺序的数组
    return arr.sort(()=>Math.random()-0.5);
}

// 到处该模块，用于洗牌
exports.sortRandom = sortRandom;