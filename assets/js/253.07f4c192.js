(window.webpackJsonp=window.webpackJsonp||[]).push([[253],{620:function(s,a,t){"use strict";t.r(a);var n=t(40),e=Object(n.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"关机与重启命令"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#关机与重启命令"}},[s._v("#")]),s._v(" 关机与重启命令")]),s._v(" "),t("h2",{attrs:{id:"shutdown-命令"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#shutdown-命令"}},[s._v("#")]),s._v(" shutdown 命令")]),s._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("shutdown")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("选项"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" 时间\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# now 代表当前时间")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("shutdown")]),s._v(" -r now "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# & 符号可以将该任务放到后台执行，否则命令行会停在当前进程")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("shutdown")]),s._v(" -r 05:30 "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br")])]),t("ul",[t("li",[s._v("-c: 取消前一个关机命令")]),s._v(" "),t("li",[s._v("-h: 关机")]),s._v(" "),t("li",[s._v("-r: 重启")])]),s._v(" "),t("h2",{attrs:{id:"其他"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#其他"}},[s._v("#")]),s._v(" 其他")]),s._v(" "),t("ul",[t("li",[s._v("half")]),s._v(" "),t("li",[s._v("poweroff")]),s._v(" "),t("li",[s._v("init 0")])]),s._v(" "),t("p",[s._v("重启")]),s._v(" "),t("ul",[t("li",[s._v("reboot")]),s._v(" "),t("li",[s._v("init 6")])]),s._v(" "),t("h2",{attrs:{id:"系统运行级别"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#系统运行级别"}},[s._v("#")]),s._v(" 系统运行级别")]),s._v(" "),t("ul",[t("li",[s._v("0: 关机")]),s._v(" "),t("li",[s._v("1: 单用户")]),s._v(" "),t("li",[s._v("2: 不完全多用户，不含 NFS 服务")]),s._v(" "),t("li",[s._v("3: 完全多用户")]),s._v(" "),t("li",[s._v("4: 未分配")]),s._v(" "),t("li",[s._v("5: 图形界面")]),s._v(" "),t("li",[s._v("6: 重启")])]),s._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 修改系统默认运行级别")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("cat")]),s._v(" /etc/inittab\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# id:3initdefault:")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 上边的命令发现已经过期了")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看默认运行级别")]),s._v("\nsystemctl get-default\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 设置默认运行级别")]),s._v("\nsystemctl set-default Target.target\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看系统运行级别")]),s._v("\nrunlevel "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 默认为 N 3 其中 N 代表之前的级别，N代表没有，3代表现在的级别")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br")])]),t("h2",{attrs:{id:"退出登录"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#退出登录"}},[s._v("#")]),s._v(" 退出登录")]),s._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("logout")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])])])}),[],!1,null,null,null);a.default=e.exports}}]);