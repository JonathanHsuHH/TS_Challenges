class EventEmitter {
	constructor() {
		// event queue
		this.cache = {};
	}
	on(name, fn) {
		if (this.cache[name]) {
			this.cache[name].push(fn);
		} else {
			this.cache[name] = [fn];
		}
	}
	off(name, fn) {
		const tasks = this.cache[name];
		if (tasks) {
			// delete fn from tasks
			const idx = tasks.findIndex((f) => f === fn || f.callback === fn)
			if (idx >= 0) {
				tasks.splice(index, 1);
			}
		}
	}
	// trigger envet
	emit(name) {
		if (this.cache[name]) {
			const tasks = this.cache[name].slice(); // copy of tasks
			for (const fn of task) {
				fn();
			}
		}
	}
}
// test
const enventBus = new EventEmitter();
const task1 = () => {console.log("task1")};
const task2 = () => {console.log("task2")};
enventBus.on("task", task1);
enventBus.on("task", task2);

setTimeout(()=>{enventBus.emit('task')}, 1000)