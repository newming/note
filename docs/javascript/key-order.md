# 对象key顺序

[参考文章](https://zhuanlan.zhihu.com/p/40601459)

## Object.keys输出是key的顺序

1. 如果属性名的类型是Number，那么Object.keys返回值是按照key从小到大排序
2. 如果属性名的类型是String，那么Object.keys返回值是按照属性被创建的时间升序排序。如果key为负数，同字符串
3. 如果属性名的类型是Symbol，那么逻辑同String相同
