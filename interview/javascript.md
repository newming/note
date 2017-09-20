# javascript 面试题汇总

#### 1.计算出字符串中出现次数最多的字符是什么，出现了多少次？

```js
var str = 'adfdageilkjlioafdmyuyuierhk';
var maxLength = 0, result = '', oldStr;
while (str != '') {
  oldStr = str;
  getStr = str.charAt(0);
  str = str.replace(new RegExp(getStr,'g'), '');
  if (oldStr.length-str.length > maxLength) {
    maxLength = oldStr.length - str.length;
    result = getStr + '=' + maxLength;
  }
}
console.log(result);
```

#### 2.点击下载图片
方法一
```html
<a href="url" download='url'>点击下载图片</a>
```
方法二
```js
//var img = reference to image
var url = img.src.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
window.open(url);
// Or perhaps: location.href = url;
// Or even setting the location of an <iframe> element,
```
方法三
```js
var img = document.images[0];
img.onclick = function() {
  // atob to base64_decode the data-URI
  var image_data = atob(img.src.split(',')[1]);
  // Use typed arrays to convert the binary data to a Blob
  var arraybuffer = new ArrayBuffer(image_data.length);
  var view = new Uint8Array(arraybuffer);
  for (var i=0; i<image_data.length; i++) {
    view[i] = image_data.charCodeAt(i) & 0xff;
  }
  try {
    // This is the recommended method:
    var blob = new Blob([arraybuffer], {type: 'application/octet-stream'});
  } catch (e) {
    // The BlobBuilder API has been deprecated in favour of Blob, but older
    // browsers don't know about the Blob constructor
    // IE10 also supports BlobBuilder, but since the `Blob` constructor
    //  also works, there's no need to add `MSBlobBuilder`.
    var bb = new (window.WebKitBlobBuilder || window.MozBlobBuilder);
    bb.append(arraybuffer);
    var blob = bb.getBlob('application/octet-stream'); // <-- Here's the Blob
  }

  // Use the URL object to create a temporary URL
  var url = (window.webkitURL || window.URL).createObjectURL(blob);
  location.href = url; // <-- Download!
};
```

#### 3.前端如何读取上传文件
```js
fileReader
```

#### 4.如何读取文件上传进度
```js
$.ajax({
  url : post_url,
  type: "POST",
  data : form_data,
  contentType: false,
  cache: false,
  processData:false,
  xhr: function(){
    //upload Progress
    var xhr = $.ajaxSettings.xhr();
    if (xhr.upload) {
      xhr.upload.addEventListener('progress', function(event) {
        var percent = 0;
        var position = event.loaded || event.position;
        var total = event.total;
        if (event.lengthComputable) {
            percent = Math.ceil(position / total * 100);
        }
        //update progressbar
        $(progress_bar_id +" .progress-bar").css("width", + percent +"%");
        $(progress_bar_id + " .status").text(percent +"%");
      }, true);
    }
    return xhr;
  },
  mimeType:"multipart/form-data"
}).done(function(res){ //
  $(my_form_id)[0].reset(); //reset form
  $(result_output).html(res); //output response from server
  submit_btn.val("Upload").prop( "disabled", false); //enable submit button once ajax is done
});
```

#### 5.基础数据类型转换问题

```js
null == undefined  // true
[] == '' // true
[].toString() == '' // true,是上一个的解释
![] == false // true
[] == [] //false
({}) == '' // false
({}).toString() == '[object Object]' // 上一个的解释
```

#### 6.for 循环中的 break,continue
```js
for (var i = 0; i < 10; i++) {
  if (i<=5) {
    i+=2;
    continue
  }
  i+=3;
  break;
  console.log(i);
}
console.log(i);//9
// 打印几次，值
// 在循环体中出现和continue,break后，这两个关键字后边的代码就都不会执行了，但是continue会继续下一轮循环，break会直接结束循环
```

#### 7.let 的块级作用域
```js
for (let i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i); // 0,1,2,3,4
  },i*1000)
}
for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i); // 5,5,5,5,5
  },i*1000)
}
```

#### 8.预解析
```js
if (!("a" in window)) {
  var a ="猜猜我有没有？？？" ;
}
alert(a); // undefined
// a会预解析，所以 'a' in window 为 true，a的赋值则得不到执行。
```

#### 9.预解析闭包

```js
function fo(){
	var i=0;
	return function(n){
		return n+i++;
	}
};

var f=fo();
var a = f(15); // 15
var b = fo()(15); // 15
var c = fo()(20); // 20
var d = f(20); // 21
```

#### 10.预解析，闭包，this，作用域

```js
var number = 2;
var obj = {
	number: 4,
	fn1: (function() {
		this.number *= 2;
		number=number*2;
    console.log(number);// NaN
 		var number=3;
		return function() {
			this.number *= 2;
			number*=3;
			alert(number);
		}
	})(),
	db2:function(){this.number*=2}
};

var fn1 = obj.fn1;
alert(number);//4
fn1();//9
obj.fn1();//27

alert(window.number); //8
alert(obj.number); //8
```

#### 11.括号表达式
```js
(1,2,3)+3 //6
//括号表达式：一个括号中放多项内容，用逗号隔开，获取到最后一项

function fn() {console.log(this)}
var obj = {fn: fn};
(fn,obj.fn)(); // 执行的是obj.fn()，但是注意this为window，并不是obj。这里有多项的时候，会将最后一项的函数体内容复制出来执行，指向window，和自执行方法一样

(obj.fn)() // obj，只有一项时是正常表现
```
