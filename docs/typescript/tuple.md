# Tuple 类型

## 1、LengthOfTuple

计算元组类型的长度

```TypeScript
type LengthOfTuple<T extends any[]> = T["length"]

type A = LengthOfTuple<['B', 'F', 'E']> // 3
type B = LengthOfTuple<[]> // 0

```

## 2、FirstItem

得到元组类型中的第一个元素

```TypeScript
type FirstItem<T> = T extends [infer L, ...infer R] ? L : never

type A = FirstItem<[string, number, boolean]> // string
type B = FirstItem<['B', 'F', 'E']> // 'B'
```

## 3、LastItem

得到元组类型中的最后一个元素

```TypeScript
type LastItem<T> = T extends [...infer L, infer R] ? R : never

type A = LastItem<[string, number, boolean]> // boolean
type B = LastItem<['B', 'F', 'E']> // 'E'
type C = LastItem<[]> // never
```

## 4、Shift

移除元组类型中的第一个类型

```TypeScript
type Shift<T> = T extends [infer L, ...infer R] ? R : T

type A = Shift<[1, 2, 3]> // [2,3]
type B = Shift<[1]> // []
type C = Shift<[]> // []
```

## 5、Push

在元组类型 T 中添加新的类型 I

```TypeScript
type Flat<T> = T extends [...infer M] ? M : [T]
type Push<T, K> = T extends [...infer M] ? [...M, ...Flat<K>] : never

type A = Push<[1,2,3], 4> // [1,2,3,4]
type B = Push<[1], 2> // [1, 2]
```

## 6、ReverseTuple

反转元组

```TypeScript
type ReverseTuple<T, TT extends any[] = []> = T extends [infer L, ...infer R] ? ReverseTuple<R, [L, ...TT]> : TT

type A = ReverseTuple<[string, number, boolean]> // [boolean, number, string]
type B = ReverseTuple<[1, 2, 3]> // [3,2,1]
type C = ReverseTuple<[]> // []
```

## 7、Flat

拍平元组

```TypeScript
type Flat<T, Prev extends any[] = []> = T extends [infer L, ...infer R] ? [...(L extends any[] ? Flat<L> : [L]), ...Flat<R>, ...Prev] : T

type A = Flat<[1, 2, 3]> // [1,2,3]
type B = Flat<[1, [2, 3], [4, [5, [6]]]]> // [1,2,3,4,5,6]
type C = Flat<[]> // []
type D = Flat<[1]> // [1]
```

## 8、Repeat<T,C>

复制类型 T 为 C 个元素的元组类型

```TypeScript
type Repeat<T, K, TT extends any[] = []> = TT["length"] extends K ? TT : Repeat<T, K, [...TT, T]>

type A = Repeat<number, 3> // [number, number, number]
type B = Repeat<string, 2> // [string, string]
type C = Repeat<1, 1> // [1]
type D = Repeat<0, 0> // []
```

## 9、Filter<T,A>

保留元组类型 T 中的 A 类型

```TypeScript
export type Filter<T extends any[], K, TT extends any[] = []> = T extends [infer L, ...infer R] ? Filter<R, K, ([L] extends [K] ? [...TT, L] : TT)> : TT

type A = Filter<[1,'BFE', 2, true, 'dev'], number> // [1, 2]
type B = Filter<[1,'BFE', 2, true, 'dev'], string> // ['BFE', 'dev']
type C = Filter<[1,'BFE', 2, any, 'dev'], string> // ['BFE', any, 'dev']
```

## 10、FindIndex<T,E>

找出 E 类型在元组类型 T 中的下标

```TypeScript
type Equal<T, K> = [T] extends [K] ? [K] extends [T] ? (keyof T extends keyof K ? keyof K extends keyof T ? true : false : false) : false : false;

/*倒叙查找，有问题，如果有重复的，得到的index不是第一个出现的index*/
// type FindIndex<T extends any[], K> = T extends [...infer left, infer last] ? Equal<K, last> extends true ? left["length"] : FindIndex<left, K> : never

/*顺序查找*/
export type FindIndex<T extends any[], K, TT extends any[] = []> = T extends [infer L, ...infer R] ? (Equal<L, K> extends true ? TT["length"] : FindIndex<R, K, [...TT, L]>) : never

type A = [any, never, 1, '2', true]
type B = FindIndex<A, 1> // 2
type C = FindIndex<A, 3> // never
```

## 11、TupleToEnum

元组类型转换为枚举类型

```TypeScript
// 依赖 FindIndex
type TupleToEnum<T extends string[], K = false> = { readonly [k in T[number]]: K extends true ? FindIndex<T, k> : k }

// 默认情况下，枚举对象中的值就是元素中某个类型的字面量类型
type a1 = TupleToEnum<["MacOS", "Windows", "Linux"]>
// -> { readonly MacOS: "MacOS", readonly Windows: "Windows", readonly Linux: "Linux" }

// 如果传递了第二个参数为true，则枚举对象中值的类型就是元素类型中某个元素在元组中的index索引，也就是数字字面量类型
type a2 = TupleToEnum<["MacOS", "Windows", "Linux"], true>
// -> { readonly MacOS: 0, readonly Windows: 1, readonly Linux: 2 }
```

## 12、Slice

截取元组中的部分元素

```TypeScript
type Slice<A extends any[],
    S extends number,
    E extends number = A["length"],
    Prev extends any[] = [],
    SA extends any[] = [],
    EA extends any[] = [],
    > = A extends [infer First, ...infer Rest] ? (
    SA["length"] extends S ?
        (EA["length"] extends E ? [...Prev, First] : Slice<Rest, S, E, [...Prev, First], SA, [...EA, null]>) :
        Slice<Rest, S, E, Prev, [...SA, null], [...EA, null]>
    ) : Prev

type A1 = Slice<[any, never, 1, '2', true, boolean], 0, 2>          // [any,never,1]
type A2 = Slice<[any, never, 1, '2', true, boolean], 1, 3>          // [never,1,'2']
type A3 = Slice<[any, never, 1, '2', true, boolean], 1, 2>          // [never,1]
type A4 = Slice<[any, never, 1, '2', true, boolean], 2>             // [1,'2',true,boolean]
type A5 = Slice<[any], 2>                                           // []
type A6 = Slice<[], 0>                                              // []
```

## 13、Splice

删除并且替换部分元素

```TypeScript
type Splice<A extends any[],
    S extends number,
    L extends number,
    R extends any[] = [],
    Prev extends any[] = [],
    SA extends any[] = [],
    DA extends any[] = [],
    > =
    A extends [infer First, ...infer Rest] ?
        (SA["length"] extends S ?
            (DA["length"] extends L ? [...Prev, ...R, ...A] : Splice<Rest, S, L, R, Prev, SA, [...DA, null]>)
            : Splice<Rest, S, L, R, [...Prev, First], [...SA, null], DA>)
        : Prev

type A1 = Splice<[string, number, boolean, null, undefined, never], 0, 2>                   // [boolean,null,undefined,never]               从第0开始删除，删除2个元素
type A2 = Splice<[string, number, boolean, null, undefined, never], 1, 3>                   // [string,undefined,never]                     从第1开始删除，删除3个元素
type A3 = Splice<[string, number, boolean, null, undefined, never], 1, 2, [1, 2, 3]>        // [string,1,2,3,null,undefined,never]          从第1开始删除，删除2个元素，替换为另外三个元素1,2,3
```
