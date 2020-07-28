# pug 模版引擎

### pug 特点

- 超强的可读性
- 灵活易用的缩进
- 块拓展
- 代码默认经过编码处理，以增强安全性
- 编译及运行时的上下文错误报告
- 命令行编译支持
- HTML5模式(使用!!!5文档类型)
- 可选的内存缓存
- 联合动态的静态标记类
- 利用过滤器解析树的处理

### 文档声明和头尾标签

```pug
doctype html
html
  head
    title pug stydy
  body
```

### 标签及属性

```pug
#myid.myclass(class='mysecclass')
//- 渲染为 <div id='myid' class='myclass mysecclass'></div>

h1.h1class#newid 这是h1，带id和class

a(href='https://www.baidu.com') 属性写到括号内

input(type='number' checked value='20')
```

### 混合的成段文本

```pug
p.
  hello
  <span>world</span>
  aaa
p
  | hello
  | <span>world</span>
  span haha
  | hha

script.
  let a = 1

style.
  body{margin: 0;}
```

### 注释和条件注释

```pug
// p 这是单行注释
//- #id 这是非缓冲注释，就是不会生成到 html 中
//-
  p 这是块注释
  a(href='baidu.com') 百度

//
  p 这是块注释
  a(href='baidu.com') 百度

// 条件注释

<!--[if IE 8]>
<html lang="en" class="lt-ie9">
<![endif]-->
<!--[if gt IE 8]><!-->
<html lang="en">
<!--<![endif]-->
```

### 变量声明和数据传递

```pug
// 命令行/json文件传入
./node_modules/.bin/pug index.pug -w -P --obj '{"course": "dema"}'

// pug 文件中变量声明
- var course = 'pug'
#test.mydiv hello #{course}

#test.mydiv= 'hello ' + course

#test.mydiv
  = 'hello ' + course
// 文件中变量的优先级高，会覆盖命令行中的变量
// #{code} 会去找这个变量，更像是字符串拼接 p #{code} string。 = 更像是变量赋值 p= code + ' string'

p #{unknow}
p= unknow
// 不支持了 https://pugjs.org/language/attributes.html
input(value='#{unknow}') // <input value="#{unknow}"> 会当作字符串输出

input(value=unknow + 'aaa') // <input value="undefinedaaa"> 变为 undefined
input(value=unknow) // <input> 无值不输出 <input type="text">
```

### 安全转义与非转义

默认进行转义，将尖括号转为实体字符。

```pug
- var htmlData = '<script>alert(1)</script>'

#data #{htmlData} 我转义了 &lt;script&gt;alert(1)&lt;/script&gt;
#data !{htmlData} 我没转义 <script>alert(1)</script>
p= htmlData + ' 我转义了'
p!= htmlData + ' 我没转义'

// 如果想要输出 #{} 结构
p \#{code}
p \!{code}
```

### 流程控制 for-each-while

[官网](https://pugjs.org/language/code.html)

```pug
- var desc = {name: 'newming', age: 23}
- for (var key in desc)
  p= key + '-' + desc[key]

each value, key in desc
  p #{key}: #{value}

// 注意 each 不能有 -
- var courses = ['js', 'java', 'c++']
each item in courses
  p= item

// 多级循环
- var sections = [{id: 1, items: ['a', 'b']}, {id: 2, items: ['c', 'd']}]
dl
  each section in sections
    dt= section.id
    each item in section.items
      dd= item

// while
- var n = 4
ul
  while n < 4
    li= n++
```

### 流程代码 if-else unless case

[官网](https://pugjs.org/language/conditionals.html)

```pug
// if else
- var man = true
if man
  p 你是男的
else
  p 你是女的

unless !man
  p 你是女队

- var friends = 10
case friends
  when 0
    p you have no friends
  when 1: p you have a friend
  default
    p you have #{friends} friends
```

### mixins

[官网](https://pugjs.org/language/mixins.html)

### 模版的继承

[官网](https://pugjs.org/language/inheritance.html)

### 模版的包含

[官网](https://pugjs.org/language/includes.html)
