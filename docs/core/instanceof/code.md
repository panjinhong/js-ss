# instanceof

```javascript
// symbol
function myInstanceof(instance, Constructor) {
  return Constructor[Symbol.hasInstance](instance);
}

// __proto__
function myInstanceof(instance, Constructor) {
  const proto = Constructor.prototype;
  let _proto_ = instance.__proto__;
  for(;;) {
    if (_proto_ === null) {
      return false;
    }
    if (_proto_ === proto) {
      return true;
    }
    _proto_ = _proto_.__proto__;
  }
}

// Object.getPrototypeOf()
function myInstanceof(instance, Constructor) {
  const proto = Constructor.prototype;
  let _proto_ = Object.getPrototypeOf(instance);
  for(;;) {
    if (_proto_ === null) {
      return false;
    }
    if (_proto_ === proto) {
      return true;
    }
    _proto_ = Object.getPrototypeOf(_proto_);
  }
}
```