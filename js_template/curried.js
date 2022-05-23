/*
sum这个函数接受三个参数，使用时必须 sum(1, 2, 3)才可以
柯里化的目标是可以让多个参数通过嵌套调用的方式来实现目标，例如 sum(1)(2)(3)

通过一个函数 curry，来将sum转换成csum，这个curry函数就是柯里化函数，接受一个普通函数，返回一个柯里化之后的函数 
*/

function sum(a, b, c) {
	return a + b + c;
}

function curry(func) {
	// 返回新的函数，新函数参数数量小于func参数数量时，就返回一个新的函数，继续接收剩余的参数，大于等于func参数数量时，直接调用func即可
	return function csum(...args) {
		// func.length可以直接获取原始函数的参数个数，例如 sum.length = 3
		if (args.length >= func.length) {
			return func.apply(this, args);
		} else {
			// 只传入部分参数时，返回新的函数，继续接收参数，然后将参数数量合并去调用csum，直到csum的参数个数大于等于func原始参数个数为止
			return function (...args2) {
				return csum(args.concat(args2));
			}
		}
	}
}

csum = curry(sum)
csum(1)(2)(3) === 6;