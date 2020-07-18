# sass 语法学习

### 变量问题

less 变量覆盖，写在后边的会覆盖前边的，同时在后边整个文件都是使用的后边的变量的值。应该是编译的时候先将整个文件的变量进行了提升合并。换句话说就是可以先使用后声明

```less
@color: blue;
#header {
  border: 1px solid @color;
}
@color: red;
#footer {
  border: 1px solid @color;
}

/* 编译后 */
#header {
  border: 1px solid #ff0000;
}
#footer {
  border: 1px solid #ff0000;
}
```

scss 变量也是后边覆盖前边，但是类似与 js 语法，必须先声明才能用，同时也有作用域，注意看下边的例子，

```scss
$color: red;
#header {
  border: 1px solid $color;
}
$color: blue;
#footer {
  border: 1px solid $color;
}

/* 编译后 */
#header {
  border: 1px solid red;
}
#footer {
  border: 1px solid blue;
}
```

同时 scss 中存在 !default 的变量

```scss
$baseLineHeight: 2;
$baseLineHeight: 1.5 !default; // 如果前面没有声明 $baseLineHeight 则使用1.5默认值，如果声明了，则使用声明的值
body{
  line-height: $baseLineHeight; // 2
}
```