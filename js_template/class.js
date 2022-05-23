/*Javascript继承的本质是prototype chain
函数的prototype对象，是一个特殊的对象，里面存在constuctor和供子类使用的method，一般 A.prototype.constructor = A;


function A extend function B的本质就是A.prototype <= B.prototype，然后A.prototype有自己单独的constructor（A）和子类自己的函数即可
A.prototype.construtor = A;
A.prototype.newfunc = …;
*/

function Parent(name) {
	this.name = name;
}
Parent.prototype.getName = function() {
	console.log(this.name);
}

// 产生一个新的prototype对象，完全复制proto对象
// 新建一个函数，此函数的prototype就是proto，然后这个函数new出一个对象实例，拿这个实例作为子函数的prototype, 返回的对象，其__proto__就是proto入参
function clonePrototype(proto) {
	function F() {}
	F.prototype = proto;
	return new F();
}

function Child(name, age) {
	Parent.call(this, name);
	this.age = age;
}
Child.prototype = clonePrototype(Parent.prototype);
// child prototype  constructor
Child.prototype.constructor = Child;
// child new method
Child.prototype.getAge = 
function() {
	console.log(this.age);
}

//test code
const child = new Child(15, "dd")
child.getName();
child.getAge();
