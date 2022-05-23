function throttle(func, ms = 1000) {
	let canRun = true;
	return function(...args) {
		if (!canRun) return;
		canRun = false;
		setTimeout(()=>{
			func.apply(this, args);
			canRun = ture;
		}, ms);
	}
}

//Test code

const task = ()=>{ console.log("run task") }
const throttleTask = throttle(task, 1000)
window.addEventListener("scroll", throttleTask)