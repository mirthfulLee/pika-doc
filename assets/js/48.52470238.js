(window.webpackJsonp=window.webpackJsonp||[]).push([[48],{458:function(s,a,t){"use strict";t.r(a);var r=t(2),e=Object(r.a)({},(function(){var s=this,a=s._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h2",{attrs:{id:"整体架构"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#整体架构"}},[s._v("#")]),s._v(" 整体架构")]),s._v(" "),a("p",[s._v("新的存储架构中，pika实例存储引擎包括内存缓存redis和硬盘持久存储RocksDB。每个pika实例由一个redis和多个RocksDB实例构成。")]),s._v(" "),a("p",[s._v("pika当前是将不同的数据类型放在不同的RocksDB实例中，线上使用过程中发现，同一个业务服务使用的数据类型一般集中在一两个数据类型中，无法发挥多RocksDB实例的优势。因此，pika新版本中计划不再按照数据类型区分RocksDB实例，而是通过column-family区分。单个pika节点的RocksDB实例个数根据物理机硬件配置决定，每个RocksDB实例使用独立的compaction线程池和flush线程池，初次之外每个RocksDB实例使用一个后台线程，该后台线程用来发起manual compaction以及对RocksDB中存储的数据进行定期的统计和巡检。")]),s._v(" "),a("p",[s._v("每个节点在启动时获取到当前节点持有的分片（目前不支持，需要进行代码开发），将分片排序并等分为RocksDB实例个数，保证每个分片持有的RocksDB实例个数近似相同。")]),s._v(" "),a("h2",{attrs:{id:"数据格式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#数据格式"}},[s._v("#")]),s._v(" 数据格式")]),s._v(" "),a("p",[s._v("为了兼容redis协议，即为同一个数据类型的数据设置统一的过期时间值，复合数据类型中的meta信息还是需要保留，否则ttl/expire接口操作性能耗时增加。增加meta信息导致的数据写入过程中产生的查询开销，计划通过增加内存cache的方式进行缓解，即读meta时也是优先读内存缓存cache，读不到再查硬盘。不同的数据类型混合使用RocksDB实例，通过column family中进行区分。")]),s._v(" "),a("p",[s._v("数据存储格式与之前的blackwidow基本相同，只是key，value增加一些字段。")]),s._v(" "),a("p",[s._v("对于key来讲，前缀增加8字节的reserve保留字段以及4字节的slotID，后缀增加16字节的保留字段。")]),s._v(" "),a("p",[s._v("对于value来讲，在value最后统一增加：16字节的保留字段，8字节的数据的写入时间cdate，8字节的数据过期时间。")]),s._v(" "),a("p",[a("strong",[s._v("string结构")])]),s._v(" "),a("div",{staticClass:"language-c extra-class"},[a("pre",{pre:!0,attrs:{class:"language-c"}},[a("code",[s._v("key格式\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" reserve1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" db_id "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" slot_id "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" key "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" reserve2 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" \n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("      "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("B      "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("B    "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("B     "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("       "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("      "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("16")]),s._v("B     "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n\nvalue格式\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" value "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" reserve "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" cdate "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" timestamp "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" \n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("           "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("     "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("16")]),s._v("B   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("     "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("B  "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("        "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("B       "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n\n")])])]),a("p",[a("strong",[s._v("hash结构")])]),s._v(" "),a("p",[s._v("meta数据格式")]),s._v(" "),a("div",{staticClass:"language-c extra-class"},[a("pre",{pre:!0,attrs:{class:"language-c"}},[a("code",[s._v("key格式\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" reserve1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" db_id "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" slot_id "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" key "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" reserve2 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" \n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("        "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("B    "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("B  "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("      "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("B   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("        "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("      "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("16")]),s._v("B     "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n\nvalue格式\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" hash_size "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" version "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("  reserve  "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" cdate "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" timestamp "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" \n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("        "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v("B      "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("     "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("B     "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("      "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("16")]),s._v("B    "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("     "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("B  "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("        "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("B       "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n\n")])])]),a("p",[s._v("data数据格式")]),s._v(" "),a("div",{staticClass:"language-c extra-class"},[a("pre",{pre:!0,attrs:{class:"language-c"}},[a("code",[s._v("key格式\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" reserve1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" db_id "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" slot_id "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" key size "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" key "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" version "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" field "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" reserve2 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("       "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("B    "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("B   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("     "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("B    "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("       "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v("B    "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("        "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("       "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("B   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("         "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("      "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("16")]),s._v("B     "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n\nvalue格式\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" hash value "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" reserved "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" cdate "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("                    "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("       "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("16")]),s._v("B   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("B  "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" \n")])])]),a("p",[a("strong",[s._v("List结构")])]),s._v(" "),a("p",[s._v("meta数据格式")]),s._v(" "),a("div",{staticClass:"language-c extra-class"},[a("pre",{pre:!0,attrs:{class:"language-c"}},[a("code",[s._v("key格式\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" reserve1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("  db_id "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" slot_id "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" key "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" reserve2 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("       "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("B     "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("B   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("      "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("B   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("        "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("     "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("16")]),s._v("B     "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n\nvalue格式\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" list_size "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" version "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" left index "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" right index "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" reserve "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("  cdate "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" timestamp "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" \n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("     "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v("B    "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("       "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("B    "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("       "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("B      "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("         "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("B       "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("16")]),s._v("B     "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("B    "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("        "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("B        "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n")])])]),a("p",[s._v("data数据格式")]),s._v(" "),a("div",{staticClass:"language-c extra-class"},[a("pre",{pre:!0,attrs:{class:"language-c"}},[a("code",[s._v("key格式\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" reserve1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" db_id "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" slot_id "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" key size "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" key "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" version "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" index "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" reserve2 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" \n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("       "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("B    "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("B    "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("     "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("B   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("       "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v("B    "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("        "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("       "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("B   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("B   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("      "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("16")]),s._v("B     "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n\nvalue格式\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" value "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" reserve "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" cdate "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("           "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("     "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("16")]),s._v("B   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("B  "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" \n")])])]),a("p",[a("strong",[s._v("set结构")])]),s._v(" "),a("p",[s._v("meta数据格式")]),s._v(" "),a("div",{staticClass:"language-c extra-class"},[a("pre",{pre:!0,attrs:{class:"language-c"}},[a("code",[s._v("key格式\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" reserve1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" db_id "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" slot_id "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" key "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" Reserved2 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("        "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("B    "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("B   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("      "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("B  "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("        "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("16")]),s._v("B    "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n\nvalue格式\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" set_size "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" version "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" reserve "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" cdate "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" timestamp "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" \n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("     "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v("B      "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("     "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("B     "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("16")]),s._v("B     "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("B   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("        "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("B        "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n\n")])])]),a("p",[s._v("data数据格式")]),s._v(" "),a("div",{staticClass:"language-c extra-class"},[a("pre",{pre:!0,attrs:{class:"language-c"}},[a("code",[s._v("key格式\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" reserve1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" db_id "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" slot_id "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" key size "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" key "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" Version "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" member "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("  reserve2 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("      "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("B     "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("B   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("      "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("B   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("       "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v("B    "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("        "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("B      "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("                 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("       "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("16")]),s._v("B    "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("  \n\nvalue格式\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" reserve "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" cdate "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("16")]),s._v("B  "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("B  "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" \n")])])]),a("p",[a("strong",[s._v("zset结构")])]),s._v(" "),a("p",[s._v("meta数据格式")]),s._v(" "),a("div",{staticClass:"language-c extra-class"},[a("pre",{pre:!0,attrs:{class:"language-c"}},[a("code",[s._v("key格式\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" reserve1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" db_id "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" slot_id "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" key "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" reserve2 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("       "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("B    "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("     "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("B   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("      "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("B  "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("        "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("     "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("16")]),s._v("B      "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("  \n\nvalue格式\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" zset_size "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" version "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" reserved "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" cdate "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" timestamp "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" \n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("     "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v("B    "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("B   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("16")]),s._v("B   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("B  "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("     "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("B    "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n\n")])])]),a("p",[s._v("member to score数据格式")]),s._v(" "),a("div",{staticClass:"language-c extra-class"},[a("pre",{pre:!0,attrs:{class:"language-c"}},[a("code",[s._v("key格式\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" reserve1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" db_id "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" slot_id "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" key size "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" key "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" version "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" Field "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" reserve2 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("      "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("B      "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("B   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("       "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("B  "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("     "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v("B     "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("        "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("       "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("B   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("          "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("      "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("16")]),s._v("B    "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   \n\nvalue格式\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" score value "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" reserve "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" cdate "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("         "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("B        "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("16")]),s._v("B    "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("B  "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" \n")])])]),a("p",[s._v("score to member数据格式")]),s._v(" "),a("div",{staticClass:"language-c extra-class"},[a("pre",{pre:!0,attrs:{class:"language-c"}},[a("code",[s._v("key格式\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" reserve1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" db_id "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" slot_id "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("  key size "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" key "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" version "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" score "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" member "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("  reserve2 "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("       "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("B    "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("B   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("B     "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("        "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v("B    "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("        "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("      "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("B    "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("  "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("B     "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("                "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("       "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("16")]),s._v("B    "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n\nvalue格式\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" reserve "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" cdate "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("16")]),s._v("B   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("B  "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" \n")])])]),a("h2",{attrs:{id:"无效数据清理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#无效数据清理"}},[s._v("#")]),s._v(" 无效数据清理")]),s._v(" "),a("p",[s._v("无效数据包括: 1. 设置了过期时间且已经过期的数据. 2. 业务重复写导致的相同key的老版本数据。3. 已经迁出的分片的旧数据。由于全量数据保存在RocksDB中，因此无效数据的清理主要是通过自定义的compactionFIlter实现。")]),s._v(" "),a("p",[s._v("对于string类型数据，compactionFIlter只需要比对value中的ttl值即可决定。对于复杂数据类型，由于data数据是按照field单独存储而且没有设置过期时间，因此在compaction复杂数据类型的data数据时，需要获取meta信息，包括key的ttl以及version。为减少compaction中读RocksDB导致的额外磁盘IO开销，将复杂数据类型的元信息缓存在内存存储引擎中。")]),s._v(" "),a("p",[s._v("对于已经迁出的分片的旧数据，需要考虑存量的已经迁出的无效数据的清理，同时还要保证如果路由表再一次变更，迁出的分片重新迁回到当前节点之后，之前的无效数据不要被读到。因此，在分片迁移完成路由表发生变更之后，迁出点节点在本地磁盘文件中记录一个迁出的slot_id，当前的sequence_number，以及最新的RocksDB filenumber。在自定义的compactionFilter执行时，会去检测当前key是否属于该slot_id，以及sequence_number是否小于记录的sequence_number，只有两个条件都满足，才认为这是数据是无效数据，才可以将数据清除掉。对于客户端的读请求和遍历请求，在读出数据之后也要比对是否属于无效数据。判断方式同理，也是比对记录的slot_id, sequence_number，以及RocksDB filenumber。")]),s._v(" "),a("p",[s._v("无效数据清理的触发规则分为两个，一个是RocksDB的auto compaction。另一个是pika发起的manual compaction。")]),s._v(" "),a("p",[s._v("为减少manual compaction对在线服务的影响，manual compaction的执行需要满足两个条件：1. 自定义触发时间段和触发间隔，如每隔两天执行一次，执行时间指定在凌晨低峰期。2. 限制每次执行compaction的数据量，防止manual compaction执行时间过长阻塞auto compaction。")]),s._v(" "),a("h2",{attrs:{id:"rocksdb使用优化"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#rocksdb使用优化"}},[s._v("#")]),s._v(" RocksDB使用优化")]),s._v(" "),a("h3",{attrs:{id:"blobdb使用优化"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#blobdb使用优化"}},[s._v("#")]),s._v(" blobdb使用优化")]),s._v(" "),a("p",[s._v("RocksDB支持了key-value分离的实现，即通过将大value存储到blob文件中，在sst文件中存储大value在blob文件的索引信息，从而减少写写放大，有效提升大value场景下的写入性能。pika依赖自定义的compactionFilter实现过期数据的处理，ttl存储在value中，因此在compaction过程中不可避免导致额外的blob文件IO。一种方法是修改sst文件中存储的blobindex，在blobindex的相同offset位置存储value的ttl值，这样compaction过程中对过期数据的清理的逻辑，就不需要查询blob文件，减少额外的磁盘IO。")]),s._v(" "),a("h2",{attrs:{id:"dealslowkey"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#dealslowkey"}},[s._v("#")]),s._v(" dealslowkey")]),s._v(" "),a("p",[s._v("参考新浪微博的经验，当pika上层代码发现一个慢查询key时，发起一次manual compaction，compaction的范围即对应的key前缀对应的数据范围。性能待验证。")]),s._v(" "),a("h3",{attrs:{id:"compact老的sst文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#compact老的sst文件"}},[s._v("#")]),s._v(" compact老的sst文件")]),s._v(" "),a("p",[s._v("参考新浪微博的经验，定期对最老的sst文件进行compaction可明显提升集群性能。看官方文档，貌似类似的功能RocksDB已经支持，链接如下："),a("a",{attrs:{href:"https://github.com/facebook/rocksdb/wiki/Leveled-Compaction#ttl%E3%80%82%E8%AE%A1%E5%88%92%E4%BD%BF%E7%94%A8RocksDB%E5%AE%98%E6%96%B9%E7%9A%84%E5%AE%9E%E7%8E%B0%E3%80%82",target:"_blank",rel:"noopener noreferrer"}},[s._v("https://github.com/facebook/rocksdb/wiki/Leveled-Compaction#ttl。计划使用RocksDB官方的实现。"),a("OutboundLink")],1)]),s._v(" "),a("h2",{attrs:{id:"新技术探索"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#新技术探索"}},[s._v("#")]),s._v(" 新技术探索")]),s._v(" "),a("p",[s._v("主要是包括了RocksDB的异步IO，协程，remote compaction等新技术的测试和落地。")])])}),[],!1,null,null,null);a.default=e.exports}}]);