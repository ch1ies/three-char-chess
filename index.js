// 一个长度足够长，只包含数字的数组中，找出三个元素之和为指定数n的各个组合
/**
 * 
 * @param {*} arr 给定长度的数组
 * @param {*} n  指定的数值大小n
 * 1. 先排序
 * 2. 双指针思想
 */
function findComp (arr, n) {
    if (!n || arr.length < 3) return
    let result = []
    arr.sort((a, b) => a -b) // 数组按照升序排列
    for (let i = 0; i< arr.length; i++) {
        let l = i + 1
        let R = arr.length -1
        while(l < R) {
            let sum = arr[i] + arr[l] + arr[R]
            console.log(sum, '------')
            if (sum === n) {
                console.log('execute------')
                let temp = []
                temp.push(arr[i],arr[l],arr[R])
                result.push(temp)
                l++
                R--
            }
        }
    }
    return result
}
console.log(findComp([1,23,12,3,1,2,3,12,3,12,41,24,12,1],14))
console.log('1212')