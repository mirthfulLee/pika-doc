(window.webpackJsonp=window.webpackJsonp||[]).push([[105],{513:function(a,t,s){"use strict";s.r(t);var e=s(2),r=Object(e.a)({},(function(){var a=this,t=a._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h2",{attrs:{id:"说明"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#说明"}},[a._v("#")]),a._v(" 说明")]),a._v(" "),t("p",[a._v("pika新版binlog有时间戳，开发binlog_sender工具，根据输入的时间段回放对应数据到某个pika实例")]),a._v(" "),t("h2",{attrs:{id:"工具目录"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#工具目录"}},[a._v("#")]),a._v(" 工具目录：")]),a._v(" "),t("p",[a._v("pika/tools/binlog_tools/binlog_sender")]),a._v(" "),t("h2",{attrs:{id:"使用参数"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#使用参数"}},[a._v("#")]),a._v(" 使用参数：")]),a._v(" "),t("p",[a._v("-h -- 显示帮助 -t -- l 显示日志类型，old 或new -i -- pika实例的ip -p -- pika实例的port -n -- 输入的binlog的路径 -f -- 要转换的binlog号 -s -- 规定的起始时间点, 默认: '2001-00-00 00:59:01' -e -- 规定的结束时间点, 默认: '2100-01-30 24:00:01'")]),a._v(" "),t("h2",{attrs:{id:"样例"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#样例"}},[a._v("#")]),a._v(" 样例:")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("./binlog_sender -n /data2/wangwenduo/newlog/ -t new -i 127.0.0.1 -p 10221 -s '2001-10-11 11:11:11' -e '2020-12-11 11:11:11' -f 526,527\n")])])]),t("h2",{attrs:{id:"注意"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#注意"}},[a._v("#")]),a._v(" 注意：")]),a._v(" "),t("p",[a._v("因为依次发送binlog，过程中可能会丢部分请求。因此当使用binlog_sender回放后，不要删掉对应的文件以防丢数据")]),a._v(" "),t("h2",{attrs:{id:"性能指标"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#性能指标"}},[a._v("#")]),a._v(" 性能指标：")]),a._v(" "),t("p",[a._v("经测算，新binlog到pika实例 ，100m文件转换时间为分钟级，和机器及网络有关")])])}),[],!1,null,null,null);t.default=r.exports}}]);