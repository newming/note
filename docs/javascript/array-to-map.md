## 数据转换

[数组转树形结构](https://juejin.cn/post/6992923894722068516)

```js
[
  { key: "key4", parent: "key3" },
  { key: "key5", parent: "key2" },
  { key: "key1", parent: "" },
  { key: "key2", parent: "" },
  { key: "key3", parent: "key1" },
];
// 转变为
[
  {
    key: "key1",
    parent: "key0",
    children: [
      {
        key: "key3",
        parent: "key1",
        children: [
          {
            key: "key4",
            parent: "key3",
          },
        ],
      },
    ],
  },
  {
    key: "key2",
    parent: "key0",
    children: [{ key: "key5", parent: "key2" }],
  },
];

// 好的实现
function toTree(data) {
  let result = [];
  if (!Array.isArray(data)) {
    return result;
  }
  let map = {};
  data.forEach((item) => {
    map[item.key] = item;
  });
  data.forEach((item) => {
    let parent = map[item.parent];
    if (parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      result.push(item);
    }
  });
  return result;
}

// 通过递归，需要保证原始数据层级关系顺序才行
function arrToTree(list, pid = "") {
  let children = [];
  list.forEach((element) => {
    if (!element.parent || element.parent === pid) {
      // 先把一级数组添加到children里
      children.push(element);
      // 然后立刻递归找他的儿子
      element.children = arrToTree(list, element.key);
    }
  });
  return children;
}

// 利用对象是引用数据特性
function convert(list) {
  const obj = {};
  const knowedKeys = list.map((item) => item.key);
  console.log(knowedKeys);
  list.forEach((item) => {
    obj[item.key] = item;
  });
  list.forEach((item) => {
    if (item.parentKey && obj[item.parentKey]) {
      obj[item.parentKey].children = obj[item.parentKey].children || [];
      obj[item.parentKey].children.push(item);
    }
  });
  // 将非第一级的删除
  list.forEach((item) => {
    if (item.parentKey && knowedKeys.includes(item.parentKey)) {
      delete obj[item.key];
    }
  });
  let res = Object.keys(obj).map((key) => {
    return obj[key];
  });
  return res;
}

function convert(list) {
  let knowedKeys = [...new Set(list.map((i) => i.key))];
  let setMap = {};
  let result = [];
  function find(result, key) {
    for (let i = 0; i < result.length; i++) {
      let item = result[i];
      if (item.key === key) {
        return item;
      }
      if (item.children && item.children.length) {
        let has = find(item.children, key);
        if (has) {
          return has;
        }
      }
    }
    return null;
  }
  function set(list) {
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      if (!knowedKeys.includes(item.parentKey)) {
        result.push(item);
        setMap[item.key] = 1;
        list.splice(i, 1);
        i--;
        continue;
      }
      if (knowedKeys.includes(item.parentKey) && setMap[item.parentKey]) {
        let parent = find(result, item.parentKey);
        if (parent) {
          parent.children = parent.children || [];
          parent.children.push(item);
          setMap[item.key] = 1;
          list.splice(i, 1);
          i--;
        }
      }
    }
    if (list.length > 0) {
      set(list);
    }
  }
  set(list);
  return result;
}
```
