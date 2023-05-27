# promise

```javascript
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

const isFunction = (v) => typeof v === "function";
const isPromise = (v) => v !== null
  && ["object", "function"].includes(typeof v)
  && isFunction(v.then);
const supportQueueTask = isFunction(typeof queueMicrotask);

class MyPromise {
  #state = PENDING;
  #result = undefined;
  #thenCallback = [];
  constructor(executor) {
    const resolve = (data) => {
      this.#changeState(FULFILLED, data);
    }
    const reject = (error) => {
      this.#changeState(REJECTED, error);
    }
    if (!isFunction(executor)) {
      return;
    }
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  #changeState(state, data) {
    if (this.#state !== PENDING) return;
    this.#state = state;
    this.#result = data;
    this.#executeCallback();
  }

  #queueMicrotask(callback) {
    if (supportQueueTask) {
      queueMicrotask(callback)
    } else {
      if (isFunction(MutationObserver)) {
        const observe = new MutationObserver(callback);
        const node = document.createTextNode("0");
        observe.observe(node, { characterData: true });
        node.data = "1";
      } else {
        setTimeout(callback, 0);
      }
    }
  }

  #handler(callback, resolve, reject) {
    this.#queueMicrotask(() => {
      if (!isFunction(callback)) {
        this.#state === FULFILLED
          ? resolve(this.#result)
          : reject(this.#result);
        return;
      }
      try {
        const res = callback(this.#result);
        if (isPromise(res)) {
          res.then(this.#result);
        } else {
          resolve(res);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  #executeCallback() {
    if (this.#state === PENDING) return;
    while (this.#thenCallback.length) {
      const { onFulfilled, onRejected, resolve, reject }
        = this.#thenCallback.shift();
      if (this.#state === FULFILLED) {
        this.#handler(onFulfilled, resolve, reject);
      } else {
        this.#handler(onRejected, resolve, reject);
      } 
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#thenCallback.push({
        onFulfilled, onRejected, resolve, reject
      });
      this.#executeCallback();
    });
  }
}

```