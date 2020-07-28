# JavaScript 设计模式

JavaScript 中的反模式示例：

- 在全局上下文中定义大量的变量污染全局命名空间
- 向 setTimeout 或 setInterval 传递字符串，而不是函数，这会触发 eval() 的内部使用
- 修改 Object 类的原型
- 以内联形式使用 JavaScript，它是不可改变的
- 使用 document.write 而不是 document.createElement

## 设计模式类别

1. 创建型设计模式: 专注于处理对象创建机制，以适合给定情况的方式来创建对象
  - Constructor 构造器
  - Factory 工厂
  - Abstract 抽象
  - Prototype 原型
  - Singleton 单例
  - Builder 生成器
2. 结构型设计模式: 与对象组合有关，通常可以用于找出不同对象之间建立关系的简单方式
  - Decorator 装饰器
  - Facade 外观
  - Flyweight 享元
  - Adapter 适配器
  - Proxy 代理
3. 行为设计模式: 专注于改善或简化系统中不同对象之间的通信
  - Iterator 迭代器
  - Mediator 中介者
  - Observer 观察者
  - Visitor 访问者

## JavaScript 设计模式

- [Constructor 构造器模式](./Constructor.md)
- [Module 模块模式](./Module.md)
- [Revealing Module 揭示模块模式](./RevealingModule.md)
- [Singleton 单例模式](./Singleton.md)
- [Observer 观察者模式](./Observer.md)
