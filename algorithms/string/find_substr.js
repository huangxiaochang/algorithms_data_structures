// 子串查找的kmp算法

// 模式串的next生成
function get_next (substr) {
	var next = [], j = 0, i = 1;
	next[1] = 0
	while ( i < substr.length) {
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