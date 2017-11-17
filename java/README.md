# Java 入门

- JVM: Java Virtual Machine，解释器
- JDK: Java Development Kit，Java 开发工具包
- JRE: Java Runtime Environment，Java 运行时环境

```bash
/usr/libexec/java_home -V # 查看 java 安装目录
```

编译源代码

```bash
javac Hello.java # 生成 .class 文件
```

执行编译后的二进制文件

```bash
java Hello # 注意，不可以带后缀
```

使用 Eclipse 开发 Java 程序

- 创建 Java 项目
- 创建程序包
- 编写 Java 源程序
- 运行 Java 程序

### 数据类型

- 数据类型
  - 基本数据类型
    - 数值型：整数(byte, short, int, long)、浮点(float, double)
    - 字符型: char
    - 布尔型: boolean
  - 引用数据类型
    - 类: class
    - 接口: interface
    - 数组

### 运算符

- 算术运算符: +, -, *, /, %, ++, --
- 赋值运算符: =, +=, -=, *=, /=, %=
- 比较运算符: >, <, >=, <=, ==, !=
- 逻辑运算符: &&, ||, !, ^
- 条件运算符: boolean ? true : false ;

### Java 中运算符优先级

1. ()
2. !, +(正), -(负), ++, --
3. *, /, %
4. +(加), -(减)
5. <, >, <=, >=
6. ==, !=
7. ^
8. &&
9. ||
10. ?:(三元运算符)
11. =, +=, -+, *=, /=, %=

### 流程控制语句

- if
- if...else
- if...else if...else
- switch...case...
- while(){...}
- do{...}while() // 至少执行一次
- for(){...}