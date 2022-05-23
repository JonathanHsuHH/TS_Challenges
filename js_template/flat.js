//数组扁平化
//const source = [1, 2, [3, 4, [5, 6]], 45, '4']
//Output [1,2,3,4,5,6,45,4]

//直接调用函数
source.flat(Infinity)

//递归方案
function recurFlat(ary = []) {
	const res =[]
	ary.foreach( item => {
		if (Array.isArray(item)) {
			res.push(...recuFlat(item))
		} else {
			res.push(item)
		}
	})
	return res;
}

//reduce递归方案
function reduceFlat(ary = []) {
	return ary.reduce((res, item) => res.concat(Array.isArray(item) ? reduceFlat(item) : item), [])
}

//对象扁平化
//const source = {a : {b : {c :1, d:2}, e: 3}, f: {g: 2}}
//output {a: {1, 2}, b: {1,2}, c:1, d:2 ,e:3, f:2, g:2}

/*/递归方案, 关键是需要给每个元素一个newKey
另外如何get object中所有元素， Object.entries(item)
如何判断元素是否是另外一个object,  typeof val === 'object'*/

function objectFlat(obj = {}) {
	const res={};
	function flat(item, preKey='') {
		Object.entries(item).forEach(([key,val]) => {
			const newKey = preKey ? `${preKey}.${key} ` : key
			if (val && typeof val ==='object') {
				flat(val, newKey)
			} else {
				res[newKey] =val
			}
		})
	}
	flat(obj)
	return res
}