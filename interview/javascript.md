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
