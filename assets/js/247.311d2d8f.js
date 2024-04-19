(window.webpackJsonp=window.webpackJsonp||[]).push([[247],{612:function(s,t,n){"use strict";n.r(t);var a=n(40),e=Object(a.a)({},(function(){var s=this,t=s.$createElement,n=s._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("h1",{attrs:{id:"find-搜索命令"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#find-搜索命令"}},[s._v("#")]),s._v(" find 搜索命令")]),s._v(" "),n("p",[s._v("搜索文件")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[s._v("find")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("搜索范围"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("搜索条件"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br")])]),n("blockquote",[n("p",[s._v("避免大范围搜索，会非常耗费系统资源")])]),s._v(" "),n("blockquote",[n("p",[s._v("find是在系统当中搜索符合条件的文件名。如果需要匹配，使用通配符匹配，通配符是完全匹配")])]),s._v(" "),n("p",[s._v("通配符：")]),s._v(" "),n("ul",[n("li",[s._v("*: 匹配任意内容")]),s._v(" "),n("li",[s._v("?: 匹配任意一个字符")]),s._v(" "),n("li",[s._v("[]: 匹配任意一个中括号内的字符")])]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 包含通配符的需要用括号包起来")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("find")]),s._v(" /root -name "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"install.log*"')]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br")])]),n("p",[s._v("参数：")]),s._v(" "),n("p",[s._v("find / -name test.text")]),s._v(" "),n("ul",[n("li",[s._v("name: 按照文件名搜索")]),s._v(" "),n("li",[s._v("iname: 不区分大小写匹配文件名称")]),s._v(" "),n("li",[s._v("user: 按所有者搜索 find /root -user root")]),s._v(" "),n("li",[s._v("nouser: 查找没有所有者的文件，在 linux 中一般为垃圾文件，出了内核运行产生的或者是 U 盘的插入产生的")]),s._v(" "),n("li",[s._v("mtime: find /var/log -mtine +10 查找10天前修改的文件 -10，十天内，10 正好前第十天")]),s._v(" "),n("li",[s._v("atime: 文件访问时间")]),s._v(" "),n("li",[s._v("ctime: 改变文件属性")]),s._v(" "),n("li",[s._v("size: 按照文件大小搜索 +25k 大于25k，- 代表小于。注意单位区分大小写，k 小写，M 大写。不写单位默认按照 扇区 搜索，一个扇区是 512k")]),s._v(" "),n("li",[s._v("inum: 查找 i 节点是某个值 find /etc -inum 262411")]),s._v(" "),n("li",[s._v("a: 逻辑与，两个条件都满足 find /etc/ -size +20k -a -size -50k")]),s._v(" "),n("li",[s._v("o: 逻辑或，两个条件满足一个即可")]),s._v(" "),n("li",[s._v("exec/ok: 完整命令 -exec 命令 {} ;，对搜索结果执行的操作，注意结尾 {} ;")])])])}),[],!1,null,null,null);t.default=e.exports}}]);