# string 类各种范型类型实现

## 1、CapitalizeString

首字母大写

```TypeScript
type CapitalizeString<T> = T extends `${infer L}${infer R}` ? `${Uppercase<L>}${R}` : T

type a1 = CapitalizeString<'handler'>       // Handler
type a2 = CapitalizeString<'parent'>        // Parent
type a3 = CapitalizeString<233>             // 233
```

## 2、LastChar

获取字符串字面量中的最后一个字符

```TypeScript
type LastChar<T, TT = never> = T extends `` ? TT : T extends `${infer L}${infer R}` ? LastChar<R, L> : never

type A = LastChar<'BFE'> // 'E'
type B = LastChar<'dev'> // 'v'
type C = LastChar<''> // never

// 其他变体，首、中、尾
type a = '1234567' extends `${infer L}${infer M}${infer R}` ? L : never     // 1
type b = '1234567' extends `${infer L}${infer M}${infer R}` ? M : never     // 2
type c = '1234567' extends `${infer L}${infer M}${infer R}` ? R : never     // 34567
```

## 3、FirstChar

获取字符串字面量中的第一个字符

```TypeScript
type FirstChar<T> = T extends `${infer L}${infer R}` ? L : never

type A = FirstChar<'BFE'> // 'B'
type B = FirstChar<'dev'> // 'd'
type C = FirstChar<''> // never
```

## 4、StringToTuple

字符串转换为元组类型

```TypeScript
type StringToTuple<T extends string, TT extends any[] = []> = T extends '' ? TT : T extends `${infer L}${infer R}` ? StringToTuple<R, [...TT, L]> : never

type A = StringToTuple<'BFE.dev'> // ['B', 'F', 'E', '.', 'd', 'e','v']
type B = StringToTuple<''> // []
```

## 5、TupleToString

将字符串类型的元素转换为字符串字面量类型

```TypeScript
type TupleToString<T, Prev extends string = ''> = T extends [infer L, ...infer R] ? (L extends `${infer LL}` ? TupleToString<R, `${Prev}${LL}`> : '') : Prev

type A = TupleToString<['a', 'b', 'c']> // 'abc'
type B = TupleToString<[]>              // ''
type C = TupleToString<['a']>           // 'a'
```

## 6、RepeatString<T,C>

复制字符 T 为字符串类型，长度为 C

```TypeScript
type TupleToString<T, Prev extends string = ''> = T extends [infer L, ...infer R] ? (L extends `${infer LL}` ? TupleToString<R, `${Prev}${LL}`> : '') : Prev

type Repeat<StringTuple extends string[], Len extends number, Char extends string> = StringTuple["length"] extends Len ? TupleToString<StringTuple> : Repeat<[...StringTuple, Char], Len, Char>
type RepeatString<Str, Len extends number> = Len extends 0 ? '' : (Str extends `${infer S}` ? Repeat<[Str], Len, Str> : never)

type A = RepeatString<'a', 3> // 'aaa'
type B = RepeatString<'a', 0> // ''
```

## 7、SplitString

将字符串字面量类型按照指定字符，分割为元组。无法分割则返回原字符串字面量

```TypeScript
export type SplitString<Str, Separator extends string, Ret extends any[] = []> = Str extends '' ? Ret : (Str extends `${infer L}${Separator}${infer R}` ? SplitString<R, Separator, [...Ret, L]> : [...Ret, Str])

type A1 = SplitString<'handle-open-flag', '-'>        // ["handle", "open", "flag"]
type A2 = SplitString<'open-flag', '-'>               // ["open", "flag"]
type A3 = SplitString<'handle.open.flag', '.'>        // ["handle", "open", "flag"]
type A4 = SplitString<'open.flag', '.'>               // ["open", "flag"]
type A5 = SplitString<'open.flag', '-'>               // ["open.flag"]
```

## 8、LengthOfString

计算字符串字面量类型的长度

```TypeScript
type LengthOfString<T extends string, TT extends any[] = []> = T extends '' ? TT["length"] : T extends `${infer L}${infer R}` ? LengthOfString<R, [...TT, L]> : never

type A = LengthOfString<'BFE.dev'> // 7
type B = LengthOfString<''> // 0
```

## 9、KebabCase

驼峰命名转横杠命名

```TypeScript
type a1 = KebabCase<'HandleOpenFlag'>           // handle-open-flag
type a2 = KebabCase<'OpenFlag'>                 // open-flag
```

## 10、CamelCase

横杠命名转化为驼峰命名

```TypeScript
type KebabCaseIterator<T extends string, TT extends any[] = []> = T extends '' ? TT : (T extends `${infer L}${infer R}` ? KebabCaseIterator<R, [...TT, L extends Uppercase<L> ? `-${Lowercase<L>}` : L]> : never)
type JoinString<T> = T extends [infer L, ...infer R] ? (L extends string ? `${L}${JoinString<R>}` : never) : ''
type RemoveFstSeparator<T> = T extends `-${infer R}` ? R : T
type KebabCase<T extends string> = RemoveFstSeparator<JoinString<KebabCaseIterator<T>>>;

type a1 = CamelCase<'handle-open-flag'>         // HandleOpenFlag
type a2 = CamelCase<'open-flag'>                // OpenFlag
```

