(window.webpackJsonp=window.webpackJsonp||[]).push([[77],{486:function(s,t,a){"use strict";a.r(t);var e=a(2),n=Object(e.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h2",{attrs:{id:"简介"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#简介"}},[s._v("#")]),s._v(" 简介")]),s._v(" "),t("p",[s._v("副本一致性提供主从副本在短时间内达到数据一致的功能。")]),s._v(" "),t("p",[s._v("具体请求流程如下：")]),s._v(" "),t("p",[s._v("1，客户端请求到主分片上")]),s._v(" "),t("p",[s._v("2，主分片同步请求到一定个数(replication-num)从分片上")]),s._v(" "),t("p",[s._v("3，主接收到一定个数（consensus-level）的从反馈 ACK")]),s._v(" "),t("p",[s._v("4，数据落盘，返回客户端请求")]),s._v(" "),t("h2",{attrs:{id:"注意"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#注意"}},[s._v("#")]),s._v(" 注意")]),s._v(" "),t("p",[s._v("目前副本一致性功能只能在分片模式下运行。")]),s._v(" "),t("p",[s._v("由于成员变换的功能暂时不支持，不建议在主从关系建立之后更换新的从副本。")]),s._v(" "),t("h2",{attrs:{id:"关于配置"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#关于配置"}},[s._v("#")]),s._v(" 关于配置：")]),s._v(" "),t("div",{staticClass:"language-c extra-class"},[t("pre",{pre:!0,attrs:{class:"language-c"}},[t("code",[t("span",{pre:!0,attrs:{class:"token macro property"}},[t("span",{pre:!0,attrs:{class:"token directive-hash"}},[s._v("#")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token directive keyword"}},[s._v("replication")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token expression"}},[s._v("num defines how many followers in a single raft group"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" only "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" is valid")])]),s._v("\nreplication"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("num "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token macro property"}},[t("span",{pre:!0,attrs:{class:"token directive-hash"}},[s._v("#")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token directive keyword"}},[s._v("consensus")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token expression"}},[s._v("level defines how many confirms does leader get"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" before commit this log to client"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")])])]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token macro property"}},[t("span",{pre:!0,attrs:{class:"token directive-hash"}},[s._v("#")]),s._v("                 "),t("span",{pre:!0,attrs:{class:"token directive keyword"}},[s._v("only")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token expression"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("replicaiton"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("num"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" is valid")])]),s._v("\nconsensus"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("level "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("\n")])])]),t("p",[s._v("replication-num 含义是在分片副本中，从副本的个数。目前可以配置的参数范围为[0, 1, 2, 3, 4]")]),s._v(" "),t("p",[s._v("consensus-level 含义在返回客户端之前需要有多少从确认已经收到了这一条日志。目前可以配置的参数范围为[0, ...replicaiton-num]")]),s._v(" "),t("p",[s._v("example:")]),s._v(" "),t("p",[s._v("a) 使用 3 个副本（1 主 2 从）场景，希望主分片上收到 2 副本 ACK 之后再返回客户端。")]),s._v(" "),t("p",[s._v("replication-num: 2")]),s._v(" "),t("p",[s._v("consensus-level: 2")]),s._v(" "),t("p",[s._v("b) 使用 3 个副本（1 主 2 从）场景，希望写入大多数副本，即希望主分片上收到 1 副本 ACK 之后再返回客户端。")]),s._v(" "),t("p",[s._v("replication-num: 2")]),s._v(" "),t("p",[s._v("consensus-level: 1")]),s._v(" "),t("p",[s._v("c) 默认场景不开启一致性，希望写入主副本之后立马返回客户端，采用异步同步的方式将 LOG 同步给从副本。")]),s._v(" "),t("p",[s._v("replication-num: 0")]),s._v(" "),t("p",[s._v("consensus-level: 0")]),s._v(" "),t("h2",{attrs:{id:"关于切主"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#关于切主"}},[s._v("#")]),s._v(" 关于切主：")]),s._v(" "),t("p",[s._v("在一些场景下，例如写大多数场景，不能保证主上面的新写入数据一定会马上同步到所有从上面。这时候主副本 down 了，需要管理员根据各个副本的日志状况选择切主。如果切主不当可能会造成数据丢失，同步异常等情况，请小心操作。")]),s._v(" "),t("p",[s._v("具体流程：")]),s._v(" "),t("p",[s._v("使用 pkcluster info slot 中查看各个从副本的分片日志信息，选择 term 更大，或者 term 相同 index 更大的分片成为主。")]),s._v(" "),t("p",[s._v("example：")]),s._v(" "),t("p",[s._v("副本 1 consensus_last_log=filenum: 9 offset: 65234985 term: 33 index: 998386")]),s._v(" "),t("p",[s._v("副本 2 consensus_last_log=filenum: 9 offset: 65234985 term: 33 index: 998300")]),s._v(" "),t("p",[s._v("此时应该选择副本 2 为新主。管理员使用 pkcluster slotsslaveof ip port [0-3,8,9,10,11 | all] 命令可以进行切主操作。具体命令使用方法见"),t("RouterLink",{attrs:{to:"/document/use/Pika分片.html"}},[s._v("Pika 分片命令")])],1)])}),[],!1,null,null,null);t.default=n.exports}}]);