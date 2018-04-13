# 高级函数

- 惰性载入函数
- 函数柯里化
- 级联函数

## 惰性载入函数

```js
// 兼容 ajax
function createXHR () {
  var xhr = null
  try {
    xhr = new XMLHttpRequest()
  } catch (e) {
    // IE
    try {
      xhr = new ActiveXObject('Msxml2.XMLHTTP')
    } catch (e) {
      try {
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
      } catch (e) {
        xhr = null
      }
    }
  }

  return xhr
}

// 惰性函数，执行第二次生效
function createXHR () {
  var xhr = null
  if (typeof XMLHttpRequest != undefined) {
    xhr = new XMLHttpRequest()
    createXHR = function () {
      return new XMLHttpRequest()
    }
  } else {
    try {
      xhr = new ActiveXObject('Msxml2.XMLHTTP')
      createXHR = function () {
        return new ActiveXObject('Msxml2.XMLHTTP')
      }
    } catch (e) {
      try {
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
        createXHR = function () {
          return new ActiveXObject('Microsoft.XMLHTTP')
        }
      } catch (e) {
        xhr = null
        createXHR = function () {
          return null
        }
      }
    }
  }

  return xhr
}
```

## 函数柯里化

合并参数:第一个函数的参数合并成整体的参数传递给统一的函数

```js
function add (num1, num2) {
  return num1 + num2
}

function totalAdd (num3) {
  return num3 + add(1, 2)
}

alert(totalAdd(50))

// 柯里化
function curry (fn) {
  var args = Array.prototype.slice.call(arguments, 1)
  return function () {
    var innerArgs = Array.prototype.slice.call(arguments)
    var finalArgs = args.concat(innerArgs)
    return fn.apply(this, finalArgs)
  }
}

function add (num1, num2, num3) {
  return num1 + num2 + num3
}
curry(add, 50)(4, 6)
```

## 级联函数

链式调用