# 虚拟列表

## 什么是长列表?

前端的业务开发中会遇到一些数据量大且无法使用分页方式来加载的列表，一般把这种列表叫做长列表。完整渲染的长列表基本上很难达到业务上的要求的，非完整渲染的长列表一般有两种方式：

- 懒渲染:这个就是常见的无限滚动，每次只渲染一部分(比如 15 条)，等剩余部分滚动到可见区域，就在渲染另一部分
- 可视区域渲染：只渲染可见部分，不可见部分不渲染

> 虚拟列表就是采用的可视区渲染方式优化

## 虚拟列表的实现原理

虚拟列表是一种长列表优化方案，是可视区渲染列表，其中需要知道两个概念:

- 可滚动区域：假设有 1000 条数据，每个列表项的高度是 30，那么可滚动的区域的高度是 1000\*30.当用户改变列表的滚动条的当前滚动值的时候，会造成可见区域的内容的改变
- 可见区域：比如列表的高度是 300，右侧有纵向滚动条可以滚动，那么视觉可见的区域就是可见区域

用数组保存所有列表元素的位置，只渲染可视区域内的列表元素，当可视区滚动时，根据滚动的 offset 大小以及所有列表元素的位置，计算在可视区应该渲染哪些元素

## 实现参考

实现虚拟列表就是处理滚动条滚动后的可见区域的变更，具体实现的步骤如下：

1. 计算当前可见区域起始数据的 startIndex
2. 计算当前可见区域结束数据的 endIndex
3. 计算当前可见区域的数据，并渲染到页面中
4. 计算 startIndex 对应的数据在整个列表中的偏移位置 startOffset,并设置到列表上

先假想一下：每个列表项的高度都是 30px。在这个基准下，核心 js 代码不超过十行。但是可以完成的实现可见区域的渲染和更新

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>简单实现虚拟列表</title>
  </head>
  <style>
    .list-view {
      height: 400px;
      overflow: auto;
      position: relative;
      border: 1px solid #aaa;
    }

    .list-view-phantom {
      /* 使用不可见区域，撑起这个列表，让列表的滚动条出现 */
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      z-index: -1;
    }

    .list-view-content {
      left: 0;
      right: 0;
      top: 0;
      position: absolute;
    }

    .list-view-item {
      padding: 5px;
      color: #666;
      line-height: 30px;
      box-sizing: border-box;
    }

    [v-cloak] {
      display: none;
    }
  </style>
  <body>
    <div id="app" v-cloak>
      <div class="list-view" ref="scrollBox" @scroll="handleScroll">
        <div
          class="list-view-phantom"
          :style="{
                       height: contentHeight
                    }"
        ></div>
        <div ref="content" class="list-view-content">
          <div
            class="list-view-item"
            :style="{
                        height: itemHeight + 'px'
                      }"
            v-for="item in visibleData"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
      new Vue({
        el: "#app",
        computed: {
          contentHeight() {
            return this.data.length * this.itemHeight + "px";
          },
        },
        mounted() {
          this.updateVisibleData();
        },
        data() {
          return {
            data: new Array(100).fill(1),
            itemHeight: 30,
            visibleData: [],
          };
        },
        methods: {
          updateVisibleData(scrollTop = 0) {
            const visibleCount = Math.ceil(
              this.$refs.scrollBox.clientHeight / this.itemHeight
            );
            const start = Math.floor(scrollTop / this.itemHeight);
            const end = start + visibleCount;
            this.visibleData = this.data.slice(start, end);
            this.$refs.content.style.webkitTransform = `translate3d(0, ${start *
              this.itemHeight}px, 0)`;
          },
          handleScroll() {
            const scrollTop = this.$refs.scrollBox.scrollTop;
            this.updateVisibleData(scrollTop);
          },
        },
      });
    </script>
  </body>
</html>
```
