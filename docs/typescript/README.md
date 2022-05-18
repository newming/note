# TypeScript

- [ts 文档](https://www.typescriptlang.org/docs/)
- [ts playground](https://www.typescriptlang.org/play)
- [ts 各种练习题-admin/888888](http://martsforever-demo.gitee.io/template-plain-react-micro-base/)
- [ts 文章](https://juejin.cn/post/6844903981227966471#heading-112)
- [深入理解 TypeScript 书籍](https://jkchao.github.io/typescript-book-chinese/#why)

## 练习目录

- [参考地址](https://gitee.com/martsforever-study/typescript-practice.git)
- [题目地址-admin/888888](http://martsforever-demo.gitee.io/template-plain-react-micro-base/#other/exercise-list)

各种范型类型实现

- [string 各种范型类型实现](string.md)
- [Tuple 各种范型类型实现](tuple.md)
- [对象&联合类型](object.md)

## type 和 interface 区别

[参考文章](https://juejin.cn/post/6844903749501059085)

相同点

- 接口定义的两种不同形式，都可以描述一个对象或者函数
- 都支持继承，而且可以互相继承，但是语法有差异

不同点

- type 可以声明基本类型别名，联合类型，元组等类型

```ts
// 基本类型别名
type Name = string;

// 联合类型
interface Dog {
  wong();
}
interface Cat {
  miao();
}

type Pet = Dog | Cat;

// 具体定义数组每个位置的类型
type PetList = [Dog, Pet];
```

- type 语句中可以使用 typeof 获取实例的类型进行赋值

```ts
// 当你想获取一个变量的类型时，使用 typeof
let div = document.createElement("div");
type B = typeof div;
```

- type 可以申明联合类型，如 type unionType = myType1 | myType2
- type 可以申明元组类型，如 type yuanzu = [myType1, myType2]
- interface 可以声明合并，type 的话会报重复定义

```ts
interface test {
  name: string;
}
interface test {
  age: number;
}

/*
  test实际为 {
    name: string
    age: number
  }
*/
```

## TS 里面有哪些 JavaScript 没有的类型

- any: 可以赋予任意类型的值
- tuple: 元组类型用来表示已知元素数量和类型的数组，各元素的类型不必相同，对应位置的类型需要一样 let x: [string, number];
- enum: 枚举类型用于定义值集合
- void:标识方法返回值的类型，表示方法没有返回值
- never: 是其它类型(包括 null 和 undefined)的子类型，是不会发生的类型。例如，never 总是抛出异常或永不返回的异常的函数表达式的返回类型
- unknown: 未知类型，一般在使用后再手动转具体的类型
- union: 联合类型，多种类型之一 string | number; // string 或 number
- intersection: 交叉类型，多种类型合并 { a: string; } & { b: number; } // => { a: string; b: number }
- Generics: 泛型
