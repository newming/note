# Router 实现

[参考文章](https://juejin.im/post/5ac61da66fb9a028c71eae1b)

## hashRouter 实现

```js
class Routers {
  constructor() {
    // 储存hash与callback键值对
    this.routes = {};
    // 当前hash
    this.currentUrl = '';
    // 记录出现过的hash
    this.history = [];
    // 作为指针,默认指向this.history的末尾,根据后退前进指向history中不同的hash
    this.currentIndex = this.history.length - 1;
    this.refresh = this.refresh.bind(this);
    this.backOff = this.backOff.bind(this);
    // 默认不是后退操作
    this.isBack = false;
    window.addEventListener('load', this.refresh, false);
    window.addEventListener('hashchange', this.refresh, false);
  }

  route(path, callback) {
    this.routes[path] = callback || function () {};
  }

  refresh() {
    this.currentUrl = location.hash.slice(1) || '/';
    if (!this.isBack) {
      // 如果不是后退操作,且当前指针小于数组总长度,直接截取指针之前的部分储存下来
      // 此操作来避免当点击后退按钮之后,再进行正常跳转,指针会停留在原地,而数组添加新hash路由
      // 避免再次造成指针的不匹配,我们直接截取指针之前的数组
      // 此操作同时与浏览器自带后退功能的行为保持一致
      if (this.currentIndex < this.history.length - 1) {
        this.history = this.history.slice(0, this.currentIndex + 1);
      }
      this.history.push(this.currentUrl);
      this.currentIndex++;
    }
    this.routes[this.currentUrl]();
    console.log('指针:', this.currentIndex, 'history:', this.history);
    this.isBack = false;
  }
  // 后退功能
  backOff() {
    // 后退操作设置为true
    this.isBack = true;
    this.currentIndex <= 0 ?
      (this.currentIndex = 0) :
      (this.currentIndex = this.currentIndex - 1);
    location.hash = `#${this.history[this.currentIndex]}`;
    this.routes[this.history[this.currentIndex]]();
  }
}
```

使用：

```html
<ul>
  <li>
    <a href="#/">turn yellow</a>
  </li>
  <li>
    <a href="#/blue">turn blue</a>
  </li>
  <li>
    <a href="#/green">turn green</a>
  </li>
</ul>
<button onclick="back()">back</button>
```

```js
window.Router = new Routers();
var content = document.querySelector('body');
// change Page anything
function changeBgColor(color) {
  content.style.backgroundColor = color;
}
Router.route('/', function() {
  changeBgColor('yellow');
});
Router.route('/blue', function() {
  changeBgColor('blue');
});
Router.route('/green', function() {
  changeBgColor('green');
});
function back() {
  Router.backOff()
}
```

## h5 History API Router 实现

```js
class Routers {
  constructor() {
    this.routes = {};
    // 在初始化时监听popstate事件
    this._bindPopState();
  }
  // 初始化路由
  init(path) {
    history.replaceState({
      path: path
    }, null, path);
    this.routes[path] && this.routes[path]();
  }
  // 将路径和对应回调函数加入hashMap储存
  route(path, callback) {
    this.routes[path] = callback || function () {};
  }

  // 触发路由对应回调
  go(path) {
    history.pushState({
      path: path
    }, null, path);
    this.routes[path] && this.routes[path]();
  }
  // 监听popstate事件
  _bindPopState() {
    // popstate事件,每当同一个文档的浏览历史（即history对象）出现变化时，就会触发popstate事件。
    // 需要注意的是，仅仅调用pushState方法或replaceState方法 ，并不会触发该事件，只有用户点击浏览器倒退按钮和前进按钮，或者使用 JavaScript 调用back、forward、go方法时才会触发。
    // 所以上边的 go init 方法需要手动执行 this.routes[path]();
    window.addEventListener('popstate', e => {
      console.log(e)
      const path = e.state && e.state.path;
      this.routes[path] && this.routes[path]();
    });
  }
}
```

使用：

```html
<!-- 需要启动一个 server 才可以 -->
<ul>
  <li>
    <a href="/">turn yellow</a>
  </li>
  <li>
    <a href="/blue">turn blue</a>
  </li>
  <li>
    <a href="/green">turn green</a>
  </li>
</ul>
```

```js
window.Router = new Routers();
Router.init(location.pathname);
const content = document.querySelector('body');
const ul = document.querySelector('ul');
function changeBgColor(color) {
  content.style.backgroundColor = color;
}

Router.route('/', function() {
  changeBgColor('yellow');
});
Router.route('/blue', function() {
  changeBgColor('blue');
});
Router.route('/green', function() {
  changeBgColor('green');
});

ul.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    e.preventDefault();
    Router.go(e.target.getAttribute('href'));
  }
});
```