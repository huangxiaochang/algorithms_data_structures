// 寻找一颗树中的孩子节点

var  arr = [
	{
		id: 1,
		children: [
			{
				id: 11,
				children: [
					{
						id: 112
					}
				]
			}, 
			{
				id: 113
			}, 
			{
				id: 444,
				children: [
					{
						id: 55,
						children: [
							{
								id: 66
							}
						]
					}
				]
			}
		]
	}, 
	{
		id: 77
	}
]

// 深度优先遍历
function DFSGetChild (tree, child, res) {
	var res = res || [],
			item = null,
			hasFind = false;

	for(var i = 0 ; i < tree.length; i++) {
		item = tree[i]
		res.push(item.id)
		if (item.id === child) {
			hasFind = true
			break
		}

		if (item.children && item.children.length !== 0) {
			hasFind = DFSGetChild(item.children, child, res)
			if (hasFind) {
				break
			} else {
				res.pop()
			}
		} else {
			res.pop()
		}
	}

	return hasFind

}

// 广度优先
function BFSGetChild (tree, child) {
	var stack = [],
			item = null;

	stack.push({
		children: tree,
		path: []
	})

	while(stack.length) {
		var parent = stack.shift()
		var children = parent.children
		var path = parent.path
		for(var i = 0 ; i < children.length; i++) {
			item = children[i]

			if (item.id === child) {
				path.push(item.id)
				return path
			}

			if (item.children && item.children.length !== 0) {

				stack.push({
					children: item.children,
					path: path.concat(item.id)
				})
			}
		}
	}

	return []
}

var res = []

console.log(BFSGetChild(arr, 66))

DFSGetChild(arr, 66, res)
console.log(res)

function fn(value) {
    // 回溯的标记
    let _p = Symbol('parent');
    // 找到子节点
    let result;
    function _fn(ar, p) {
        for (let i = 0; i < ar.length; i++) {
            ar[i][_p] = p;
            if (ar[i].id === value) {
                result = ar[i];
                return;
            }
            !result && ar[i].children && _fn(ar[i].children, ar[i])
        }
        if (result) return;
    }
    _fn(arr, null);
    let tmp = [];
    if (!result) return null;
    while (result) {
        tmp.unshift(result.id);
        result = result[_p];
    }
    return tmp;
}

console.log(fn(113))