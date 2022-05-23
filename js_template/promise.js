//如何实现异步任务的串行/并发，以异步加法为例
//1. 基于的异步加法函数
function asyncAdd(a, b, callback) {
    setTimeout(function() {
        callback(a + b, null)
    }, 500);
}

//callback是一个函数，第一个参数是加法执行成功的结果，第二个参数加法执行失败的结果

//2. 基于asyncAdd进行promise化，接收参数，返回一个Promise，resolve表示执行正常时返回的结果，reject表示执行遇到溢出时返回的结果
const promiseAdd = (a, b) => new Promise((resolve, reject) => {
    asyncAdd(a, b, (res, err)=> {
        //加法执行正常时，返回res，执行不正常时返回err
        if (res) {
            resolve(res);
        } else {
            reject(err);
        }
    });
});
//3. 参数列表串行处理
async function serialSum(...args) {
    return args.reduce(
        (task, now) => task.then(res => promiseAdd(res, now)), 
        Promise.resolve(0)
    );
}

/*每个参数都串行处理，一个一个参数的执行加法，逐个参数的then
reduce函数的初始值为Promise.resolve(0)，也就是一个固定返回0的promise
第一个参数的执行时候，task为Promise.resolve(0)，然后执行promiseAdd异步任务，就是将now和0相加，执行完成之后then得到结果
第二个参数执行的时候，task已经是执行过一次promiseAdd了，然后再针对这个参数执行promiseAdd，执行完成之后then得到结果
*/
// 4.  参数列表并行处理，相邻参数两两相加得到新的数组，然后再递归

async function parallelSum(...args) {
    if (args.length === 1) return args[0]
    const task =[];
    for (let i = 0; i < args.length; i+=2) {
        task.push(promiseAdd(args[i], args[i +1] || 0));
    }
    const results = await Promise.all(tasks);
    return parallelSum(...results);
}