## 11、ObjectAccessPaths

得到对象中的值访问字符串

```TypeScript
type JoinString<T extends string, K extends string, Separator extends string> = T extends '' ? K extends '' ? never : K : (K extends '' ? T : `${T}${Separator}${K}`)
type js1 = JoinString<'top', 'title', '.'>      // top.title
type js2 = JoinString<'', 'title', '.'>         // title
type js3 = JoinString<'top', '', '.'>           // top
type js4 = JoinString<'', '', '.'>              // never

type ObjectAccessPaths<T extends Record<string, any>, Prev extends string = '', K = keyof T> = K extends keyof T ? (K extends string ? ((T[K] extends Record<string, any> ? ObjectAccessPaths<T[K], JoinString<Prev, K, '.'>> : JoinString<Prev, K, '.'>)) : never) : never

// 简单来说，就是根据如下对象类型：
/*
{
    home: {
        topBar: {
            title: '顶部标题',
            welcome: '欢迎登录'
        },
        bottomBar: {
            notes: 'XXX备案，归XXX所有',
        },
    },
    login: {
        username: '用户名',
        password: '密码'
    }
}
*/
// 得到联合类型：
/*
home.topBar.title | home.topBar.welcome | home.bottomBar.notes | login.username | login.password
*/

// 完成 createI18n 函数中的 ObjectAccessPaths<Schema>，限制函数i18n的参数为合法的属性访问字符串
function createI18n<Schema>(schema: Schema): ((path: ObjectAccessPaths<Schema>) => string) {return [{schema}] as any}

// i18n函数的参数类型为：home.topBar.title | home.topBar.welcome | home.bottomBar.notes | login.username | login.password
const i18n = createI18n({
    home: {
        topBar: {
            title: '顶部标题',
            welcome: '欢迎登录'
        },
        bottomBar: {
            notes: 'XXX备案，归XXX所有',
        },
    },
    login: {
        username: '用户名',
        password: '密码'
    }
})

i18n('home.topBar.title')           // correct
i18n('home.topBar.welcome')         // correct
i18n('home.bottomBar.notes')        // correct

// i18n('home.login.abc')              // error，不存在的属性
// i18n('home.topBar')                 // error，没有到最后一个属性
```

## 12、ComponentEmitsType

定义组件的监听事件类型

```TypeScript
import {GetListenName} from "./51_CamelCase";

type RemoveReturn<T> = T extends (...args: infer A) => any ? (...args: A) => void : T
// type Convert<T> = { [k in GetListenName<keyof T>]: GetKebabCase<k> extends keyof T ? RemoveReturn<T[GetKebabCase<k>]> : never }
type Convert<T> = { [k in keyof T as GetListenName<k>]: RemoveReturn<T[k]> }
type ComponentEmitsType<Emits> = { (props: Partial<Convert<Emits>>): any }

// 实现 ComponentEmitsType<Emits> 类型，将
/*
{
    'handle-open': (flag: boolean) => true,
    'preview-item': (data: { item: any, index: number }) => true,
    'close-item': (data: { item: any, index: number }) => true,
}
*/
// 转化为类型
/*
{
    onHandleOpen?: (flag: boolean) => void,
    onPreviewItem?: (data: { item: any, index: number }) => void,
    onCloseItem?: (data: { item: any, index: number }) => void,
}
*/


function createComponent<Emits extends Record<string, any>>(emits: Emits): ComponentEmitsType<Emits> {return [{emits}] as any}

// 最后返回的 Component变量类型为一个合法的React组件类型，并且能够通过`on事件驼峰命名`的方式，监听定义的事件，并且能够自动推导出事件的参数类型
const Component = createComponent({
    'handle-open': (flag: boolean) => true,
    'preview-item': (data: { item: any, index: number }) => true,
    'close-item': (data: { item: any, index: number }) => true,
})
console.log(
    <Component
        // onHandleOpen 的类型为 (flag: boolean) => void
        onHandleOpen={val => console.log(val.valueOf())}
        // onPreviewItem 的类型为 (data: { item: any, index: number }) => void
        onPreviewItem={val => {
            const {item, index} = val
            const a: number = item
            console.log(a, index.toFixed(2))
        }}
        // 所有的监听事件属性都是可选属性，可以不传处理函数句柄
        // onCloseItem={val => [{val}]}
    />
)

// 提示，定义组件的props类型方式为 { (props: Partial<Convert<Emits>>): any }
// 比如 Comp 可以接收属性 {name:string, age:number, flag:boolean, id?:string}，其中id为可选属性，那么可以这样写

const Comp: { (props: { name: string, age: number, flag: boolean, id?: string }): any } = Function as any

console.log(<Comp name="" age={1} flag/>)           // 正确
console.log(<Comp name="" age={1} flag id="111"/>)  // 正确
// console.log(<Comp name={1} age={1} flag/>)          // 错误，name为字符串类型
// console.log(<Comp age={1} flag/>)                   // 错误，缺少必须属性name:string
```
