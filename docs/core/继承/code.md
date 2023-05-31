# 继承

```javascript
// es6 class
class Parent {}
class Children extends Parent {}

// Object.setPrototypeOf();
// class 的 extends 语法相当于以下 方式的继承实现
function Parent() {}
function Children() {}
Object.setPrototypeOf(Children.prototype, Parent.prototype);

// 类式继承
function Parent() {
  this.parentValue = true;
}
Parent.prototype.getParentValue = function() {
  return this.parentValue;
}

function Children() {
  this.childrenValue = true;
}
Children.prototype = new Parent();
Children.prototype.getChildrenValue = function() {
  return this.childrenValue;
}

// 构造函数继承
function Parent(id) {
  this.books = ["html", "javascript"];
  this.id = id;
}
Parent.prototype.showBooks = function() {
  console.log(this.books);
}

function Children(id) {
  Parent.call(this, id);
  /**
   * 以上代码相当于执行以下代码, 所以创建的实例会拥有 books 和 id
   * 但是无法访问 showBooks
   * this.books = ["html", "javascript"];
   * this.id = id;
  */
}
const instance = new Children(1);
instance.books // ["html", "javascript"]
instance.id // 1
instance.showBooks() // showBooks is not a function

// 组合式继承
function Parent(id) {
  this.books = ["html", "javascript"];
  this.id = id;
}
Parent.prototype.showBooks = function() {
  console.log(this.books);
}

function Children(id, name) {
  Parent.call(this, id);
  this.name = name;
}

Children.prototype = new Parent();

const instance1 = new Children(1, "child1");
instance1.books.push("css");
instance.books // ["html", "javascript", "css"]
instance.id // 1
instance.showBooks() // ["html", "javascript", "css"]

const instance2 = new Children(2, "child2");
instance.books // ["html", "javascript"]
instance.id // 2
instance.showBooks() // ["html", "javascript"]

// 原型式继承
function inheritObject(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}

const book = {
  book: ["html", "javascript"]
};

const instance1 = inheritObject(book);
const instance2 = inheritObject(book);

instance1.book.push("css");
// 由于 book 是引用类型，所以会被影响
instance2.book // ["html", "javascript", "css"]

// 寄生式继承
const book = {
  book: ["html", "javascript"]
};

function createBook(obj) {
  const o = new inheritObject(obj);
  return o;
}

// 寄生组合式继承
function inheritObject(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}

function inheritPrototype(sub, super) {
  const p = inheritObject(super.prototype);
  p.constructor = sub;
  sub.prototype = p;
}

```