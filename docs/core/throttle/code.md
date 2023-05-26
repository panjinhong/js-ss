# throttle

```javascript
function throttle(fun, delay) {
  let flag = true;
  return function (...args) {
    if (!flag) return;
    setTimeout(() => {
      fun.apply(this, ...args);
      flag = true;
    }, delay);
    flag = false;
  };
}
```