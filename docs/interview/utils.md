# js 一些小方法

```js
// 解析文件大小
function formatSize (s) {
  let size = Number(s)
  if (size < 1024) {
    return size
  } else if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + 'K'
  } else if (size < 1024 * 1024 * 1024) {
    return (size / 1024 / 1024).toFixed(2) + 'M'
  } else {
    return (size / 1024 / 1024 / 1024).toFixed(2) + 'G'
  }
}

// 格式化版本号
function version (v) {
  if (!v) return 0
  v = v.toString()
  let c = v.split('.')
  for (var i = 0; i < c.length; i++) {
    var len = c[i].length
    c[i] = ['0000', '0000', '000', '00', '0', ''][len] + c[i]
  }
  let res = c.join('')
  return res
}

// 是否是 iphoneX
function isIphoneX () {
  return /iphone/gi.test(navigator.userAgent) && (screen.height === 812 && screen.width === 375)
}

// 格式化时间
function formatDuration (time) {
  let duration = Number(time)
  if (duration < 60) {
    return duration + '秒'
  } else if (duration < 60 * 60) {
    return Math.floor(duration / 60) + '分' + (duration % 60 === 0 ? '' : (duration % 60 + '秒'))
  } else {
    return Math.floor(duration / 60 / 60) + '小时' + formatDuration(duration % (60 * 60))
  }
}

// 获取查询字符串中的某个 value
function getQueryString (link, key) {
  let reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i')
  let queryString = link.split('?').length > 1 ? link.split('?')[1] : ''
  let r = queryString.match(reg)
  if (r !== null) return decodeURIComponent(r[2])
  return ''
}

/**
* 将 base64 转成 Blob
* https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
* @param    {string}  b64Data  要转的 base64
* @param    {string}  contentType  要转的类型
* @param    {string}  sliceSize  要分割的尺寸
* @return   {blob}    blob 对象
*/
function b64toBlob (b64Data, contentType, sliceSize) {
  contentType = contentType || ''
  sliceSize = sliceSize || 512

  var byteCharacters = atob(b64Data)
  var byteArrays = []

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize)

    var byteNumbers = new Array(slice.length)
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    var byteArray = new Uint8Array(byteNumbers)

    byteArrays.push(byteArray)
  }

  var blob = new Blob(byteArrays, {type: contentType})
  return blob
}

 /**
  * 给内容中的英文或数字自动增加前后空格
  *
  * @param    {string}  text 要自动加空格的内容
  * @return   {string}       处理完空格后的内容
  */
function formatContent (text) {
  if (typeof text !== 'string') return ''
  // 英文、数字、符号 ([a-z0-9~!@#&;=_\$\%\^\*\-\+\,\.\/(\\)\?\:\'\"\[\]\(\)])
  // 中文在前
  text = text.replace(/([\u4E00-\u9FA5])([a-z0-9@#&;=_\[\$\%\^\*\-\+\(\/])/ig, '$1 $2')
  // 中文在後
  text = text.replace(/([a-z0-9#!~&;=_\]\,\.\:\?\$\%\^\*\-\+\)\/])([\u4E00-\u9FA5])/ig, '$1 $2')
  // 考慮增加 - + / * 前後的空白
  return text
}

/**
  * 是否是 PC 环境
  * @return   {boolean} 如果是 PC 环境则返回 true
  */
function IsPC () {
  var userAgentInfo = navigator.userAgent
  var Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
  var flag = true
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false
      break
    }
  }
  return flag
}

/**
  * 给 url 增加指定的参数，如果 url 中有该参数则替换
  *
  * @param    {string}  url 要加参数的 url
  * @param    {string}  key 要增加的参数名
  * @param    {string}  val 要增加的参数值
  * @return   {string}      处理完的 url
  */
function addUrlParam (url, key, val) {
  let newParam = key + '=' + encodeURIComponent(val)
  let params = '?' + newParam // if the 'url' string not exists return this
  // If the 'url' string exists, then build params from it
  if (url) {
    // Try to replace an existance instance
    params = url.replace(new RegExp('([?&])' + key + '(=[^&]*|(?=&|$))'), '$1' + newParam)
    // If nothing was replaced, then add the new param to the end
    if (params === url && url.indexOf(newParam) < 0) {
      params += (url.indexOf('?') > 0 ? '&' : '?') + newParam
    }
  }
  return params
}

let res = addUrlParam('https://www.baidu.com?cc=123&aaa', 'aa', 'bb')
let res = addUrlParam('https://www.baidu.com?cc=123&aa=', 'aa', 'bb')
let res = addUrlParam('https://www.baidu.com?cc=123&aaa=', 'aa', 'bb')
console.log(res)

/**
  * 截取指定长度的字符串
  * 该截取方法区分全半角字符，需要将全角字符的长度 x2
  * @param    {string}  str 要截取的字符串
  * @param    {number}  len 要截取的字符串长度
  * @return   {string}      截取完毕的字符串
  */
function subString (str, len) {
  let str2 = str.slice(0, len)
  let i = str2.replace(/[x00-xff]/g, '').length
  switch (i) {
    case 0: return str2
    case len: return str.slice(0, len >> 1)
    default:
      let k = len - i
      let str3 = str.slice(k, len)
      let j = str3.replace(/[x00-xff]/g, '').length
      return j ? str.slice(0, k) + this.subString(str3, j) : str.slice(0, k)
  }
}

/**
  * 获取选中节点的文本内容 http://469957559.iteye.com/blog/1999623
  * @return  text 选中的文本内容
  */
function getSelectionText () {
  var text = ''
  if (typeof window.getSelection !== 'undefined') {
    var sel = window.getSelection()
    if (sel.rangeCount) {
      var container = document.createElement('div')
      for (var i = 0, len = sel.rangeCount; i < len; ++i) {
        container.appendChild(sel.getRangeAt(i).cloneContents())
      }
      // text = container.innerHTML
      text = container.innerText
    }
  } else if (typeof document.selection !== 'undefined') {
    if (document.selection.type === 'Text') {
      // text = document.selection.createRange().htmlText
      text = document.selection.createRange().text
    }
  }
  return text
}

// 获取从开始节点到结束节点之间的 textNode
function getAllTextNode (startNode, endNode) {
  let ary = []
  if (startNode.childNodes.length > 0 && startNode.nodeName.toUpperCase() !== 'SCRIPT' && startNode.nodeName.toUpperCase() !== 'SCRIPT' && startNode.nodeName.toUpperCase() !== 'STYLE') {
    let childNode = startNode.childNodes[0]
    let arys = pushNode(childNode, endNode)
    ary = [...ary, ...arys]
    return ary
  }

  if (startNode.nodeName === '#text') {
    ary.push(startNode)
  }

  const nextNode = startNode.nextSibling
  if (nextNode) {
    let arys = pushNode(nextNode, endNode)
    ary = [...ary, ...arys]
  } else {
    let currentNode = startNode.parentNode
    while (currentNode && currentNode.nextSibling === null) {
      currentNode = currentNode.parentNode
    }
    // 这个结束判断和上边 getPrevStr 类似，但是需要注意判断结束一个在 while 内，一个在 while 外
    if (currentNode === endNode) {
      return ary
    }
    if (currentNode) {
      let arys = pushNode(currentNode.nextSibling, endNode)
      ary = [...ary, ...arys]
    }
  }

  return ary
}
```