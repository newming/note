# Event Bus 实现

[参考文章](https://juejin.im/post/5ac2fb886fb9a028b86e328c)

[github 某个实现](https://github.com/Gozala/events)

```js
class EventEmitter {
  constructor() {
    this._events = this._events || new Map(); // 储存事件/回调键值对
    this._maxListeners = this._maxListeners || 10; // 设立监听上限，这个暂时没有用到，没有实现
  }
}

// 触发名为type的事件
EventEmitter.prototype.emit = function (type, ...args) {
  let handler;
  handler = this._events.get(type);
  if (!handler) {
    return false
  }
  if (Array.isArray(handler)) {
    // 如果是一个数组说明有多个监听者,需要依次此触发里面的函数
    for (let i = 0; i < handler.length; i++) {
      if (args.length > 0) {
        handler[i].apply(this, args);
      } else {
        handler[i].call(this);
      }
    }
  } else { // 单个函数的情况我们直接触发即可
    if (args.length > 0) {
      handler.apply(this, args);
    } else {
      handler.call(this);
    }
  }

  return true;
};

// 监听名为type的事件
EventEmitter.prototype.addListener = function (type, fn) {
  const handler = this._events.get(type); // 获取对应事件名称的函数清单
  if (!handler) {
    this._events.set(type, fn);
  } else if (handler && typeof handler === 'function') {
    // 如果handler是函数说明只有一个监听者
    this._events.set(type, [handler, fn]); // 多个监听者我们需要用数组储存
  } else {
    handler.push(fn); // 已经有多个监听者,那么直接往数组里push函数即可
  }
};

// 移除事件监听
EventEmitter.prototype.removeListener = function (type, fn) {
  const handler = this._events.get(type); // 获取对应事件名称的函数清单
  if (!handler) {
    return true
  }
  // 如果是函数,说明只被监听了一次
  if (typeof handler === 'function') {
    handler === fn && this._events.delete(type); // 这里注意要判断 fn === handle，并且不可以拿到 if 中做 && 连接 if (typeof handler === 'function' && fn === handler)，因为这样的话只有一个 function 但是不想等的话会走到下面的数组中
  } else {
    let postion;
    // 如果handler是数组,说明被监听多次要找到对应的函数
    for (let i = 0; i < handler.length; i++) {
      if (handler[i] === fn) {
        postion = i;
        break;
      } else {
        postion = -1;
      }
    }
    // 如果找到匹配的函数,从数组中清除
    if (postion !== -1) {
      // 找到数组对应的位置,直接清除此回调
      handler.splice(postion, 1);
      // 如果清除后只有一个函数,那么取消数组,以函数形式保存
      if (handler.length === 1) {
        this._events.set(type, handler[0]);
      }
    } else {
      return true;
    }
  }
};
// 移除某个 type 的全部监听
EventEmitter.prototype.removeAllListeners = function (type) {
  const handler = this._events.get(type)
  if (!handler) {
    return true
  }
  this._events.delete(type)
  return true
}
```

使用：

```js
// 实例化
const emitter = new EventEmitter();

// 监听一个名为arson的事件对应一个回调函数
emitter.addListener('newming', man => {
  console.log(`expel ${man}`);
});
emitter.addListener('newming', man => {
  console.log(`next ${man}`);
});

function test(name) {
  console.log('我是命名的', name)
}
emitter.addListener('newming', test);

// 我们触发newming事件,发现回调成功执行
emitter.emit('newming', 'low-end')

setTimeout(() => {
  emitter.removeListener('newming', test)
  emitter.emit('newming', 'low-end')
}, 3000)

setTimeout(() => {
  emitter.removeAllListeners('newming')
  emitter.emit('newming', 'low-end')
})
```