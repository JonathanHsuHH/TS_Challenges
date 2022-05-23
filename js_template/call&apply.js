/*
要点：
1.首先在Function.prototype中定义myCall和myApply函数，这样所有的function都可以直接调用myCall和myApply函数
2. 添加临时的fn属性，fn = this，执行fn()，然后delete fn接口
	3. call的参数是 目标对象(取代this)和一系列参数， 目标对象通过context来获取，一系列参数通过arguments来捕获
4.arguments 是一个对应于传递给函数的参数的类数组对象，通过 [].slice.call(arguments) 可以获取到参数Array列表
*/


Function.prototype.myCall = function( context = globalThis ) {
	// globalThis 是通过定义一个标准的全局属性来整合日益分散的访问全局对象的方法，浏览器环境下这个就是window, node.js环境下就是 Object [global]， web worker环境下是DedicatedWorkerGlobalScope 
	// 通过使用globalThis，你的代码将在 window 和非 window 上下文中工作，而无需编写额外的检查或测试。在大多数环境中，globalThis直接引用该环境的全局对象
	// 如果context传入为null的时候，就默认使用globalThis。 这里我们可以直接使用window也可以的
	
	// 给对象添加一个临时属性fn，其实就是调用myCall的函数，直接用this即可，用完之后再delete掉，这样就不会改变目标对象
	context.fn = this;
	// call的第二和后续参数是一个个的参数，需要组装成一个参数数组传入函数
	// [].slice.call(arguments)能将具有length属性的对象转成数组，可以加上一些参数
	// 因为arguments是一个对象而不是数组，最多算是一个伪数组，而且自身的原型链上也没有slice这个方法，所有不能直接用arguments.slice方法
	//  []自身也是也是一个Array对象.而数组原型链上有这个slice这个方法，[].slice === Array.prototype.slice，实际就是返回一个function，slice function，然后将其应用到arguments对象上，并且传入后面的参数们
	let args = [].slice.call(arguments, 1);
	let res = context.fn(...args);
	delete context.fn;
	return res;
}

Function.prototype.myApply = function( context = globalThis ) {
	context.fn = this;
	let res;
	// apply第二个参数是一个数组，采用...arguments[1]即可
	if (arguments[1]) {
		res = context.fn(...arguments[1]);
	} else {
		res = context.fn();
	}
	delete context.fn;
	return res;
}

// test

var employee1 = { firstName: "John", lastName: "Rodson" };
var employee2 = { firstName: "Jimmy", lastName: "Baily" };

function invite(greeting1, greeting2) {
  console.log(
    greeting1 + " " + this.firstName + " " + this.lastName + ", " + greeting2
  );
}

invite.myCall(employee1, "Hello", "How are you?"); // Hello John Rodson, How are you?
invite.myCall(employee2, "Hello", "How are you?"); // Hello Jimmy Baily, How are you?

invite.myApply(employee1, ["Hello", "How are you?"]); // Hello John Rodson, How are you?
invite.myApply(employee2, ["Hello", "How are you?"]); // Hello Jimmy Baily, How are you?
