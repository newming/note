# 获取 post 请求数据

表单数据提交

```js
var http = require('http');
var querystring = require('querystring');

var postHTML =
  '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
  '<body>' +
  '<form method="post">' +
  '网站名： <input name="name"><br>' +
  '网站 URL： <input name="url"><br>' +
  '<input type="submit">' +
  '</form>' +
  '</body></html>';

http.createServer(function (req, res) {
  var body = "";
  req.on('data', function (chunk) {
    body += chunk;
  });
  req.on('end', function () {
    // 解析参数
    body = querystring.parse(body);
    // 设置响应头部信息及编码
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});

    if(body.name && body.url) { // 输出提交的数据
        res.write("网站名：" + body.name);
        res.write("<br>");
        res.write("网站 URL：" + body.url);
    } else {  // 输出表单
        res.write(postHTML);
    }
    res.end();
  });
}).listen(3000);
```

文件上传: 注意 form 表单添加 enctype="multipart/form-data"

```js
var http = require("http");
var formidable = require('formidable');
var util = require("util");
var fs = require("fs");
var sd = require("silly-datetime");
var path = require("path");


//创建服务器
var server = http.createServer(function(req,res){
  //如果你的访问地址是这个，并且请求类型是post
  if(req.url == "/dopost" && req.method.toLowerCase() == "post"){
    //Creates a new incoming form.
    var form = new formidable.IncomingForm();
    //设置文件上传存放地址
    form.uploadDir = "./uploads";
    //执行里面的回调函数的时候，表单已经全部接收完毕了。
    form.parse(req, function(err, fields, files) {
      //if(err){
      //    throw err;
      //}
      //console.log(util.inspect({fields: fields, files: files}));

      //时间，使用了第三方模块，silly-datetime
      var ttt = sd.format(new Date(), 'YYYYMMDDHHmmss');
      var ran = parseInt(Math.random() * 89999 + 10000);
      var extname = path.extname(files.tupian.name);
      //执行改名
      var oldpath = __dirname + "/" + files.tupian.path;
      //新的路径由三个部分组成：时间戳、随机数、拓展名
      var newpath = __dirname + "/uploads/" + ttt + ran + extname;

      //改名
      fs.rename(oldpath,newpath,function(err){
        if(err){
          throw Error("改名失败");
        }
        res.writeHead(200, {'content-type': 'text/plain'});
        res.end("成功");
      });
    });
  }else if(req.url == "/"){
    //呈递form.html页面
    fs.readFile("./form.html",function(err,data){
      res.writeHead(200, {'content-type': 'text/html'});
      res.end(data);
    })
  }else{
    res.writeHead(404, {'content-type': 'text/html'});
    res.end("404");
  }
});

server.listen(80,"192.168.41.36");
```