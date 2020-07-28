# 寻找是否存在闭环

```js
/**
 * 判断给定的有向线段能否与已有的有向线段形成闭环
 * originFrom: 给定有向线段起点 from
 * originTo: 给定有向线段终点 to
 * arrows: 所有已有线段集合，不存在重复的 [{from: '1', to: '2'}, {from: '2', to: '3'}]
 */

// 1. 垃圾写法
const isCloseLoop = (originFrom, originTo, arrows) => {
  let close = false
  const loop = uuid => {
    for (let o of arrows) {
      if (o.from === uuid) {
        // 如果一个点的 from 等于 上一个点终点
        if (o.to === originFrom) {
          // 并且这个点的终点等于要找的点的起点，说明闭合
          close = true
          return
        } else {
          loop(o.to) // 找下一个相连的点，问题就是每次都会从新遍历所有的节点
        }
      }
    }
  }
  loop(originTo)
  return close
};

// 2. 优化的写法
const isCloseLoop = (originFrom, originTo, arrows) => {
  let obj = {}; // 缓存每条链寻找的结果，之后只要遍历到这个链上任意一个点，都知道结果，从而跳过
  const loop = uuid => {
    let key = originFrom + '_' + uuid;
    if (obj[key] !== undefined) {
      return obj[key];
    }
    for (let i = 0; i < arrows.length; i++) {
      if (arrows[i].from === uuid) {
        if (arrows[i].to === originFrom) {
          obj[key] = true;
          return true;
        } else {
          let r = loop(arrows[i].to);
          obj[key] = r;
          if (r) {
            return true;
          }
        }
      }
    }
    obj[key] = false;
    return false;
  };
  return loop(originTo);
};

// 测试，Uncaught RangeError: Maximum call stack size exceeded，栈益处
let lists = [
    {from: 1, to: 2},
    {from: 1, to: 3},
    {from: 1, to: 4},
    {from: 1, to: 5},
    {from: 1, to: 6},
    {from: 1, to: 7},
    {from: 1, to: 8},
    {from: 1, to: 9},
    {from: 1, to: 10},
    {from: 1, to: 11},
    {from: 1, to: 12},
    {from: 1, to: 13},
    {from: 2, to: 1},
    {from: 2, to: 3},
    {from: 2, to: 4},
    {from: 2, to: 5},
    {from: 2, to: 6},
    {from: 2, to: 7},
    {from: 2, to: 8},
    {from: 2, to: 9},
    {from: 3, to: 1},
    {from: 3, to: 2},
    {from: 3, to: 4},
    {from: 3, to: 5},
    {from: 3, to: 6},
    {from: 3, to: 7},
    {from: 3, to: 8},
    {from: 3, to: 9},
]
console.log(isCloseLoop(6, 3, lists))
```
