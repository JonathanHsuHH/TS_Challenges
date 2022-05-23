// IIFE函数(Immediately Invoked Function Expression)
const Singleton = (function() {
    let instance: Object;

    function createInstance() {
        const object = {
            name: "I was instance at: " + new Date().toLocaleString()
        };
        return object;
    }

    function getInstance() {
        if (!instance) {
            instance = createInstance();
        }
        return instance;
    }

    return {
        getInstance: getInstance
    };
})();

// Singleton.getInstance always return same object
// Singleton constructor will return an object, with one function attribute (getInstance)

export function runSingleton() {
    const instance1 = Singleton.getInstance();
    return instance1;
}