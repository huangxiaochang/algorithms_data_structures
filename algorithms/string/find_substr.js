// 子串查找的kmp算法

// 模式串的next生成, 看成是一个模式串也是主串的匹配过程。
// 算法思路:
// 	1. next[1] = 0
// 	2. 令next[j] = k,则表明p1p2...p(k-1) == p(j-k+1)p(j-k+2)...p(j-1)
// 	3. 当pk == pj时，则表明p1p2...pk == p(j-k+1)p(j-k+2)...pj,那么next[j+1] = k + 1
// 			所以next[j+1] = next[k] + 1
// 	4. 当pk!=pj时，则表明p1p2...pk != p(j-k+1)p(j-k+2)...pj。此时求next函数值时，可以看成是一个
// 	   模式匹配，整个模式串即是主串，也是模式串。已有p1==pj-k+1,p2==pj-k+2,...,pk-1=pj-1,则当pj!=
// 	   pk时，应将模式串右移至模式串中的第next[k]个字符和主串第j个字符进行比较。若next[k] = k',且pj==
// 	   pk',则说明主串中第j+1个字符之前存在一个长度为k'的最长子串，和模式串从首字符开始长度为k'的子串
// 	   相等，即p1p2...pk' == pj-k'+1pj-k'+2...pj。所以next[j+1] = k' + 1, 即next[j+1] = next[k] +1,
// 	   同理，如果pj != pk', 则将模式串继续右移至将模式第next[k']个字符和pj对齐比较，依次类推，直到pj
// 	   和模式串中某个字符匹配成功或者不存在任何k',那么这时next[j+1] = 1。
function get_next (substr) {
	var next = [], j = 0, i = 1;
	// next[1] = 0 -> 即第一位不匹配时，模式串和主串都要右移以为
	next[1] = 0
	while ( i < substr.length) {
		// 当j回退到0时，即第一位字符都不匹配时，主串和模式串都要右移
		if (j === 0 || substr[i-1] === substr[j - 1]) { 
			++i
			++j
			// next[i] = j
			// 优化 aaaaab这种情况
			if (substr[i - 1] !== substr[j - 1]) {
				next[i] = j
			} else {
				next[i] = next[j]
			}
		} else {
			j = next[j]
		}
	}
	return next
}

console.log(get_next('abaabcac'))

function find_substr(str, substr) {
	var next = get_next(substr)
	var i = 1 , j = 1;
	while ( i <= str.length && j <= substr.length) {
		if (j === 0 || str[i-1] === substr[j-1]) {
			i++
			j++
		} else {
			j = next[j]
		}
	}
	if (j > substr.length) {
		return i - j
	} else {
		return -1
	}
}

module.exports = {
	find_substr
}