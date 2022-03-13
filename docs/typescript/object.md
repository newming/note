# 对象&联合类型

本次练习的主要内容是联合类型以及对象类型；

## 1、OptionalKeys

获取对象类型中的可选属性的联合类型

```TypeScript
export type OptionalKeys<T, K = keyof T> = K extends keyof T ? (Omit<T, K> extends T ? K : never) : never

type a1 = OptionalKeys<{ foo: number | undefined, bar?: string, flag: boolean }>        // bar
type a2 = OptionalKeys<{ foo: number, bar?: string }>                                   // bar
type a3 = OptionalKeys<{ foo: number, flag: boolean }>                                  // never
type a4 = OptionalKeys<{ foo?: number, flag?: boolean }>                                // foo|flag
type a5 = OptionalKeys<{}>                                                              // never
```

## 2、PickOptional

保留一个对象中的可选属性类型

```TypeScript
// 依赖 OptionalKeys
type PickOptional<T> = { [k in OptionalKeys<T>]?: T[k] }

type a1 = PickOptional<{ foo: number | undefined, bar?: string, flag: boolean }>        // {bar?:string|undefined}
type a2 = PickOptional<{ foo: number, bar?: string }>                                   // {bar?:string}
type a3 = PickOptional<{ foo: number, flag: boolean }>                                  // {}
type a4 = PickOptional<{ foo?: number, flag?: boolean }>                                // {foo?:number,flag?:boolean}
type a5 = PickOptional<{}>                                                              // {}
```

## 3、RequiredKeys

获取对象类型中的必须属性的联合类型

```TypeScript
export type RequiredKeys<T, K = keyof T> = K extends keyof T ? (Omit<T, K> extends T ? never : K) : never

type a1 = RequiredKeys<{ foo: number | undefined, bar?: string, flag: boolean }>        // foo|flag
type a2 = RequiredKeys<{ foo: number, bar?: string }>                                   // foo
type a3 = RequiredKeys<{ foo: number, flag: boolean }>                                  // foo|flag
type a4 = RequiredKeys<{ foo?: number, flag?: boolean }>                                // never
type a5 = RequiredKeys<{}>                                                              // never
```

## 4、PickRequired

保留一个对象中的必须属性

```TypeScript
// 依赖 RequiredKeys
type PickRequired<T> = { [k in RequiredKeys<T>]: T[k] }

type a1 = PickRequired<{ foo: number | undefined, bar?: string, flag: boolean }>        // {foo:number|undefined,flag:boolean}
type a2 = PickRequired<{ foo: number, bar?: string }>                                   // {foo:number}
type a3 = PickRequired<{ foo: number, flag: boolean }>                                  // {foo:number,flag:boolean}
type a4 = PickRequired<{ foo?: number, flag?: boolean }>                                // {}
type a5 = PickRequired<{}>                                                              // {}
```

## 5、Merge

合并两个对象类型 T 以及 K，如果属性重复，则以 K 中属性类型为准；

```TypeScript
type Merge<T, K> = { [k in Exclude<keyof T, keyof K>]: T[k] } & K

type obj1 = {
    el: string,
    age: number
}

type obj2 = {
    el: HTMLElement,
    flag: boolean
}

type obj3 = Merge<obj1, obj2>   // {el:HtmlElement,age:number,flag:boolean}

const a = {...{} as obj3}
console.log(a.el.scrollTop, a.age.toFixed(0), a.flag.valueOf())
// console.log(a.el.charAt(0))     // error
```

## 6、IsNever

判断是否为 never 类型

```TypeScript
type IsNever<T> = [T] extends [never] ? true : false

type A = IsNever<never> // true
type B = IsNever<string> // false
type C = IsNever<undefined> // false
type D = IsNever<any> // false
```

## 7、IsEmptyType

判断是否为没有属性的对象类型{}

```TypeScript
type IsEmptyType<T> = number extends T
    ? keyof T extends never
        ? T extends {}
            ? true
            : false
        : false
    : false

type A = IsEmptyType<string> // false
type B = IsEmptyType<{ a: 3 }> // false
type C = IsEmptyType<{}> // true
type D = IsEmptyType<any> // false
type E = IsEmptyType<object> // false
type F = IsEmptyType<Object> // false
type G = IsEmptyType<unknown> // false
```

## 8、IsAny

判断是否为 any 类型

```TypeScript
// 使用 [T] 避免传入的是联合类型导致类型分布
// unknown 只能赋值给 any或者unknown
// any可以赋值给string，但是unknown不可以赋值给string
export type IsAny<T> = [unknown] extends [T] ? ([T] extends [string] ? true : false) : false

type A = IsAny<string> // false
type B = IsAny<any> // true
type C = IsAny<unknown> // false
type D = IsAny<never> // false
```

## 9、Redux Connect

实现 Connect 类型，能够自动地转化 Redux Module 对象中的函数类型

```TypeScript
interface Module {
    count: number;
    message: string;

    asyncMethod<T, U>(input: Promise<T>): Promise<Action<U>>;

    syncMethod<T, U>(action: Action<T>): Action<U>;
}

interface Action<T> {
    payload?: T;
    type: string;
}

// 这个要求的结果
type Result = {
    asyncMethod<T, U>(input: T): Action<U>;
    syncMethod<T, U>(action: T): Action<U>;
}

// 实现类型Connect，要求 Connect<Module> 的结果为上面的 Result
// 只要函数类型的属性；
// 如果函数是异步函数，要求自动解析出来Promise中的类型；
type InferConnectFunctionParameterType<Func> =
    Func extends <T, U>(input: Promise<T>) => Promise<Action<U>> ? <T, U>(input: T) => Action<U> :
        Func extends (<T, U>(input: Action<T>) => Action<U>) ? (<T, U>(input: T) => Action<U>) : never

type Connect<T, M extends string = { [k in keyof T]: k extends string ? T[k] extends Function ? k : never : never }[keyof T]> = {
    [k in M]: k extends keyof T ? InferConnectFunctionParameterType<T[k]> : never
}

type Result2 = Connect<Module>
```

