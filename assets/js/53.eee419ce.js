(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{461:function(a,t,e){"use strict";e.r(t);var s=e(2),r=Object(s.a)({},(function(){var a=this,t=a._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h2",{attrs:{id:"背景"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#背景"}},[a._v("#")]),a._v(" 背景")]),a._v(" "),t("h3",{attrs:{id:"_1-pika-replicate"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-pika-replicate"}},[a._v("#")]),a._v(" 1.Pika Replicate")]),a._v(" "),t("ul",[t("li",[a._v("pika支持master/slave的复制方式，通过slave端的slaveof命令激发")]),a._v(" "),t("li",[a._v("salve端处理slaveof命令，将当前状态变为slave，改变连接状态")]),a._v(" "),t("li",[a._v("slave的向master发送MetaSync请求，在同步之前确保自身db的拓扑结构和master一致")]),a._v(" "),t("li",[a._v("slave下的每个partition单独的向master端对应的partition发起trysync请求，建立同步关系")])]),a._v(" "),t("h3",{attrs:{id:"_2-binlog"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-binlog"}},[a._v("#")]),a._v(" 2.Binlog")]),a._v(" "),t("ul",[t("li",[a._v("pika同步依赖binlog")]),a._v(" "),t("li",[a._v("binlog文件会自动或手动删除")]),a._v(" "),t("li",[a._v("当同步点对应的binlog文件不存在时，需要通过全同步进行数据同步")])]),a._v(" "),t("h2",{attrs:{id:"全同步"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#全同步"}},[a._v("#")]),a._v(" 全同步")]),a._v(" "),t("h3",{attrs:{id:"_1-简介"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-简介"}},[a._v("#")]),a._v(" 1. 简介")]),a._v(" "),t("ul",[t("li",[a._v("需要进行全同步时，master会将db文件dump后发送给slave")]),a._v(" "),t("li",[a._v("通过rsync的deamon模式实现db文件的传输")]),a._v(" "),t("li",[a._v("默认使用pika port+1000作为rysnc传输端口")])]),a._v(" "),t("h3",{attrs:{id:"_2-实现逻辑"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-实现逻辑"}},[a._v("#")]),a._v(" 2. 实现逻辑")]),a._v(" "),t("ol",[t("li",[a._v("在pika实例启动的同时会启动Rsync服务")]),a._v(" "),t("li",[a._v("master发现某一个partition需要全同步时，判断是否有备份文件可用，如果没有先dump一份")]),a._v(" "),t("li",[a._v("master通过rsync向slave发送对应partition的dump的文件")]),a._v(" "),t("li",[a._v("slave的对应partition用收到的文件替换自己的db")]),a._v(" "),t("li",[a._v("slave的对应partition用最新的偏移量再次发起trysnc")]),a._v(" "),t("li",[a._v("完成同步")])]),a._v(" "),t("p",[a._v("Slave中某一个Partition建立同步: "),t("img",{attrs:{src:"https://camo.githubusercontent.com/700dda6022136231c4ce9cded9db3afc4d83a5653d12362da522cd5c67afdb93/68747470733a2f2f692e696d6775722e636f6d2f666c6e4f79655a2e706e67",alt:"slave的partition"}})]),a._v(" "),t("p",[a._v("Master处理同步请求： "),t("img",{attrs:{src:"https://camo.githubusercontent.com/c99d16a062d2168022a8016caee17b42c36ce5ae70878af6489bdf467a71a8e6/68747470733a2f2f692e696d6775722e636f6d2f4265636c6f39632e706e67",alt:"master执行过程"}})]),a._v(" "),t("h3",{attrs:{id:"_3-slave连接状态"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-slave连接状态"}},[a._v("#")]),a._v(" 3. Slave连接状态")]),a._v(" "),t("ul",[t("li",[a._v("No Connect：不尝试成为任何其他节点的slave")]),a._v(" "),t("li",[a._v("ShouldMetaSync：向master请求db的拓扑信息，确保与自身一致")]),a._v(" "),t("li",[a._v("TryConnect：为每个partition重置状态机，让其处于准备同步的状态")]),a._v(" "),t("li",[a._v("Connecting：在所有partition没有建立同步关系之前一直是处于connecting的状态")]),a._v(" "),t("li",[a._v("EstablishSucces: 所有partition建立同步关系成功")]),a._v(" "),t("li",[a._v("Error：出现了异常")])]),a._v(" "),t("h2",{attrs:{id:"footer"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#footer"}},[a._v("#")]),a._v(" Footer")])])}),[],!1,null,null,null);t.default=r.exports}}]);