(window.webpackJsonp=window.webpackJsonp||[]).push([[96],{506:function(t,l,i){"use strict";i.r(l);var a=i(2),e=Object(a.a)({},(function(){var t=this,l=t._self._c;return l("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[l("p",[t._v("pika新版binlog标记时间戳，因此开发了新旧binlog转换及新binlog转换到可读binlog的转换工具")]),t._v(" "),l("h2",{attrs:{id:"工具目录"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#工具目录"}},[t._v("#")]),t._v(" 工具目录：")]),t._v(" "),l("p",[t._v("pika/tools/binlog_tools/binlog_parser")]),t._v(" "),l("h2",{attrs:{id:"使用参数"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#使用参数"}},[t._v("#")]),t._v(" 使用参数：")]),t._v(" "),l("ul",[l("li",[t._v("-h -- 显示帮助")]),t._v(" "),l("li",[t._v("-c --转换方式：new2old old2new new2read")]),t._v(" "),l("li",[t._v("-i -- 输入的binlog 默认: ./old_log/write2file0")]),t._v(" "),l("li",[t._v("-o -- 输出binlog的路径，默认 : ./new_log/")])]),t._v(" "),l("h2",{attrs:{id:"样例"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#样例"}},[t._v("#")]),t._v(" 样例:")]),t._v(" "),l("div",{staticClass:"language- extra-class"},[l("pre",{pre:!0,attrs:{class:"language-text"}},[l("code",[t._v(". /binlog_parser -c old2new -i ./old_log/write2file0,write2file1，write2file2 -o ./new_log/\n\n")])])]),l("h2",{attrs:{id:"注意"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#注意"}},[t._v("#")]),t._v(" 注意：")]),t._v(" "),l("ol",[l("li",[t._v("程序检查输入的binlog是否是连续的，因此请输入连续的binlog名")]),t._v(" "),l("li",[t._v("程序检测binlog名字是否是write2file开头的，路径后是否跟随write2file等，否则都会打印相应错误")]),t._v(" "),l("li",[t._v("由于manifest文件更新不一定及时，相应offset未更新入manifest的binlog数据在转换工程中会丢失")])]),t._v(" "),l("h2",{attrs:{id:"性能指标"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#性能指标"}},[t._v("#")]),t._v(" 性能指标：")]),t._v(" "),l("p",[t._v("经测算，新旧binlog转换时间，100m文件转换时间为秒级，1到10秒不等。新binlog到可读binlog的转换到10秒到20秒不等")])])}),[],!1,null,null,null);l.default=e.exports}}]);