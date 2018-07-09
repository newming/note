# 集合

集合是由一组无序且唯一(即不能重复)的项组成的。

## 创建集合

```js
class Set {
  constructor() {
    this.items = {}; // 这里使用对象是因为 对象的一个键不可以指向两个不同的属性，保证了集合里的元素都是唯一的
  }
  add(element) {
    if (!this.has(element)) {
      this.items[element] = element;
      return true;
    }
    return false;
  }
  delete(element) {
    if (this.has(element)) {
      delete this.items[element];
      return true;
    }
    return false;
  }
  has(element) {
    return Object.prototype.hasOwnProperty.call(this.items, element);
  }
  values() {
    return Object.values(this.items);
  }
  // 并集 A U B 存在于 A 或 B 中
  union(otherSet) {
    const unionSet = new Set();
    this.values().forEach(value => unionSet.add(value));
    otherSet.values().forEach(value => unionSet.add(value));
    return unionSet;
  }
  // 交集 A n B 表示 A B 中同时存在
  intersection(otherSet) {
    const intersectionSet = new Set();
    const values = this.values();
    const otherValues = otherSet.values();
    // 拿小的数组去大的数组里查找，减少遍历次数
    let biggerSet = values;
    let smallerSet = otherValues;
    if (otherValues.length - values.length > 0) {
      biggerSet = otherValues;
      smallerSet = values;
    }
    smallerSet.forEach(value => {
      if (biggerSet.includes(value)) {
        intersectionSet.add(value);
      }
    });
    return intersectionSet;
  }
  // 差集 A-B 只存在于 A 中，且不存在于 B 中
  difference(otherSet) {
    const differenceSet = new Set();
    this.values().forEach(value => {
      if (!otherSet.has(value)) {
        differenceSet.add(value);
      }
    });
    return differenceSet;
  }
  // 子集，A中的每一个元素都存在于B中
  isSubsetOf(otherSet) {
    if (this.size() > otherSet.size()) {
      return false;
    }
    let isSubset = true;
    this.values().every(value => {
      if (!otherSet.has(value)) {
        isSubset = false;
        return false;
      }
      return true;
    });
    return isSubset;
  }
  isEmpty() {
    return this.size() === 0;
  }
  size() {
    return Object.keys(this.items).length;
  }
  clear() {
    this.items = {};
  }
  toString() {
    if (this.isEmpty()) {
      return '';
    }
    const values = this.values();
    let objString = `${values[0]}`;
    for (let i = 1; i < values.length; i++) {
      objString = `${objString},${values[i].toString()}`;
    }
    return objString;
  }
}
```

使用：

```js
// 基本操作
const set = new Set();
set.add(1);
console.log(set.values()); // outputs [1]
console.log(set.has(1)); // outputs true
console.log(set.size()); // outputs 1

set.add(2);
console.log(set.values()); // outputs [1, 2]
console.log(set.has(2)); // true
console.log(set.size()); // 2

set.delete(1);
console.log(set.values()); // outputs [2]

set.delete(2);
console.log(set.values()); // outputs []

// --------- Union 并集 ----------
let setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);

let setB = new Set();
setB.add(3);
setB.add(4);
setB.add(5);
setB.add(6);

const unionAB = setA.union(setB);
console.log(unionAB.values()); // [1, 2, 3, 4, 5, 6]

// --------- Intersection 交集 ----------
setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);

setB = new Set();
setB.add(2);
setB.add(3);
setB.add(4);

const intersectionAB = setA.intersection(setB);
console.log(intersectionAB.values()); // [2, 3]

// --------- Difference 差集 ----------
setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);

setB = new Set();
setB.add(2);
setB.add(3);
setB.add(4);

const differenceAB = setA.difference(setB);
console.log(differenceAB.values()); // [1]

// --------- Subset 子集 ----------
setA = new Set();
setA.add(1);
setA.add(2);

setB = new Set();
setB.add(1);
setB.add(2);
setB.add(3);

const setC = new Set();
setC.add(2);
setC.add(3);
setC.add(4);

console.log(setA.isSubsetOf(setB)); // true
console.log(setA.isSubsetOf(setC)); // false
```

## 使用 ES6 新增的原生 Set 类

```js
const set = new Set();

set.add(1);
console.log(set.values()); // outputs @Iterator
console.log(set.has(1)); // outputs true
console.log(set.size); // outputs 1

set.add(2);
console.log(set.values()); // outputs [1, 2]
console.log(set.has(2)); // true
console.log(set.size); // 2

set.delete(1);
console.log(set.values()); // outputs [2]

set.delete(2);
console.log(set.values()); // outputs []

const setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);

const setB = new Set();
setB.add(2);
setB.add(3);
setB.add(4);

// --------- Union 并集 ----------
const union = (set1, set2) => {
  const unionAb = new Set();
  set1.forEach(value => unionAb.add(value));
  set2.forEach(value => unionAb.add(value));
  return unionAb;
};
console.log(union(setA, setB));

console.log(new Set([...setA, ...setB]));

// --------- Intersection 交集 ----------
const intersection = (set1, set2) => {
  const intersectionSet = new Set();
  set1.forEach(value => {
    if (set2.has(value)) {
      intersectionSet.add(value);
    }
  });
  return intersectionSet;
};
console.log(intersection(setA, setB));

console.log(new Set([...setA].filter(x => setB.has(x))));

// alternative - works on FF only
// console.log(new Set([x for (x of setA) if (setB.has(x))]));

// --------- Difference 差集 ----------
const difference = (set1, set2) => {
  const differenceSet = new Set();
  set1.forEach(value => {
    if (!set2.has(value)) {
      differenceSet.add(value);
    }
  });
  return differenceSet;
};
console.log(difference(setA, setB));

console.log(new Set([...setA].filter(x => !setB.has(x))));

// alternative  - works on FF only
// console.log(new Set([x for (x of setA) if (!setB.has(x))]));
```