# call

```javascript
Function.prototype.myCall = function(ctx, ...args) {
  ctx = ctx || window;
  ctx.fn = this;
  args = args || [];
  const res = ctx.fn(...args);
  delete ctx.fn;
  return res;
}
```