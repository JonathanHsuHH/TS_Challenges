// 规定时间内只会执行一次，如果时间内存在多处操作，那么会合并成一次操作（不同于节流，节流只是控制两次操作间的最短间隔）
// 这次操作可以是立即触发（然后规定时间内不触发）， 也可以是延迟触发（规定时间内有新触发时，继续延时定时器）

//debounce exec delay

function debounceDelay(func, ms = 1000) {
	let timer;
	return function(...args){
		if (timer) {
			clearTimeout(timer);
		}
		// func函数应该是non-method function，不包含constructor那种
		timer = setTimeout(()=> {
			func.apply(this, args)},  // 或者func(args)
			ms);
	}
}

//debounce exec now

function debounceNow(func, ms = 1000) {
	let timer;
	return function(...args){
		if (timer) {
			clearTimeout(timer);
		}
		let callNow = !timer;
		timer = setTimeout(()=> {timer = null, ms});
		if (callNow) {
			func.apply(this, args)
        };
	}
}

//Test code

const task = ()=>{ console.log("run task") }
const deboundTask = debounceDelay(task, 1000)
window.addEventListener("scroll", deboundTask)