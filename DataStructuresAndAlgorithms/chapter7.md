# 字典和散列表

## 字典

集合表示一组互不相同的元素(不重复的元素)。在字典中，存储的是 [键, 值] 对，其中键名是用来查询特定的元素的。字典和集合很相似，集合以 [值, 值] 的形式存储元素，字典是以 [键, 值] 的形式来存储元素。字典也称作映射。(类似 Map 可以将非字符串当作属性)

创建字典：

```js
class ValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
  toString() {
    return `[#${this.key}: ${this.value}]`;
  }
}
// toString
function defaultToString(item) {
  if (item === null) {
    return 'NULL';
  } else if (item === undefined) {
    return 'UNDEFINED';
  } else if (typeof item === 'string' || item instanceof String) {
    return `${item}`;
  }
  return item.toString();
}

class Dictionary {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }
  set(key, value) {
    if (key != null && value != null) {
      const tableKey = this.toStrFn(key);
      this.table[tableKey] = new ValuePair(key, value); // 注意这里添加新的属性 table: {name: {key: 'name', value: 123}}
      return true;
    }
    return false;
  }
  get(key) {
    const valuePair = this.table[this.toStrFn(key)];
    return valuePair == null ? undefined : valuePair.value;
  }
  hasKey(key) {
    return this.table[this.toStrFn(key)] != null;
  }
  remove(key) {
    if (this.hasKey(key)) {
      delete this.table[this.toStrFn(key)];
      return true;
    }
    return false;
  }
  values() {
    return this.keyValues().map(valuePair => valuePair.value);
  }
  keys() {
    return this.keyValues().map(valuePair => valuePair.key);
  }
  keyValues() {
    return Object.values(this.table);
  }
  forEach(callbackFn) {
    const valuePairs = this.keyValues();
    for (let i = 0; i < valuePairs.length; i++) {
      const result = callbackFn(valuePairs[i].key, valuePairs[i].value);
      if (result === false) {
        break;
      }
    }
  }
  isEmpty() {
    return this.size() === 0;
  }
  size() {
    return Object.keys(this.table).length;
  }
  clear() {
    this.table = {};
  }
  toString() {
    if (this.isEmpty()) {
      return '';
    }
    const valuePairs = this.keyValues();
    let objString = `${valuePairs[0].toString()}`;
    for (let i = 1; i < valuePairs.length; i++) {
      objString = `${objString},${valuePairs[i].toString()}`;
    }
    return objString;
  }
}
```

使用字典：

```js
const dictionary = new Dictionary();

dictionary.set('Gandalf', 'gandalf@email.com');
dictionary.set('John', 'johnsnow@email.com');
dictionary.set('Tyrion', 'tyrion@email.com');

console.log(dictionary.hasKey('Gandalf')); // true
console.log(dictionary.size()); // 3

console.log(dictionary.keys()); // ["Gandalf", "John", "Tyrion"]
console.log(dictionary.values()); // ["gandalf@email.com", "johnsnow@email.com", "tyrion@email.com"]
console.log(dictionary.get('Tyrion')); // tyrion@email.com

dictionary.remove('John');

console.log(dictionary.keys()); // ["Gandalf", "Tyrion"]
console.log(dictionary.values()); // ["gandalf@email.com", "tyrion@email.com"]

console.log(dictionary.keyValues()); // [{key: "Gandalf", value: "gandalf@email.com"}, {key: "Tyrion", value: "tyrion@email.com"}]
console.log(dictionary.toString()); // [#Gandalf: gandalf@email.com],[#Tyrion: tyrion@email.com]

dictionary.forEach((k, v) => {
  console.log('forEach: ', `key: ${k}, value: ${v}`);
});
// forEach:  key: Gandalf, value: gandalf@email.com
// forEach:  key: Tyrion, value: tyrion@email.com
```

## 散列表

散列表是 字典类 中的一种散列表实现方式。

散列算法的作用是尽可能 快 的在数据结构中找到一个值。(类似 WeakMap)

```js
class ValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
  toString() {
    return `[#${this.key}: ${this.value}]`;
  }
}
// toString
function defaultToString(item) {
  if (item === null) {
    return 'NULL';
  } else if (item === undefined) {
    return 'UNDEFINED';
  } else if (typeof item === 'string' || item instanceof String) {
    return `${item}`;
  }
  return item.toString();
}

