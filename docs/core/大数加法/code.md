# 大数加法

```javascript
function largeNumberAdd(a, b) {
  let maxLength = Math.max(a.length, b.length);
  a = a.padStart(maxLength, "0");
  b = b.padStart(maxLength, "0");
  let carryNumber = 0;
  let result = "";
  for (let i = maxLength - 1; i >= 0; i--) {
    const sum = Number(a[i]) + Number(b[i]) + carryNumber;
    carryNumber = Math.floor(sum / 10);
    result = (sum % 10) + result;
  }
  return carryNumber ? 1 + result : result;
}

const a = "111";
const b = "10000000000000000000";

// test
console.log(largeNumberAdd(a, b));
// 10000000000000000111
```