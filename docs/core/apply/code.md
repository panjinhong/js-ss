# apply

```javascript
Function.prototype.myApply = function(ctx, args) {
  ctx = ctx || window;
  ctx.fn = this;
  args = args || [];
  const res = ctx.fn(...args);
  delete ctx.fn;
  return res;
}
```