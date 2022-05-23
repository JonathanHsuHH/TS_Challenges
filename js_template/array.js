/*1. 数组扁平化
const source = [1, 2, [3, 4, [5, 6]], 45, '4']
Output [1,2,3,4,5,6,45,4]*/

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

//2. 数组去重

//set方案
const res = Array.from(new Set(arr));

/*splice方案
两层循环，判断重复，然后 arr.splice(j, 1)来删除这个元素

indexOf/include方案，依次添加到res，如果res indexOf !== -1 或者 include为true，则已经包含元素了，则跳过

*/
//3. 类数组转成Array
//类数组是有length，但是没有Array属性的类型，例如函数的arguments, DOM操作方法返回的结果

[].slice.call(arguments);
//或者
[].concat.apply([], arguments);
//  []自身也是也是一个Array对象.而数组原型链上有这个slice这个方法，[].slice === Array.prototype.slice，实际就是返回一个function，slice function，然后将其应用到arguments对象上，并且传入后面的参数们

