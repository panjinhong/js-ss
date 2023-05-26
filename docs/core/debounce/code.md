# debounce

```javascript
function debounce(fun, delay = 300) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fun.apply(this, ...args);
    }, delay)
  }
}
```