## 10、UnionToBooleanProps<T>

有且只有一个属性

```tsx
// 实现一个叫做 UnionToBooleanProps 的泛型，使得以下需求成立
type UnionToBooleanProps<
  T extends string,
  TT extends string = T
> = T extends any
  ? { [k in Exclude<TT, T>]?: void } & { [k in T]: boolean }
  : never;

type MessageStringType = "info" | "success" | "warning" | "error";
type OneMessageTypes = UnionToBooleanProps<MessageStringType>;
type Props = OneMessageTypes & { id: string };
function Component(props: Props) {
  return <></>;
}

const a = <Component id="abc" info />; //correct
const b = <Component id="abc" success />; //correct
const c = <Component id="abc" />; //wrong
const d = <Component id="abc" info success />; //wrong

// 组件Component所接收的属性，有且只有一个 "info" | "success" | "warning" | "error" 中的值；
```

## 11、UnionToIntersection<T>

将联合类型转换为交叉类型

```TypeScript
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types

// 实现类型 UnionToIntersection，用来将联合类型转换为交叉类型
type UnionToIntersection<T> = (T extends any ? ((t: T) => void) : never) extends ((r: infer R) => any) ? R : never

/*
(T extends any ? ((t: T) => void) : never) 会返回多个函数联合，组成的一个类型；
每一个函数的参数类型是联合类型T中的某一项，比如这里的结果就是：
type fun1 = ((t: { a: string }) => void) | ((t: { b: string }) => void) | ((t: { c: string }) => void)
同一类型变量在反向变量位置的多个候选变量会导致推断交叉点类型，于是类型就变成了 {a:string}&{b:string}&{c:string}
*/
type A = UnionToIntersection<{ a: string } | { b: string } | { c: string }> // {a: string} & {b: string} & {c: string}


// 步骤拆开来，就有问题，还是推导为联合类型
type Step1<T> = (T extends any ? ((t: T) => void) : never)

type val1 = Step1<{ a: string } | { b: string } | { c: string }>
// type val1 = ((t: {     a: string; }) => void) | ((t: {     b: string; }) => void) | ((t: {     c: string; }) => void)
// 这里 val1 实际上是 (t:{a:string}|{b:string}|{c:string})=>void

// val1 以及 (t: { a: string }) => void) | ((t: { b: string }) => void) | ((t: { c: string }) => void) 在走Step2的时候不会分布，因为当前实际类型是 (t:{a:string}|{b:string}|{c:string})=>void
// 是确定的类型，只是参数类型是不确定的联合类型；
type Step2<T> = T extends ((r: infer R) => any) ? R : never
type val2 = Step2<val1>
type val3 = Step2<((t: { a: string }) => void) | ((t: { b: string }) => void) | ((t: { c: string }) => void)>
```

## 12、UnionPop

取出来联合类型中的任意一个类型

```TypeScript
// 依赖 IsAny

export type UnionPop<U> =IsAny<U> extends true ? any : boolean extends U ? boolean :
    ((U extends U ? ((fn: (u: U) => any) => any) : never) extends
        ((u: infer f1) => any) ? f1 : never) extends
        ((f2: infer F2) => any) ? F2 : never

type a = 1 | 2 | 3
type b = UnionPop<a>;       // 3


type p1 = { name: 1 }
type p2 = { age: 2 }
type p3 = { flag: true }

type k = ((x: p1) => number) & ((y: p2) => string) & ((z: p3) => boolean);  // 这里实际上就是一个重载函数
type d = k extends ((a: infer A) => void) ? A : 'b'       //  最后一个的参数类型：p3，这是为啥
type e = k extends ((a: any) => infer A) ? A : 'b'        //  最后一个的返回值类型：boolean，这是为啥

function overload(a: number): 'a';
function overload(a: string): 'b';
function overload(a: number | string) {
    return a;
}

type f1 = typeof overload extends (a: infer A) => void ? A : 'b'        // 最后一个的参数类型：string，这是为啥
type f2 = typeof overload extends (a: any) => infer A ? A : 'b'         // 最后一个的返回值类型：'b'，这是为啥
type f3 = ReturnType<typeof overload>

type k2 = ((x: p1) => number) | ((y: p2) => string) | ((z: p3) => boolean);
type paramType = k2 extends ((a: infer A) => void) ? A : 'a'       // p1 & p2 & p3               // 函数参数是逆变的，得到的结果是子类，也就是并集，是交叉类型
type returnType = k2 extends ((a: any) => infer A) ? A : 'a'       // string|number|boolean         // 函数返回值是协变的，得到的结构是父类，也就是交集，是联合类型
```

## 13、UnionToTuple

联合类型转换为元组类型

```TypeScript
// 依赖 UnionPop
type UnionToTuple<T, TT = T, R extends any[] = []> = [T] extends [R[number]] ? R : UnionToTuple<T, Exclude<TT, UnionPop<TT>>, [UnionPop<TT>, ...R]>

type a = UnionToTuple<1 | 2 | 3>                      // [1,2,3]
type b = UnionToTuple<1 | string | boolean>           // [1,string,boolean]
type c = UnionToTuple<any>                            // [any]

type Q1 = UnionToTuple<string | number | symbol>                                // [symbol,number,string]
type Q2 = UnionToTuple<string | number | symbol | boolean>                      // [boolean,symbol,number,string]
type Q3 = UnionToTuple<string | number | symbol | boolean | [boolean]>          // [boolean,[boolean],symbol,number,string]
```
