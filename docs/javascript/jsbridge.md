# jsBridge 原理

[参考文章](https://juejin.cn/post/6844903585268891662)

用途主要是 给 JavaScript 提供调用 Native 功能的接口，让混合开发中的『前端部分』可以方便地使用地址位置、摄像头甚至支付等 Native 功能。是 Native 和非 Native 之间的桥梁，它的核心是 构建 Native 和非 Native 间消息通信的通道，而且是 双向通信的通道。

## 通信原理

JavaScript 调用 Native 的方式，主要有两种：Native 端注入 API 和 拦截 URL SCHEME。

url scheme 兼容性更好，它的缺点:

- URL 有长度隐患
- 创建请求耗时比注入 API 的方式更长

相比于 JavaScript 调用 Native， Native 调用 JavaScript 较为简单，毕竟不管是 iOS 的 UIWebView 还是 WKWebView，还是 Android 的 WebView 组件，都以子组件的形式存在于 View/Activity 中，直接调用相应的 API(window 上的方法) 即可

## Hybrid

[参考文档](https://juejin.cn/post/6844903466465230862)

优点

- 快速迭代：Native 开发最大的问题是版本更新问题，更新频繁则版本碎片化严重，每个研发周期内做的需求有限，在快速试错抢夺用户的新 App，Native 版本迭代是不明智的；对于大型的 APP，需求控制不住，迭代更加是个灾难
- 跨平台统一模板：Hybrid App 可以统一 H5、安卓、iOS 、WP 等任何端的代码（因为实际都是 Html 页面。。），通过组件化和构建工具很容易实现多端统一，而组件化和构建工具在前端圈都有成型的解决方案
- 相对 Native，成本更小：无论人力投入、资源投入还是研发周期调试成本都比 Native 有优势
- 体验优于普通 H5：内置的模板，启动速度要比普通 H5 快，借住 Native 增强的端能力和 UI 组件增强，要比 H5 的体验更好，比如：图片查看器、扫码、视频播放等
- 普通 H5 可以快速接入，快速升级：本质上就是 H5 页面，所以普通的 H5 经过简单改造就可以作为 Hybrid 模板使用，而且类似 PWA 这类解决方案提出之后，又可以进行升级
- 生态建设：Hybrid 使用 H5 增强技术，降低接入成本，对于大型 APP，可以快速进行生态建设
- 现在主流 App 都是 Hybrid：QQ、微信、支付宝、淘宝、手百

缺点: 渲染性能和用户体验要比 Native 差一些