class HashTable {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }
  // 散列函数：给定一个 key 值，根据组成 key 的每个字符的 ASCII 码值的和得到一个数字
  loseloseHashCode(key) {
    if (typeof key === 'number') {
      return key;
    }
    const tableKey = this.toStrFn(key);
    let hash = 0;
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i);
    }
    return hash % 37;
  }
  // 作用同上边的 loseloseHashCode，冲突更少
  /* djb2HashCode(key) {
    const tableKey = this.toStrFn(key);
    let hash = 5381;
    for (let i = 0; i < tableKey.length; i++) {
      hash = (hash * 33) + tableKey.charCodeAt(i);
    }
    return hash % 1013;
  } */
  hashCode(key) {
    return this.loseloseHashCode(key);
  }
  // 添加或更新一个新的项
  put(key, value) {
    if (key != null && value != null) {
      const position = this.hashCode(key);
      this.table[position] = new ValuePair(key, value); // table {3232: {key: 'name', value: '4354'}} 其中 3232 是通过 loseloseHashCode 计算出来的
      return true;
    }
    return false;
  }
  get(key) {
    const valuePair = this.table[this.hashCode(key)];
    return valuePair == null ? undefined : valuePair.value;
  }
  remove(key) {
    const hash = this.hashCode(key);
    const valuePair = this.table[hash];
    if (valuePair != null) {
      delete this.table[hash];
      return true;
    }
    return false;
  }
  getTable() {
    return this.table;
  }
  isEmpty() {
    return this.size() === 0;
  }
  size() {
    return Object.keys(this.table).length;
  }
  clear() {
    this.table = {};
  }
  toString() {
    if (this.isEmpty()) {
      return '';
    }
    const keys = Object.keys(this.table);
    let objString = `{${keys[0]} => ${this.table[keys[0]].toString()}}`;
    for (let i = 1; i < keys.length; i++) {
      objString = `${objString},{${keys[i]} => ${this.table[keys[i]].toString()}}`;
    }
    return objString;
  }
}
```

使用散列表：

```js
const hash = new HashTable();

console.log(hash.hashCode('Gandalf') + ' - Gandalf');
console.log(hash.hashCode('John') + ' - John');
console.log(hash.hashCode('Tyrion') + ' - Tyrion');

console.log(' ');

console.log(hash.hashCode('Ygritte') + ' - Ygritte');
console.log(hash.hashCode('Jonathan') + ' - Jonathan');
console.log(hash.hashCode('Jamie') + ' - Jamie');
console.log(hash.hashCode('Jack') + ' - Jack');
console.log(hash.hashCode('Jasmine') + ' - Jasmine');
console.log(hash.hashCode('Jake') + ' - Jake');
console.log(hash.hashCode('Nathan') + ' - Nathan');
console.log(hash.hashCode('Athelstan') + ' - Athelstan');
console.log(hash.hashCode('Sue') + ' - Sue');
console.log(hash.hashCode('Aethelwulf') + ' - Aethelwulf');
console.log(hash.hashCode('Sargeras') + ' - Sargeras');

hash.put('Ygritte', 'ygritte@email.com');
hash.put('Jonathan', 'jonathan@email.com');
hash.put('Jamie', 'jamie@email.com');
hash.put('Jack', 'jack@email.com');
hash.put('Jasmine', 'jasmine@email.com');
hash.put('Jake', 'jake@email.com');
hash.put('Nathan', 'nathan@email.com');
hash.put('Athelstan', 'athelstan@email.com');
hash.put('Sue', 'sue@email.com');
hash.put('Aethelwulf', 'aethelwulf@email.com');
hash.put('Sargeras', 'sargeras@email.com');

console.log('**** Printing Hash **** ');

console.log(hash.toString());
// {4 => [#Ygritte: ygritte@email.com]},{5 => [#Aethelwulf: aethelwulf@email.com]},{7 => [#Athelstan: athelstan@email.com]},{8 => [#Jasmine: jasmine@email.com]},{9 => [#Jake: jake@email.com]},{10 => [#Sargeras: sargeras@email.com]}

console.log('**** Get **** ');

console.log(hash.get('Ygritte')); // ygritte@email.com
console.log(hash.get('Loiane')); // jasmine@email.com

