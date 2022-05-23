/*
当前class的实例：
对象的__proto__
klass的prototype应该是同一个

父class的实例
对象的__proto__.__proto__一直递归，应该是klass的prototype
*/
function isinstanceof(instance, klass) {
	iproto = instance.__proto__;
	kproto = klass.prototype;
	while (iproto) {
		if (iproto === kproto) {
			return true;
		}
		Iproto = iproto.__proto__
	}
	return false;
}