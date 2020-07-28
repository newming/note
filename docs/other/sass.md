# sass 语法学习

## 变量问题

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

## sass 入门

Sass 和 SCSS 其实是同一种东西，我们平时都称之为 Sass，两者之间不同之处有以下两点：

- 文件扩展名不同，Sass 是以“.sass”后缀为扩展名，而 SCSS 是以“.scss”后缀为扩展名
- 语法书写方式不同，Sass 是以严格的缩进式语法规则来书写，不带大括号({})和分号(;)，而 SCSS 的语法书写和我们的 CSS 语法书写方式非常类似。

下面示例为 scss

### 普通变量声明
```scss
$width: 200px;

# 调用
div {
  width: $width
}
```

### 默认变量声明

```scss
$baseLineHeight: 2; // 会覆盖默认
$baseLineHeight: 1.5 !default;
body{
  line-height: $baseLineHeight; // 2
}
```

### 选择器嵌套

```scss
nav {
  a {
    color: red;

    header & {
      color:green;
    }
  }
}
// 编译结果
nav a {
  color: red;
}
header nav a {
  color: green;
}
```

### 属性嵌套

```scss
.box {
  border: {
   top: 1px solid red;
   bottom: 1px solid green;
  }
}

// 结果
.box {
  border-top: 1px solid red;
  border-bottom: 1px solid green;
}
```

### 伪类嵌套

```scss
.clearfix{
  &:before,
  &:after {
    content:"";
    display: table;
  }
  &:after {
    clear:both;
    overflow: hidden;
  }
}
```

### 声明混合宏

```scss
# 不带参数
@mixin border-radius{
  -webkit-border-radius: 5px;
  border-radius: 5px;
}

button {
  @include border-radius;
}

# 带参数
@mixin border-radius($radius: 5px){
  -webkit-border-radius: $radius;
  border-radius: $radius;
}

.box {
  @include border-radius(3px);
}

# 多个参数
@mixin center($width,$height){
  width: $width;
  height: $height;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -($height) / 2;
  margin-left: -($width) / 2;
}

.box-center {
  @include center(500px,300px);
}

# 剩余参数
@mixin box-shadow($shadows...){
  @if length($shadows) >= 1 {
    -webkit-box-shadow: $shadows;
    box-shadow: $shadows;
  } @else {
    $shadows: 0 0 2px rgba(#000,.25);
    -webkit-box-shadow: $shadow;
    box-shadow: $shadow;
  }
}

.box {
  @include box-shadow(0 0 1px rgba(#000,.5),0 0 2px rgba(#000,.2));
}
```

### 拓展/继承

```scss
//SCSS
.btn {
  border: 1px solid #ccc;
  padding: 6px 10px;
  font-size: 14px;
}

.btn-primary {
  background-color: #f36;
  color: #fff;
  @extend .btn;
}

.btn-second {
  background-color: orange;
  color: #fff;
  @extend .btn;
}

//CSS
.btn, .btn-primary, .btn-second {
  border: 1px solid #ccc;
  padding: 6px 10px;
  font-size: 14px;
}

.btn-primary {
  background-color: #f36;
  color: #fff;
}

.btn-second {
  background-clor: orange;
  color: #fff;
}
```

### 占位符

%placeholder 声明的代码，如果不被 @extend 调用的话，不会产生任何代码。

```scss
//SCSS
%mt5 {
  margin-top: 5px;
}
%pt5{
  padding-top: 5px;
}

.btn {
  @extend %mt5;
  @extend %pt5;
}

.block {
  @extend %mt5;

  span {
    @extend %pt5;
  }
}

//CSS
.btn, .block {
  margin-top: 5px;
}

.btn, .block span {
  padding-top: 5px;
}
```
