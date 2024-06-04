(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{469:function(t,s,a){"use strict";a.r(s);var n=a(2),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("p",[t._v("pika作为类redis的存储系统，为了弥补在性能上的不足，在整个系统中大量使用"),s("a",{attrs:{href:"https://github.com/Qihoo360/pika/wiki/pika-%E7%BA%BF%E7%A8%8B%E6%A8%A1%E5%9E%8B",target:"_blank",rel:"noopener noreferrer"}},[t._v("多线程的结构"),s("OutboundLink")],1),t._v("，涉及到多线程编程，势必需要为线程加锁来保证数据访问的一致性和有效性。其中主要用到了三种锁")]),t._v(" "),s("ol",[s("li",[t._v("互斥锁")]),t._v(" "),s("li",[t._v("读写锁")]),t._v(" "),s("li",[t._v("行锁")])]),t._v(" "),s("h2",{attrs:{id:"读写锁"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#读写锁"}},[t._v("#")]),t._v(" 读写锁")]),t._v(" "),s("h3",{attrs:{id:"应用场景"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#应用场景"}},[t._v("#")]),t._v(" 应用场景")]),t._v(" "),s("p",[t._v("应用挂起指令，在挂起指令的执行中，会添加写锁，以确保，此时没有其他指令执行。其他的普通指令在会添加读锁，可以并行访问。 其中挂起指令有：")]),t._v(" "),s("ol",[s("li",[t._v("trysync")]),t._v(" "),s("li",[t._v("bgsave")]),t._v(" "),s("li",[t._v("flushall")]),t._v(" "),s("li",[t._v("readonly")])]),t._v(" "),s("h4",{attrs:{id:"作用和意义"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#作用和意义"}},[t._v("#")]),t._v(" 作用和意义")]),t._v(" "),s("p",[t._v("保证当前服务器在执行挂起指令时，起到阻写作用。")]),t._v(" "),s("h2",{attrs:{id:"行锁"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#行锁"}},[t._v("#")]),t._v(" 行锁")]),t._v(" "),s("p",[t._v("行锁，用于对一个key加锁，保证同一时间只有一个线程对一个key进行操作。")]),t._v(" "),s("h3",{attrs:{id:"作用和意义-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#作用和意义-2"}},[t._v("#")]),t._v(" 作用和意义：")]),t._v(" "),s("p",[t._v("pika中存取的数据都是类key，value数据，不同key所对应的数据完全独立，所以只需要对key加锁可以保证数据在并发访问时的一致性，行锁相对来说，锁定粒度小，也可以保证数据访问的高效性。")]),t._v(" "),s("h3",{attrs:{id:"应用场景-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#应用场景-2"}},[t._v("#")]),t._v(" 应用场景")]),t._v(" "),s("p",[t._v("在pika系统中，对于数据库的操作都需要添加行锁，主要在应用于两个地方，在系统上层指令过程中和在数据引擎层面。在pika系统中，对于写指令(会改变数据状态，如SET,HSET)需要除了更新数据库状态，还涉及到pika的"),s("a",{attrs:{href:"https://github.com/Qihoo360/pika/wiki/pika-%E4%B8%BB%E4%BB%8E%E5%90%8C%E6%AD%A5%E5%8A%9F%E8%83%BD",target:"_blank",rel:"noopener noreferrer"}},[t._v("增量同步"),s("OutboundLink")],1),t._v(",需要在binlog中添加所执行的写指令，用于保证master和slave的数据库状态一致。故一条写指令的执行，主要有两个部分：")]),t._v(" "),s("ol",[s("li",[t._v("更改数据库状态")]),t._v(" "),s("li",[t._v("将指令添加到binlog中")])]),t._v(" "),s("p",[t._v("其加锁情况，如下图： "),s("img",{attrs:{src:"https://camo.githubusercontent.com/0c822615a9f1d80a433ac5d3185afad16eccc1054e44783a65a261aeb851b68c/687474703a2f2f7777342e73696e61696d672e636e2f6c617267652f63326364343330376a773166366e6f3764353535376a32306661306d613734782e6a7067",alt:""}})]),t._v(" "),s("h4",{attrs:{id:"设计的平衡"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#设计的平衡"}},[t._v("#")]),t._v(" 设计的平衡")]),t._v(" "),s("p",[t._v("在图中可以看到，对同一个key，加了两次行锁，在实际应用中，pika上所加的锁就已经能够保证数据访问的正确性。如果只是为了pika所需要的业务，blackwidow层面使用行锁是多余的，但是"),s("a",{attrs:{href:"https://github.com/Qihoo360/pika/wiki/pika-blackwidow%E5%BC%95%E6%93%8E%E6%95%B0%E6%8D%AE%E5%AD%98%E5%82%A8%E6%A0%BC%E5%BC%8F",target:"_blank",rel:"noopener noreferrer"}},[t._v("blackwidow的设计"),s("OutboundLink")],1),t._v("初衷就是通过对rocksdb的改造和封装提供一套完整的类redis数据访问的解决方案，而不仅仅是为pika提供数据库引擎。这种设计思路也是秉承了Unix中的设计原则：Write programs that do one thing and do it well。")]),t._v(" "),s("p",[t._v("这样设计大大降低了pika与blackwidow之间的耦合，也使得blackwidow可以被单独拿出来测试和使用，在pika中的"),s("a",{attrs:{href:"https://github.com/Qihoo360/pika/wiki/pika%E5%88%B0redis%E8%BF%81%E7%A7%BB%E5%B7%A5%E5%85%B7",target:"_blank",rel:"noopener noreferrer"}},[t._v("数据迁移工具"),s("OutboundLink")],1),t._v("就是完全使用blackwidow来完成，不必依赖任何pika相关的东西。另外对于blackwidow感兴趣或者有需求的团队也可以直接将blackwidow作为数据库引擎而不需要修改任何代码就能使用完整的数据访问功能。")]),t._v(" "),s("h3",{attrs:{id:"具体实现"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#具体实现"}},[t._v("#")]),t._v(" 具体实现")]),t._v(" "),s("p",[t._v("在pika系统中，一把行锁就可以维护所有key。在行锁的实现上是将一个key与一把互斥锁相绑定，并将其放入哈希表中维护，来保证每次访问key的线程只有一个，但是不可能也不需要为每一个key保留一把互斥锁，只需要当有多条线程访问同一个key时才需要锁，在所有线程都访问结束之后，就可以销毁这个绑定key的互斥锁，释放资源。具体实现如下：")]),t._v(" "),s("div",{staticClass:"language-c extra-class"},[s("pre",{pre:!0,attrs:{class:"language-c"}},[s("code",[t._v("class RecordLock "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n public"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("RecordLock")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("port"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("::")]),t._v("RecordMutex "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("mu"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" std"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("::")]),t._v("string "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("key"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("mu_")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("mu"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("key_")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("key"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        mu_"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Lock")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("key_"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("~")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("RecordLock")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" mu_"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Unlock")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("key_"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n private"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("\n  port"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("::")]),t._v("RecordMutex "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" mu_"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  std"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("::")]),t._v("string key_"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// No copying allowed")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("RecordLock")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" RecordLock"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" operator"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" RecordLock"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" RecordMutex"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("::")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Lock")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" std"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("::")]),t._v("string "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("key"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  mutex_"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Lock")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  std"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("::")]),t._v("unordered_map"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("std"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("::")]),t._v("string"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" RefMutex "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("::")]),t._v("const_iterator it "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" records_"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("find")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("key"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("it "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" records_"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("end")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v('//log_info ("tid=(%u) >Lock key=(%s) exist, map_size=%u", pthread_self(), key.c_str(), records_.size());')]),t._v("\n    RefMutex "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("ref_mutex "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" it"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v("second"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    ref_mutex"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Ref")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    mutex_"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Unlock")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    ref_mutex"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Lock")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v('//log_info ("tid=(%u) <Lock key=(%s) exist", pthread_self(), key.c_str());')]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v('//log_info ("tid=(%u) >Lock key=(%s) new, map_size=%u ++", pthread_self(), key.c_str(), records_.size());')]),t._v("\n    RefMutex "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("ref_mutex "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" new "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("RefMutex")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    records_"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("insert")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("std"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("::")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("make_pair")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("key"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" ref_mutex"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    ref_mutex"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Ref")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    mutex_"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Unlock")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    ref_mutex"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Lock")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v('//log_info ("tid=(%u) <Lock key=(%s) new", pthread_self(), key.c_str());')]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n")])])]),s("p",[t._v("完整代码可参考："),s("a",{attrs:{href:"https://github.com/baotiao/slash/blob/master/src/slash_mutex.cc",target:"_blank",rel:"noopener noreferrer"}},[t._v("slash_mutex.cc"),s("OutboundLink")],1),t._v(" "),s("a",{attrs:{href:"https://github.com/baotiao/slash/blob/master/include/slash_mutex.h",target:"_blank",rel:"noopener noreferrer"}},[t._v("slash_mutex.h"),s("OutboundLink")],1)])])}),[],!1,null,null,null);s.default=e.exports}}]);