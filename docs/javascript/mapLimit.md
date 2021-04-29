# 用 js 实现并发控制

类似的 js 库 eventproxy, [async](http://caolan.github.io/async/v3/docs.html#mapLimit)

- [参考文章](https://github.com/Weiyu-Chen/blog)

```js
/**
 * @params list {Array} - 要迭代的数组
 * @params limit {Number} - 并发数量控制数
 * @params asyncHandle {Function} - 对`list`的每一个项的处理函数，参数为当前处理项，必须 return 一个Promise来确定是否继续进行迭代
 * @return {Promise} - 返回一个 Promise 值来确认所有数据是否迭代完成
 */
let mapLimit = (list, limit, asyncHandle) => {
  let recursion = (arr) => {
    return asyncHandle(arr.shift())
      .then(()=>{
        if (arr.length !== 0) return recursion(arr)   // 数组还未迭代完，递归(注意这里 return 的实际是一个继续执行的 promise)继续进行迭代
        else return 'finish';
      })
  };

  let listCopy = [].concat(list);
  let asyncList = []; // 正在进行的所有并发异步操作
  while(limit--) {
    asyncList.push(recursion(listCopy));
  }
  return Promise.all(asyncList);  // 所有并发异步操作都完成后，本次并发控制迭代完成
}
```

测试异步并发情况:

```js
var dataLists = [1,2,3,4,5,6,7,8,9,11,100,123];
var count = 0;
mapLimit(dataLists, 3, (curItem)=>{
  return new Promise(resolve => {
    count++
    setTimeout(()=>{
      console.log(curItem, '当前并发量:', count--)
      resolve();
    }, Math.random() * 5000)
  });
}).then(response => {
  console.log('finish', response) // ["finish", "finish", "finish"] 这里感觉设计的不科学
})
```

测试手动抛出异常中断并发函数:

```js
var dataLists = [1,2,3,4,5,6,7,8,9,11,100,123];
var count = 0;
mapLimit(dataLists, 3, (curItem)=>{
  return new Promise((resolve, reject) => {
    count++
    setTimeout(()=>{
      console.log(curItem, '当前并发量:', count--)
      if(curItem > 4) reject('error happen')
      resolve();
    }, Math.random() * 5000)
  });
}).then(response => {
  console.log('finish', response)
})
```

感觉上边的实现还不是很好，因为最终无法拿到完整的顺序的结果

## 上边的优化

这个实现就类似 [async#mapLimit](http://caolan.github.io/async/v3/docs.html#mapLimit) 的实现

```js
function sendRequest(list = [], max = 5, handler, callback) {
  if (!handler) {
    return new Error('handler 必传')
  }
  let result = [] // 最终结果
  //将urls根据max做分组，一共分为times组，每个组里面最多包含max个url
  let listObj = {};
  let times = Math.ceil(list.length / max);
  let currentIndex = 0;
  for (let i = 0; i < times; i++) {
    listObj[i] = list.slice(i * max, (i + 1) * max);
  }

  let send = () => {
    if (listObj[currentIndex]) {
      Promise.all(listObj[currentIndex].map((item, i) => handler(item, i + currentIndex * max)))
        .then((res) => {
          console.log(res, `第${currentIndex}批请求成功`);
          result = [...result, ...res]
          currentIndex++;
          if (times === currentIndex) {
            callback(result);
          }
          //此处可加个定时器，模拟请求接口耗时
          //递归调用，直到 !listObj[currentIndex] 为止
          send();
        }).catch((err) => {
          console.log(err);
        })
    }
  };
  send();
}

let urls = [
    'aaa',
    'bbb',
    'ccc',
    'ddd',
    'eee'
];
let max = 4;
let callback = (result) => {
  console.log('全部请求完成');
  console.log(result)
};
let request = function (url, i) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('url ===' + url + '===' + i)
    }, Math.floor(Math.random() * 1000 * 5))
  })
}
sendRequest(urls, max, request, callback);
```

## 一道面试题

```js
class Scheduler {
  constructor() {
    this.count = 0
    this.waitFn = []
  }
  add(promiseCreator) {
    return new Promise((resolve, reject) => {
      if (this.count < 2) {
        // exec
        this.count++
        promiseCreator().then(data => {
          console.log(data)
          this.count--
          if (this.waitFn.length > 0) {
            this.add(this.waitFn.shift())
          }
          resolve(data)
        })
      } else {
        this.waitFn.push(promiseCreator)
      }
    })
  }
  // add(promiseCreator) {
  //   if (this.count < 2) {
  //     // exec
  //     this.count++
  //     promiseCreator().then(data => {
  //       console.log(data)
  //       this.count--
  //       if (this.waitFn.length > 0) {
  //         this.add(this.waitFn.shift())
  //       }
  //       return data
  //     })
  //   } else {
  //     this.waitFn.push(promiseCreator)
  //   }
  // }
}

const timeout = time => {
  return new Promise(resolve => {
    return setTimeout(resolve, time)
  })
}

const scheduler = new Scheduler()

const addTask = (time, order) => {
  scheduler.add(() =>
    timeout(time).then(() => {
      console.log(order, ':', Date.now())
      return order
    })
  )
}

addTask(1000, 1)
addTask(200, 2)
addTask(300, 3)
addTask(700, 4)
// 2 ":" 1559717284359
// 3 ":" 1559717284458
// 4 ":" 1559717285060
// 1 ":" 1559717285156
```

```js
class Scheduler {
  constructor(){
    this.doing = 0;
    this.queue = [];
  }

  add(promiseCreator) {
    this.queue.push(promiseCreator);
    this.dotask();
  }

  dotask(){
    if(this.doing < 2){
      this.doing += 1;
      if(this.queue.length !== 0){
        let item = this.queue.shift();
        item().then(()=>{
          this.doing -= 1;
          this.dotask();
        })
      }
    }
  }
}

const timeout = time => {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
};

const scheduler = new Scheduler();

const addTask = (time, order) => {
  scheduler.add(() => timeout(time)
    .then(() => console.log(order, ':', Date.now()))
  )
}

console.log(Date.now())
addTask(1000, 1)
addTask(200, 2)
addTask(300, 3)
addTask(700, 4)
// 2 ":" 1559722511192
// 3 ":" 1559722511495
// 1 ":" 1559722511995
// 4 ":" 1559722512200
```

## 补充

```js
// async-pool并发请求控制

// 保证顺序和全部结果
function createRequest (tasks, pool = 5) {
  let results = []
  let together = new Array(pool).fill(null)
  let index = 0
  together = together.map(() => {
    return new Promise((resolve, reject) => {
      const run = function run () {
        if (index >= tasks.length) {
          resolve()
          return
        }
        let old_index = index
        let task = tasks[index++]
        task().then(result => {
          results[old_index] = result
          run()
        }).catch(reason => {
          reject(reason)
        })
      }
      run()
    })
  })
  return Promise.all(together).then(() => {
    return results
  })
}

createRequest(tasks, 2).then(results => {
  console.log('都成功认为成功，拿到完整请求结果且符合传入任务顺序', results)
}).catch(reason => {
  console.log('只要有一个失败就认为失败', reason)
})

// 不保证全部成功
function createRequest (tasks, pool, callback) {
  class TaskQuene {
    running = 0
    queue = []
    results = []
    pushTask (task) {
      let self = this
      self.queue.push(task)
      self.next()
    }
    next () {
      let self = this
      while (self.running < pool && self.queue.length) {
        self.running++
        let task = self.queue.shift()
        task().then(result => {
          self.results.push(result)
        }).finally(() => {
          self.running--
          self.next()
        })
      }
      if (self.running === 0) {
        callback(results)
      }
    }
  }

  let TQ = new TaskQueue
  tasks.forEach(task => TQ.pushTask(task))
}
```