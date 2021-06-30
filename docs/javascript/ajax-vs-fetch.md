# ajax和axios和fetch的区别

- ajax: 前后端数据通信(同源、跨域)
- axios: 基于promise封装的ajax库
- fetch: es6新增的通信方法，本身基于promise。只要服务器返回就认为成功，包括400，500

## 基于ajax实现并发限制请求

```js
// npm包: asyncpool，不保证顺序
let tasks = [() => {
  return Promise.resolve(2)
}, () => {
  return Promise.resolve(3)
}]

// asyncPool(limit, tasks, singleHandler, allHandler)
let results = []
asyncPool(2, tasks, (task, next) => {
  task().then(res => {
    results.push(res)
    next()
  })
}, () => {
  console.log(results)
})
```

```js
// 自己实现

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

## fetch实现超时

fetch本身不支持超时设置

```js
function myFetch(fetchPromise, timeout) {
  var abortFn = null
  var abortPromise = new Promise((resolve, reject) => {
    abortFn = function() {
      reject('timeout')
    }
  })

  var abortablePromise = Promise.race(fetchPromise, abortPromise)

  setTimeout(() => {
    abortFn()
  }, timeout)

  return abortablePromise
}
```