console.log('**** Remove **** ');

hash.remove('Ygritte');
console.log(hash.get('Ygritte')); // undefined

console.log(hash.toString());
// {5 => [#Aethelwulf: aethelwulf@email.com]},{7 => [#Athelstan: athelstan@email.com]},{8 => [#Jasmine: jasmine@email.com]},{9 => [#Jake: jake@email.com]},{10 => [#Sargeras: sargeras@email.com]}
```

通过使用发现一些键会有相同的散列值。例如 Jonathan，Jamie，Sue 的 hashCode 都为 5，这样就会造成一些冲突和覆盖。

下面的分离链接和线性探查都可以解决这个问题。

### 分离链接

分离链接法包括为散列表的每一个位置创建一个链表并将元素存储在里面。

```js
import LinkedList from 'linked-list'; // 这里是第五章中的链表 LinkedList：chapter5 => es6 实现 普通链表

// toString
function defaultToString(item) {
  if (item === null) {
    return 'NULL';
  } else if (item === undefined) {
    return 'UNDEFINED';
  } else if (typeof item === 'string' || item instanceof String) {
    return `${item}`;
  }
  return item.toString();
}

class ValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
  toString() {
    return `[#${this.key}: ${this.value}]`;
  }
}
// 分离链接
class HashTableSeparateChaining {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }
  loseloseHashCode(key) {
    if (typeof key === 'number') {
      return key;
    }
    const tableKey = this.toStrFn(key);
    let hash = 0;
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i);
    }
    return hash % 37;
  }
  hashCode(key) {
    return this.loseloseHashCode(key);
  }
  put(key, value) {
    if (key != null && value != null) {
      const position = this.hashCode(key);
      // 注意这里创建分离链接，引用了 链表，将每个属性存储为一个链表
      if (this.table[position] == null) {
        this.table[position] = new LinkedList();
      }
      this.table[position].push(new ValuePair(key, value));
      return true;
    }
    return false;
  }
  get(key) {
    const position = this.hashCode(key);
    const linkedList = this.table[position];
    if (linkedList != null && !linkedList.isEmpty()) {
      let current = linkedList.getHead();
      while (current != null) {
        if (current.element.key === key) {
          return current.element.value;
        }
        current = current.next;
      }
    }
    return undefined;
  }
  remove(key) {
    const position = this.hashCode(key);
    const linkedList = this.table[position];
    if (linkedList != null && !linkedList.isEmpty()) {
      let current = linkedList.getHead();
      while (current != null) {
        if (current.element.key === key) {
          linkedList.remove(current.element);
          if (linkedList.isEmpty()) {
            delete this.table[position];
          }
          return true;
        }
        current = current.next;
      }
    }
    return false;
  }
  isEmpty() {
    return this.size() === 0;
  }
  size() {
    let count = 0;
    Object.values(this.table).forEach(linkedList => {
      count += linkedList.size();
    });
    return count;
  }
  clear() {
    this.table = {};
  }
  getTable() {
    return this.table;
  }
  toString() {
    if (this.isEmpty()) {
      return '';
    }
    const keys = Object.keys(this.table);
    let objString = `{${keys[0]} => ${this.table[keys[0]].toString()}}`;
    for (let i = 1; i < keys.length; i++) {
      objString = `${objString},{${keys[i]} => ${this.table[
        keys[i]
      ].toString()}}`;
    }
    return objString;
  }
}
```

### 线性探查

当想向表中某个位置加入一个新元素的时候，如果索引为 index 的位置已经被占据了，就尝试 index+1 的位置，如果 index+1 的位置也被占据了，就尝试 index+2 的位置，以此类推。

```js
// toString
function defaultToString(item) {
  if (item === null) {
    return 'NULL';
  } else if (item === undefined) {
    return 'UNDEFINED';
  } else if (typeof item === 'string' || item instanceof String) {
    return `${item}`;
  }
  return item.toString();
}

class ValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
  toString() {
    return `[#${this.key}: ${this.value}]`;
  }
}
// 线性探查
class HashTableLinearProbing {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }
  loseloseHashCode(key) {
    if (typeof key === 'number') {
      return key;
    }
    const tableKey = this.toStrFn(key);
    let hash = 0;
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i);
    }
    return hash % 37;
  }
  hashCode(key) {
    return this.loseloseHashCode(key);
  }
  put(key, value) {
    if (key != null && value != null) {
      const position = this.hashCode(key);
      if (this.table[position] == null) {
        this.table[position] = new ValuePair(key, value);
      } else {
        let index = position + 1;
        while (this.table[index] != null) {
          index++;
        }
        this.table[index] = new ValuePair(key, value);
      }
      return true;
    }
    return false;
  }
  get(key) {
    const position = this.hashCode(key);
    if (this.table[position] != null) {
      if (this.table[position].key === key) {
        return this.table[position].value;
      }
      // 如果相同的 hashCode 不是，就往后找找
      let index = position + 1;
      while (this.table[index] != null && this.table[index].key !== key) {
        index++;
      }
      if (this.table[index] != null && this.table[index].key === key) {
        return this.table[position].value;
      }
    }
    return undefined;
  }
  remove(key) {
    const position = this.hashCode(key);
    if (this.table[position] != null) {
      if (this.table[position].key === key) {
        delete this.table[position];
        this.verifyRemoveSideEffect(key, position);
        return true;
      }
      let index = position + 1;
      while (this.table[index] != null && this.table[index].key !== key) {
        index++;
      }
      if (this.table[index] != null && this.table[index].key === key) {
        delete this.table[index];
        this.verifyRemoveSideEffect(key, index);
        return true;
      }
    }
    return false;
  }
  verifyRemoveSideEffect(key, removedPosition) {
    const hash = this.hashCode(key);
    let index = removedPosition + 1;
    while (this.table[index] != null) {
      const posHash = this.hashCode(this.table[index].key);
      if (posHash <= hash || posHash <= removedPosition) {
        this.table[removedPosition] = this.table[index];
        delete this.table[index];
        removedPosition = index;
      }
      index++;
    }
  }
  isEmpty() {
    return this.size() === 0;
  }
  size() {
    return Object.keys(this.table).length;
  }
  clear() {
    this.table = {};
  }
  getTable() {
    return this.table;
  }
  toString() {
    if (this.isEmpty()) {
      return '';
    }
    const keys = Object.keys(this.table);
    let objString = `{${keys[0]} => ${this.table[keys[0]].toString()}}`;
    for (let i = 1; i < keys.length; i++) {
      objString = `${objString},{${keys[i]} => ${this.table[
        keys[i]
      ].toString()}}`;
    }
    return objString;
  }
}
```

## ES6 Map 类

```js
const map = new Map();

map.set('Gandalf', 'gandalf@email.com');
map.set('John', 'johnsnow@email.com');
map.set('Tyrion', 'tyrion@email.com');

console.log(map.has('Gandalf')); // true
console.log(map.size); // 3

console.log(map.keys()); // MapIterator {"Gandalf", "John", "Tyrion"}
console.log(map.values()); // MapIterator {"gandalf@email.com", "johnsnow@email.com", "tyrion@email.com"}
console.log(map.get('Tyrion')); // tyrion@email.com

map.delete('John');

console.log(map.keys()); // MapIterator {"Gandalf", "Tyrion"}
console.log(map.values()); // MapIterator {"gandalf@email.com", "tyrion@email.com"}
```

## WeakMap 类

```js
const map = new WeakMap();

const ob1 = { name: 'Gandalf' };
const ob2 = { name: 'John' };
const ob3 = { name: 'Tyrion' };

map.set(ob1, 'gandalf@email.com');
map.set(ob2, 'johnsnow@email.com');
map.set(ob3, 'tyrion@email.com');

console.log(map.has(ob1)); // true
console.log(map.has(ob2)); // true
console.log(map.has(ob3)); // true

console.log(map.get(ob3)); // tyrion@email.com

map.delete(ob2);
console.log(map.has(ob2)); // false
```

## WeakSet 类

```js
var set = new WeakSet();

const ob1 = { name: 'Gandalf' };
const ob2 = { name: 'John' };
const ob3 = { name: 'Tyrion' };

set.add(ob1);
set.add(ob2);
set.add(ob3);

console.log(set.has(ob1)); // true
console.log(set.has(ob2)); // true
console.log(set.has(ob3)); // true

set.delete(ob2);
console.log(set.has(ob2)); // false
```