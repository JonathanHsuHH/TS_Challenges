/*
Func new的过程，就是生成一个新的对象，这个对象：
	1. __proto__就是Func的prototype
	2. 在这个对象上执行Func函数，Func有返回值就拿Func的返回值作为输出，没有返回值就是拿这个对象本身作为输出(默认的返回值)
*/

function myNew(Func, ...args) {
	const instance = {};
	// instance and class use same prototype(parent clss)
	if (Func.prototype) {
		Object.setPropotypeOf(instance, Func.prototype)  // Object.setPrototypeOf() 方法设置一个指定的对象的原型 ( 即, 内部[[Prototype]]属性）到另一个对象或  null。
	}
	const res = Func.apply(instance, args); //apply construnctor of Func to instance, modify instance
	
	//这个地方判断的原因是，我们并不知道Func函数有没有return，如果有return，那么 Func.apply的返回值就是Func的return值，也就是我们需要的instance； 如果Func函数没有return，那么res就是undefined，此时我们需要返回instance对象，因为apply的时候instance会被改变
	if (typeof res === "function" || (typeof(res) === "object" && res !== null)) {
		return res;
	}
	return instance;
}

// test code
// 无返回值的Person函数
function Person(name) {
	this.name = name;
}
// 有返回值的Person函数
function PersonX(name) {
	this.name = name;
	return {
		name: this.name,
		sex: 'Male'
	}
}

Person.prototype.sayName = function() {
	console.log({name: this.name});
}

const me = myNew(Person, "Chao");
me.sayName();