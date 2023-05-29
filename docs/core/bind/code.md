# bind

```javascript
Function.prototype.myBind = function (ctx, ...args) {
  const fn = this;
  args = args || [];
  return function (...args2) {
    return fn.apply(ctx, [...args, ...args2]);
  }
}
```