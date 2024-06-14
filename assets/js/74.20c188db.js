(window.webpackJsonp=window.webpackJsonp||[]).push([[74],{481:function(a,t,e){"use strict";e.r(t);var r=e(2),s=Object(r.a)({},(function(){var a=this,t=a._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h2",{attrs:{id:"名称"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#名称"}},[a._v("#")]),a._v(" 名称：")]),a._v(" "),t("p",[a._v("aof_to_pika")]),a._v(" "),t("h2",{attrs:{id:"位置"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#位置"}},[a._v("#")]),a._v(" 位置：")]),a._v(" "),t("p",[a._v("pika bin目录下")]),a._v(" "),t("h2",{attrs:{id:"目的"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#目的"}},[a._v("#")]),a._v(" 目的：")]),a._v(" "),t("p",[a._v("方便Redis数据到Pika的迁移")]),a._v(" "),t("h2",{attrs:{id:"背景"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#背景"}},[a._v("#")]),a._v(" 背景：")]),a._v(" "),t("p",[a._v("Pika兼容Redis协议，所以任何使用于Redis的迁移工具同样也适用于Pika，Redis-cli本身提供了一个pipe参数来完成Redis到Redis的数据迁移。该工具的实现方式为读取待迁移Redis的aof文件并批量发送到目的Redis。Berry借鉴这种方式，并增加了如下改进：")]),a._v(" "),t("ul",[t("li",[a._v("迁移过程中，不断读取aof新增内容")]),a._v(" "),t("li",[a._v("错误输出")]),a._v(" "),t("li",[a._v("线程并行方式代替串行方式，提高迁移效率")])]),a._v(" "),t("h2",{attrs:{id:"实现"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#实现"}},[a._v("#")]),a._v(" 实现：")]),a._v(" "),t("h3",{attrs:{id:"reader线程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#reader线程"}},[a._v("#")]),a._v(" reader线程")]),a._v(" "),t("ol",[t("li",[a._v("tail -f 的方式读取指定aof文件中的内容")]),a._v(" "),t("li",[a._v("根据设定的单次发送长度拼装成块，依次来减少网络通信")]),a._v(" "),t("li",[a._v("将要发送的块压入队列")])]),a._v(" "),t("h3",{attrs:{id:"sender线程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#sender线程"}},[a._v("#")]),a._v(" sender线程")]),a._v(" "),t("ol",[t("li",[a._v("从队列中读取一个发送块")]),a._v(" "),t("li",[a._v("发送到目的服务器")]),a._v(" "),t("li",[a._v("处理reply信息并做统计")])]),a._v(" "),t("h2",{attrs:{id:"使用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#使用"}},[a._v("#")]),a._v(" 使用：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("Parameters:\n-i: aof file\n-h: the target host\n-p: the target port\n-a: the target auth\n-v: show more information\nExample: ./aof_to_pika -i ./appendonly.aof -h [pika_ip] -p [pika_port] -a abc -v\n")])])])])}),[],!1,null,null,null);t.default=s.exports}}]);