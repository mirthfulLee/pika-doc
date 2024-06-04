(window.webpackJsonp=window.webpackJsonp||[]).push([[74],{485:function(a,v,_){"use strict";_.r(v);var e=_(2),t=Object(e.a)({},(function(){var a=this,v=a._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[v("div",{staticClass:"custom-block tip"},[v("p",{staticClass:"title"}),v("p",[a._v("我们根据360内部的pika使用经验及社区用户的问题反馈，整理了如下文档并会不断更新")]),a._v(" "),v("p",[a._v("为了避免以后你可能找不到本文，可关注公众号")])]),v("h3",{attrs:{id:"pika最佳实践之零"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#pika最佳实践之零"}},[a._v("#")]),a._v(" "),v("strong",[a._v("pika最佳实践之零：")])]),a._v(" "),v("p",[a._v("在群里提问主动带上版本号能大幅度加快问题解决速度（QQ群：294254078）")]),a._v(" "),v("h3",{attrs:{id:"pika最佳实践之一"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#pika最佳实践之一"}},[a._v("#")]),a._v(" "),v("strong",[a._v("pika最佳实践之一：")])]),a._v(" "),v("p",[a._v("我们建议使用3.0的最新版，如果不愿意使用3.X，请使用2.3.6，否则你会发现你遇到的很多问题都在我们的bug修复列表中。（目前2.0版本已不再维护）")]),a._v(" "),v("p",[v("strong",[a._v("pika最佳实践之二：")])]),a._v(" "),v("p",[a._v("pika的线程数量建议和cpu总线程数一致，如果是单机多实例的部署，每个pika实例的线程数量可以酌情降低，但不建议低于cpu总线程数的1/2")]),a._v(" "),v("h3",{attrs:{id:"pi-ka最佳实践之三"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#pi-ka最佳实践之三"}},[a._v("#")]),a._v(" "),v("strong",[a._v("pi ka最佳实践之三：")])]),a._v(" "),v("p",[a._v("pika的性能和IO性能息息相关，我们不建议在机械盘上部署耗时敏感项目的pika，另外为了避免一些稀奇古怪的问题，主从服务器的硬件性能应当尽量一致")]),a._v(" "),v("h3",{attrs:{id:"pika最佳实践之四"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#pika最佳实践之四"}},[a._v("#")]),a._v(" "),v("strong",[a._v("pika最佳实践之四：")])]),a._v(" "),v("p",[a._v("在使用pika多数据结构的时候，尽量确保每个key中的field不要太多，建议每个key的field数量不要超过1万个，特大key可以考虑拆分为多个小key，这样可以避免超大key很多潜在的性能风险")]),a._v(" "),v("h3",{attrs:{id:"pika最佳实践之五"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#pika最佳实践之五"}},[a._v("#")]),a._v(" "),v("strong",[a._v("pika最佳实践之五：")])]),a._v(" "),v("p",[v("code",[a._v("root-connection-num")]),a._v("参数非常有用，意为“允许通过127.0.0.1登录pika的连接数”，它与最大连接数配置项"),v("code",[a._v("maxclients")]),a._v("独立，"),v("code",[a._v("maxclients")]),a._v("的用尽并不会影响"),v("code",[a._v("root-connection-num")]),a._v("，因此在发生异常"),v("code",[a._v("maxclients")]),a._v("被用尽的场景中，管理员仍然可以登录pika所在服务器并通过127.0.0.1来登入pika处理问题，避免了"),v("code",[a._v("maxclients")]),a._v("耗尽无法登录处理的尴尬局面")]),a._v(" "),v("h3",{attrs:{id:"pika最佳实践之六"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#pika最佳实践之六"}},[a._v("#")]),a._v(" "),v("strong",[a._v("pika最佳实践之六：")])]),a._v(" "),v("p",[v("code",[a._v("client kill")]),a._v("命令被加强了，如果你想一次性杀掉当前pika的所有连接，只需要执行"),v("code",[a._v("client kill all")]),a._v("，不用担心，用于同步的连接不会受到影响")]),a._v(" "),v("h3",{attrs:{id:"pika最佳实践之七"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#pika最佳实践之七"}},[a._v("#")]),a._v(" "),v("strong",[a._v("pika最佳实践之七：")])]),a._v(" "),v("p",[a._v("适当的调整"),v("code",[a._v("timeout")]),a._v("参数，通过该参数pika会主动断开不活动时间超过"),v("code",[a._v("timeout")]),a._v("值的连接，避免连接数耗尽问题的发生，由于连接也需要申请内存，因此合理的配置"),v("code",[a._v("timeout")]),a._v("参数也能够在一定程度上降低pika的内存占用")]),a._v(" "),v("h3",{attrs:{id:"pika最佳实践之八"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#pika最佳实践之八"}},[a._v("#")]),a._v(" "),v("strong",[a._v("pika最佳实践之八：")])]),a._v(" "),v("p",[a._v("pika的内存占用主要集中在sst文件的cache和连接申请内存，而通常连接申请内存会比sst的cache要大很多，pika目前已支持连接申请内存的动态调整、回收，因此连接占用的总内存大小是可以粗略估算的，如果你的pika内存占用远超预估或大于10g，那么可能是内存泄漏了，尝试依次执行命令"),v("code",[a._v("client kill all")]),a._v("和"),v("code",[a._v("tcmalloc free")]),a._v("来对连接内存进行强制回收，如果效果不好请升级到最新版本")]),a._v(" "),v("h3",{attrs:{id:"pika最佳实践之九"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#pika最佳实践之九"}},[a._v("#")]),a._v(" "),v("strong",[a._v("pika最佳实践之九：")])]),a._v(" "),v("p",[a._v("非常不建议单机运行pika，最简集群状态应为一主一从，而主从集群的容灾模式有很多种，可以考虑使用lvs、vip漂移、配置管理中间件等")]),a._v(" "),v("h3",{attrs:{id:"pika最佳实践之十"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#pika最佳实践之十"}},[a._v("#")]),a._v(" "),v("strong",[a._v("pika最佳实践之十：")])]),a._v(" "),v("p",[a._v("建议使用主从集群而不是双主模式，在实际使用中双主模式对使用规范的要求、网络环境要求相对更高，使用不规范、网络环境不好会造成双主模式出现问题，在出现问题后，双主模式的数据修复比主从集群数据修复复杂度要大")]),a._v(" "),v("h3",{attrs:{id:"pika最佳实践之十一"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#pika最佳实践之十一"}},[a._v("#")]),a._v(" "),v("strong",[a._v("pika最佳实践之十一：")])]),a._v(" "),v("p",[a._v("如果你的pika单机运行（非主从、主主集群），并部署在可靠的存储上，那么可以考虑通过关闭binlog（将"),v("code",[a._v("write-binlog")]),a._v("参数设置为no）来提高写入性能，不过我们并不推荐单机运行，至少应当有一个从库用于容灾，所以非单机运行pika 不建议关闭binlog")]),a._v(" "),v("h3",{attrs:{id:"pika最佳实践之十二"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#pika最佳实践之十二"}},[a._v("#")]),a._v(" "),v("strong",[a._v("pika最佳实践之十二：")])]),a._v(" "),v("p",[a._v("pika的数据目录中有大量的sst文件，这些文件随着pika数据量的增加而增加，因此你需要为pika配置一个更大的"),v("code",[a._v("open_file_limit")]),a._v("避免不够用，如果你不希望pika占用太多的文件文件描述符，可以通过适当增大单个sst的体积来降低sst的总数量，对应参数为"),v("code",[a._v("target-file-size-base")])]),a._v(" "),v("h3",{attrs:{id:"pika最佳实践之十三"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#pika最佳实践之十三"}},[a._v("#")]),a._v(" "),v("strong",[a._v("pika最佳实践之十三：")])]),a._v(" "),v("p",[a._v("不要修改log目录中的"),v("code",[a._v("write2file")]),a._v("文件和"),v("code",[a._v("manifest")]),a._v("，它们是同步相关的重要文件，"),v("code",[a._v("write2file")]),a._v("为"),v("code",[a._v("binlog")]),a._v("角色，而"),v("code",[a._v("manifest")]),a._v("则用来确保实例重启后的binlog续写及实例为从库时帮助同步中断重连后续传")]),a._v(" "),v("h3",{attrs:{id:"pika最佳实践之十四"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#pika最佳实践之十四"}},[a._v("#")]),a._v(" "),v("strong",[a._v("pika最佳实践之十四：")])]),a._v(" "),v("p",[a._v("pika的全量同步是通过rsync来进行的，因此我们提供了rsync的传输限速参数"),v("code",[a._v("db-sync-speed")]),a._v("，该参数的单位是mb，我们建议在千兆环境中该参数设置不应高于75，而在万兆环境中不应高于500，这样可以避免pika在全量同步的时候将所在服务器网卡用尽而影响到部署在服务器上的其它服务")]),a._v(" "),v("h3",{attrs:{id:"pika最佳实践之十五"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#pika最佳实践之十五"}},[a._v("#")]),a._v(" "),v("strong",[a._v("pika最佳实践之十五：")])]),a._v(" "),v("p",[a._v("在pika中执行"),v("code",[a._v("key *")]),a._v("并不会造成pika阻塞（pika是多线程的），但在存在巨量key的场景下可能会造成临时占用巨量内存（这些内存用于该连接存放"),v("code",[a._v("key *")]),a._v("的执行结果，会在"),v("code",[a._v("key *")]),a._v("执行完毕后释放），因此使用"),v("code",[a._v("keys *")]),a._v("一定要小心谨慎")]),a._v(" "),v("h3",{attrs:{id:"pika最佳实践之十六"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#pika最佳实践之十六"}},[a._v("#")]),a._v(" "),v("strong",[a._v("pika最佳实践之十六：")])]),a._v(" "),v("p",[a._v("如果发现pika有数据但"),v("code",[a._v("info keyspace")]),a._v("的显示均为0，这是因为pika并没有像Redis对key的数量做实时统计并展示，pika中key的统计需要人工触发，执行"),v("code",[a._v("info keyspace 1")]),a._v("，注意执行"),v("code",[a._v("info keyspace")]),a._v("是不会触发统计的，没有带上最后的参数"),v("code",[a._v("1")]),a._v("将会仅仅展示上一次的统计结果，key的统计是需要时间的(这是一个异步的操作)，执行状态可以通过"),v("code",[a._v("info stats")]),a._v("中的"),v("code",[a._v("is_scaning_keyspace")]),a._v("进行查看，该项值为"),v("code",[a._v("yes")]),a._v("表明统计正在进行，为"),v("code",[a._v("no")]),a._v("时表明没有正在进行的统计/上一次统计已结束，在统计执行完毕前"),v("code",[a._v("info keyspace")]),a._v("不会更新，"),v("code",[a._v("info keyspace")]),a._v("的数据是存放在内存里的，重启将清零")]),a._v(" "),v("h3",{attrs:{id:"pika最佳实践之十七"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#pika最佳实践之十七"}},[a._v("#")]),a._v(" "),v("strong",[a._v("pika最佳实践之十七：")])]),a._v(" "),v("p",[a._v("不要在pika执行全量"),v("code",[a._v("compact")]),a._v("的时候触发key统计（"),v("code",[a._v("info keyspace 1")]),a._v("）或执行"),v("code",[a._v("keys *")]),a._v("，否则会造成数据体积暂时膨胀直到key统计、"),v("code",[a._v("keys *")]),a._v("执行结束")]),a._v(" "),v("h3",{attrs:{id:"pika最佳实践之十八"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#pika最佳实践之十八"}},[a._v("#")]),a._v(" "),v("strong",[a._v("pika最佳实践之十八:")])]),a._v(" "),v("p",[a._v("对存在大量过期、多数据结构内元素操作的实例配置"),v("code",[a._v("compact-cron")]),a._v("可以非常好的避免无效但还未被彻底清理的数据对性能造成的影响，或升级到3.0后打开新的key级"),v("code",[a._v("auto_compact")]),a._v("功能 如果你遇到了下面的情况，那么你的实例可能存在未及时清理的无效数据带来的性能风险：")]),a._v(" "),v("ol",[v("li",[a._v("异常的数据体积（大于估算值10%以上），可以通过执行"),v("code",[a._v("compact")]),a._v("命令，在"),v("code",[a._v("compact")]),a._v("执行完毕后观察数据体积是否恢复正常")]),a._v(" "),v("li",[a._v("请求耗时突然异常增大，可以通过执行"),v("code",[a._v("compact")]),a._v("命令，在"),v("code",[a._v("compact")]),a._v("执行完毕后观察请求耗时是否恢复正常")])]),a._v(" "),v("h3",{attrs:{id:"pika最佳实践之十九"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#pika最佳实践之十九"}},[a._v("#")]),a._v(" "),v("strong",[a._v("pika最佳实践之十九：")])]),a._v(" "),v("p",[a._v("在pika3.0中我们提供了过期key的统计（可通过"),v("code",[a._v("info keyspace 1")]),a._v("来触发统计，通过"),v("code",[a._v("info keyspace")]),a._v("查看统计结果），统计结果中的"),v("code",[a._v("invaild_keys")]),a._v("的值为“已删除/过期但还未被物理删除的key的数量”，建议关注该值并在无效key数量较多时通过"),v("code",[a._v("compact")]),a._v("命令来清理，这样能够将未物理清理的无效数据控制在一个较好的程度从而确保pika的性能稳定，如果pika中存储的数据是规律性过期的，例如每个key的过期时间为7天，那么建议通过配置"),v("code",[a._v("compact-cron")]),a._v("参数来实现每天的定时全自动全量"),v("code",[a._v("compact")]),a._v("，"),v("code",[a._v("compact")]),a._v("会占用一定的io资源，因此如果磁盘IO压力过大，建议将其配置为业务低峰期执行，例如深夜")]),a._v(" "),v("h3",{attrs:{id:"pika最佳实践之二十"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#pika最佳实践之二十"}},[a._v("#")]),a._v(" "),v("strong",[a._v("pika最佳实践之二十:")])]),a._v(" "),v("p",[v("code",[a._v("write2file")]),a._v("的角色相当于"),v("code",[a._v("binlog")]),a._v("，应当根据实际写入情况调整"),v("code",[a._v("write2file")]),a._v("到合适的保留周期/数量，建议"),v("code",[a._v("write2file")]),a._v("保留周期/数量不低于48小时，足够的"),v("code",[a._v("write2file")]),a._v("能够让很多情况变得轻松，例如：大数据集群的从库扩容、从库服务器关机维修、从库迁移等等，不会因为主库"),v("code",[a._v("write2file")]),a._v("过期而被迫全量重传")]),a._v(" "),v("h3",{attrs:{id:"pika最佳实践之二十一"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#pika最佳实践之二十一"}},[a._v("#")]),a._v(" "),v("strong",[a._v("pika最佳实践之二十一：")])]),a._v(" "),v("p",[a._v("在主库写入量过大（普通ssd，大致写入qps大于5万）的情况下从库可能会发生同步延迟问题，可以调整从库的"),v("code",[a._v("sync-thread-num")]),a._v("参数来提高从库同步性能，该参数控制着从库的同步线程，每个线程通过hash来负责对应的key的同步，因此主库写入操作的不同的key的数量越多该参数的效果就会越好，而如果巨量的写入仅集中在几个key中，那么该参数可能无法达到预期效果")]),a._v(" "),v("h3",{attrs:{id:"pika最佳实践之二十二"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#pika最佳实践之二十二"}},[a._v("#")]),a._v(" "),v("strong",[a._v("pika最佳实践之二十二：")])]),a._v(" "),v("p",[a._v("pika的备份生成为快照式，通过硬链接存放在dump目录中以日期为后缀，备份每天只能生成一份，多次生成备份时新的备份会覆盖之前的。在生成备份快照的时候，为了确保数据的一致性pika会暂时阻塞写入，阻塞时间与实际数据量相关，根据测试500g的pika生成备份快照也仅需50ms，在写入阻塞的过程中连接不会中断请求不会异常，但client会感觉到“在那一瞬间请求耗时增加了一些”。由于pika的快照是db目录中sst文件的硬连接，因此最初这个目录是不会占用磁盘空间的，而在pika db目录中的sst文件发生了合并、删除后，硬链接会因为其特性而体现真实体积从而开始占用磁盘空间，所以请根据实际的磁盘空间调整备份保留天数，避免备份太多而造成磁盘空间用尽")]),a._v(" "),v("h3",{attrs:{id:"pika最佳实践之二十三"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#pika最佳实践之二十三"}},[a._v("#")]),a._v(" "),v("strong",[a._v("pika最佳实践之二十三：")])]),a._v(" "),v("p",[a._v("如果写入量巨大且磁盘性能不足以满足rocksdb memtable的及时刷盘需求，那么rocksdb很可能会进入写保护模式（写入将被全部阻塞），对于该问题我们建议更换性能更好的存储来支撑，或者降低写入频率（例如将集中写数据的2小时拉长到4小时），也可适当加大"),v("code",[a._v("write-buffer-size")]),a._v("的值来提高memtable的总容量从而降低整个memtable被写满的可能，但实际根据测试发现修改该参数并不能彻底解决该问题，因为“写的memtable迟早要刷下去的！之前刷不动，现在也刷不动！”")]),a._v(" "),v("h3",{attrs:{id:"pika最佳实践之二十四"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#pika最佳实践之二十四"}},[a._v("#")]),a._v(" "),v("strong",[a._v("pika最佳实践之二十四：")])]),a._v(" "),v("p",[a._v("pika对数据进行了压缩，默认压缩算法为"),v("code",[a._v("snappy")]),a._v("，并允许改为"),v("code",[a._v("zlib")]),a._v("，因此每一次数据的存入、读出都需要经过压缩、解压，这对cpu有一定的消耗，非常建议像使用Redis一样使用pika：在pika中关闭压缩，而在client中完成数据的压缩、解压，这样不仅能够降低数据体积，还能有效降低pika的cpu压力，如果你的存储空间不是问题但并不想调整client，可以关闭压缩来降低cpu压力，代价是磁盘占用的增加，注意关闭、开启压缩需要重启实例但无需重做数据")]),a._v(" "),v("h3",{attrs:{id:"pika最佳实践之二十五"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#pika最佳实践之二十五"}},[a._v("#")]),a._v(" "),v("strong",[a._v("pika最佳实践之二十五：")])]),a._v(" "),v("p",[a._v("读写分离很重要，pika在常见的主从集群中由于写入是单点的（主库），因此写入性能是有极限的，而读取可以通过多个从库来共同支撑，因此pika集群的读取性能是随着从库数量的增加而增加的，所以对于读取量很大的场景，建议在业务层代码加入读写分离策略同时在pika层增加从库数量通过多个从库来提供读服务，这样能够大幅度提高集群稳定性并有效降低读耗时")]),a._v(" "),v("h3",{attrs:{id:"pika最佳实践之二十六"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#pika最佳实践之二十六"}},[a._v("#")]),a._v(" "),v("strong",[a._v("pika最佳实践之二十六：")])]),a._v(" "),v("p",[a._v("全量compact的原理是逐步对rocksdb的每一层做数据合并、清理工作，在这个过程中会新增、删除大量的sst文件，因此在执行全量"),v("code",[a._v("compact")]),a._v("的时候可以发现数据体积先增大后减小并最终减小到一个稳定值（无效、重复数据合并、清理完毕仅剩有效数据），建议在执行"),v("code",[a._v("compact")]),a._v("前确保磁盘空余空间不低于30%避免新增sst文件时将磁盘空间耗尽，另外pika支持对指定数据结构进行"),v("code",[a._v("compact")]),a._v("，例如一个实例中已知hash结构的无效数据很少但hash结构数据量很大，set结构数据量很大且无效数据很多，在这个例子中hash结构的"),v("code",[a._v("compact")]),a._v("是没有必要的，你可以通过"),v("code",[a._v("compact set")]),a._v("实现仅仅对set结构的"),v("code",[a._v("compact")])]),a._v(" "),v("h3",{attrs:{id:"pika最佳实践之二十七"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#pika最佳实践之二十七"}},[a._v("#")]),a._v(" "),v("strong",[a._v("pika最佳实践之二十七：")])]),a._v(" "),v("p",[a._v("备份是以硬链接db目录中的sst的方式产生的，因此在存在备份文件的情况下，一旦执行全量compact由于pika db目录中的所有sst都会被"),v("code",[a._v("compact")]),a._v("“清洗”一遍（逐步将所有老的sst删除替换成新的sst），这将造成备份硬链接文件的体积变为真实体积，极端情况下备份文件会额外占用一倍的空间，因此如果你的磁盘空余空间不大，那么在执行全量"),v("code",[a._v("compact")]),a._v("之前最好删除备份")]),a._v(" "),v("h3",{attrs:{id:"pika最佳实践之二十八"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#pika最佳实践之二十八"}},[a._v("#")]),a._v(" "),v("strong",[a._v("pika最佳实践之二十八：")])]),a._v(" "),v("p",[a._v("pika和Redis一样支持慢日志功能并可通过"),v("code",[a._v("slowlog")]),a._v("命令查看，但我们知道"),v("code",[a._v("slowlog")]),a._v("的存储是有上限的，这个上限取决于你的配置，如果配置过大会造成"),v("code",[a._v("slowlog")]),a._v("占用太多内存，而pika允许将慢日志记录到"),v("code",[a._v("pika.ERROR")]),a._v("日志中用于追溯、分析，该功能需要将"),v("code",[a._v("slowlog-write-errorlog")]),a._v("设置为yes")]),a._v(" "),v("h3",{attrs:{id:"pika最佳实践之二十九"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#pika最佳实践之二十九"}},[a._v("#")]),a._v(" "),v("strong",[a._v("pika最佳实践之二十九：")])]),a._v(" "),v("p",[a._v("pika没有提供Redis的命令改名（"),v("code",[a._v("rename-command")]),a._v("）功能，因为部分命令的改名会造成一些工具、中间件的工作异常（例如将config改名后哨兵会无法工作），因此pika额外增加了"),v("code",[a._v("userpass")]),a._v("、"),v("code",[a._v("userblacklist")]),a._v("来解决这一问题。"),v("code",[a._v("userpass")]),a._v("对应"),v("code",[a._v("requirepass")]),a._v("，使用"),v("code",[a._v("userpass")]),a._v("登录的用户会受到"),v("code",[a._v("userblacklist")]),a._v("的限制，它们无法执行配置在"),v("code",[a._v("userblacklist")]),a._v("中的命令，而"),v("code",[a._v("requirepass")]),a._v("则不受影响，可以简单的将通过"),v("code",[a._v("requirepass")]),a._v("登录pika的用户理解为“超级用户”，将通过"),v("code",[a._v("userpass")]),a._v("登录pika的用户理解为“普通用户”，我们非常建议pika运维将"),v("code",[a._v("userpass")]),a._v("提供给业务用于代码访问并在"),v("code",[a._v("userblacklist")]),a._v("增加例如"),v("code",[a._v("slaveof")]),a._v(","),v("code",[a._v("config")]),a._v(","),v("code",[a._v("shutdown")]),a._v(","),v("code",[a._v("bgsave")]),a._v(","),v("code",[a._v("dumpoff")]),a._v(","),v("code",[a._v("client")]),a._v(","),v("code",[a._v("keys")]),a._v("等管理类、风险性命令来避免误操作造成的故障")]),a._v(" "),v("h3",{attrs:{id:"pika最佳实践之三十"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#pika最佳实践之三十"}},[a._v("#")]),a._v(" "),v("strong",[a._v("pika最佳实践之三十：")])]),a._v(" "),v("p",[a._v("Pika在3.0.7版本对网络库进行了改造，原先网络通信以及数据查询插入操作都在配置文件中"),v("code",[a._v("thread-num")]),a._v("对应的线程中执行，改造过后网络通信还是在"),v("code",[a._v("thread-num")]),a._v("对应线程中执行，而数据写入和删除操作由配置文件中"),v("code",[a._v("thread-pool-size")]),a._v("控制的线程池中执行，用户可以根据自己的场景对这两个参数进行调整，如果客户端执行的是一些比较重的操作，可以适量将"),v("code",[a._v("thread-pool-size")]),a._v("调大，一般情况下我们建议"),v("code",[a._v("thread-pool-size = 2 * thread-num")])]),a._v(" "),v("h3",{attrs:{id:"pika最佳实践之三十一"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#pika最佳实践之三十一"}},[a._v("#")]),a._v(" "),v("strong",[a._v("pika最佳实践之三十一：")])]),a._v(" "),v("p",[a._v("Pika从3.0.5开始提供了更细致的compact策略，该策略允许对key的操作进行监控并在达到设置阈值的时候对该key进行单独的compact，这个功能仅对hash，set，zset，list这四种含有field的数据结构生效，对应的参数为:")]),a._v(" "),v("ul",[v("li",[v("code",[a._v("max-cache-statistic-keys")]),a._v(" 设置受监控key的数量，例如10000（监控1万个key）")]),a._v(" "),v("li",[v("code",[a._v("small-compaction-threshold")]),a._v(" 设置操作阈值（该key中有多少个field被修改或该key中的filed被修改超多多少次），例如500")])]),a._v(" "),v("p",[a._v("该功能特别适合（包括并不限于）以下或类似的使用场景，它能够将这些场景中的无效数据及时的清除从而确保性能的持续稳定：")]),a._v(" "),v("ol",[v("li",[a._v("大量hash结构数据，频繁的修改、新增、删除对应key中的数据")]),a._v(" "),v("li",[a._v("大量list结构，以类似队列的方式使用pika")]),a._v(" "),v("li",[a._v("经常需要对多数据结构类型的key直接删除然后复用")])]),a._v(" "),v("h3",{attrs:{id:"pika最佳实践之三十二"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#pika最佳实践之三十二"}},[a._v("#")]),a._v(" "),v("strong",[a._v("pika最佳实践之三十二：")])]),a._v(" "),v("p",[a._v("在业务压力大、IO使用率高的时候尽量不要执行"),v("code",[a._v("compact")]),a._v("，因为在IO资源不足时"),v("code",[a._v("compact")]),a._v("过程中带来的IO消耗可能会与业务请求发生IO争抢，使实例整体性能下降，如果不小心执行了也没有关系，重启pika即可，数据不会损坏不会丢失，上一次未完成的"),v("code",[a._v("compact")]),a._v("残留的sst文件会被rocksdb自动安全的全部清理")]),a._v(" "),v("h3",{attrs:{id:"pika最佳实践之三十三"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#pika最佳实践之三十三"}},[a._v("#")]),a._v(" "),v("strong",[a._v("pika最佳实践之三十三：")])]),a._v(" "),v("p",[a._v("在建立主从的时候发现从库反复的进行全同步很可能是由于主库写入量太大，在全同步完毕期间清理掉了原先dumpdb时的binlog点位，导致从库在替换了db之后重新trysync发现点位又找不到，然后重新触发全同步，陷入了循环，这种场景下可以动态将主库的expire-logs-nums调大，让其保留尽量多的binlog, 建立主从成功之后再调节回来即可")]),a._v(" "),v("p",[v("em",[a._v("不断更新")])])])}),[],!1,null,null,null);v.default=t.exports}}]);