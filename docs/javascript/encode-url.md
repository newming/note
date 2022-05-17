# URL 编/解码

## escape 和 unescape

Javascript 语言用于编码的函数，一共有三个，最古老的一个就是 escape() 。虽然这个函数现在已经不提倡使用了，但是由于历史原因，很多地方还在使用它，所以有必要先从它讲起。

- escape(不能直接用于 URL 编码，它的真正作用是返回一个字符的 Unicode 编码值
- 它的具体规则是，除了 AscII 字母、数字、标点符号"@\* \_+- ./"以外，对其他所有字符进行编码。在 u0000 到 u00ff 之间的符号被转成 %xx 的形式，其余符号被转成 %uxxxx 的形式。对应的解码函数是 unescape()
- 无论网页的原始编码是什么，一旦被 Javascript 编码，就都变为 unicode 字符。也就是说，Javascipt 函数的输入和输出，默认都是 Unicode 字符。这—点对下面两个函数也适用。
- 网页在提交表单的时候，如果有空格，则会被转化为＋字符。服务器处理数据的时候，会把＋号处理成空格。所以，使用的时候要小心。

简单来说，escape 是对字符串(string)进行编码(而另外两种是对 URL)，作用是让它们在所有电脑上可读。编码之后的效果是%xx 或者号 uxxxx 这种形式。

最关键的是，当你需要对 URL 编码时，请忘记这个方法，这个方法是针对字符串使用的，不适用于 URL。

## encodeURI 和 decodeURI

- encodeURI()是 Javascript 中真正用来对 URL 编码的函数
- 它用于对 URL 的组成部分进行个别编码，除了常见的符号以外，对其他一些在网址中有特殊含义的符号"; / ? : & = + \$ ,#"，也不进行编码。编码后，它输出符号的 utf-8 形式，并且在每个字节前加上%
- 它对应的解码函数是 decodeURI()
- 需要注意的是，它不对单引号'编码。

## encodeURICoponent 和 decodeURIComponent

- 与 encodeURI()的区别是，它用于对整个 URL 进行编码。"; / ?:G &=+\$,#"，这些在 encodeURI()中不被编码的符号，在 encodeURIComponent()中统统会被编码。
- 它对应的解码函数是 decodeURIComponent().

## 使用场景

1. 如果只是编码字符串，不和 URL 有半毛钱关系，那么用 escape。
2. 如果你需要编码整个 URL，然后需要使用这个 URL，那么用 encodeURI。
3. 当你需要编码 URL 中的参数的时候，那么 encodeURIComponent 是最好方法。

## 常用 URL 解析方法

```js
// 1. 使用 URL 构造函数
var url = new URL("http://www.example.com/index.html");
url.href;
// "http://www.example.com/index.html"

// 2. 给a标签设置href

// 3. URLSearchParams

// 4. 第三方库 qs

// 5. 正则
function getUrlParams3(url) {
  // \w+ 表示匹配至少一个(数字、字母及下划线), [\u4e00-\u9fa5]+ 表示匹配至少一个中文字符
  /*
    该正则匹配规则表示: 首先匹配的格式是 xxx = xxx
    然后 (\w+|[\u4e00-\u9fa5]+) 表示至少匹配一个(字母、数字、下划线) 或者至少匹配一个中文字符
  */
  let pattern = /(\w+|[\u4e00-\u9fa5]+)=(\w+|[\u4e00-\u9fa5]+)/gi;

  /*
    该正则匹配规则表示: 首先匹配的格式是 xxx = xxx
    然后[^?|&] 表示匹配的字符中不能含有 ? 或者 &，后面同理
  */

  // let pattern = /([^?|&]+)=([^&]+)/ig;

  let result = {};
  url.replace(pattern, ($, $1, $2) => {
    result[$1] = $2;
  });
  return result;
}

function getQueryString(key: string, str = window.location.href): string {
  const reg = new RegExp(`(?:^|\\?|&)${key}=([^&#]*)(?:&|$|#)`);
  const matched = str.match(reg);

  return matched ? matched[1] : "";
}

// 6. query参数解析
function search2obj(search: string) {
  const obj = {};

  if (!search) {
    return obj;
  }

  if (search.indexOf("?") === 0) {
    search = search.substring(1);
  }

  search.replace(/(.+?)=(.*?)(&|$)/g, (a, b, c) => {
    obj[b] = c;

    return "";
  });

  return obj;
}

function obj2search(
  obj: Record<string | number, string | number>,
  mark = true
) {
  const isObject = Object.prototype.toString.call(obj) === "[object Object]";

  if (!isObject) {
    return "";
  }

  let search = mark ? "?" : "";

  Object.keys(obj).map((key) => {
    search += `${key}=${obj[key]}&`;
  });

  return search.substring(0, search.length);
}
```
