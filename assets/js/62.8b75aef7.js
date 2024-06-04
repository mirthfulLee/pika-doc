(window.webpackJsonp=window.webpackJsonp||[]).push([[62],{472:function(t,p,i){"use strict";i.r(p);var _=i(2),o=Object(_.a)({},(function(){var t=this,p=t._self._c;return p("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[p("p",[t._v("时隔两年，Pika 社区正式发布经由社区 50 多人参与开发并在 360 生产环境验证可用的 "),p("code",[t._v("v3.5.0")]),t._v(" 版本，新版本在提升性能的同时，也支持了 Codis 集群部署，BlobDB KV 分离，增加 Exporter 等新特性。")]),t._v(" "),p("p",[t._v("我们将详细介绍该版本引入的重要新特性。")]),t._v(" "),p("h2",{attrs:{id:"_1-去除-rsync"}},[p("a",{staticClass:"header-anchor",attrs:{href:"#_1-去除-rsync"}},[t._v("#")]),t._v(" 1 去除 Rsync")]),t._v(" "),p("p",[t._v("在 v3.5.0 版本之前，Pika 使用 Rsync 工具进行引擎中存量数据的同步，Pika 进程启动时创建 Rsync 子进程。这种同步方式在实际使用中出现了一些问题，包括Pika 进程 crash 后重新拉起无法正常同步以及同步过程中 Rsync 进程无故退出等。在今年发布的 v3.5.0 版本中，我们在全量同步方案方面进行了重要的改进，摒弃了以往使用的 Rsync，实现了全新的数据同步方案，支持了断点续传，动态调节传输限速等特性，以确保同步过程更加稳定、可控。这些改进不仅增强了同步的可靠性，还为用户提供了更好的使用体验。")]),t._v(" "),p("ul",[p("li",[p("p",[t._v("去除 Rsync 进程，使用自研全量同步方式")]),t._v(" "),p("p",[t._v("https://github.com/OpenAtomFoundation/pika/pull/1805")])]),t._v(" "),p("li",[p("p",[t._v("实现断点续传，传输限速功能https://github.com/OpenAtomFoundation/pika/pull/1926")])]),t._v(" "),p("li",[p("p",[t._v("Pika 主从同步时，进行 master run_id 的检验")]),t._v(" "),p("p",[t._v("https://github.com/OpenAtomFoundation/pika/pull/1805")])])]),t._v(" "),p("h2",{attrs:{id:"_2-兼容更多-redis-命令"}},[p("a",{staticClass:"header-anchor",attrs:{href:"#_2-兼容更多-redis-命令"}},[t._v("#")]),t._v(" 2 兼容更多 Redis 命令")]),t._v(" "),p("p",[t._v("在 v3.5.0 版本中，我们迈出了更大的一步，提升了对 Redis 命令的兼容性，对 Redis 命令提供了更广泛的支持。这个版本的改进使得 Pika 在与 Redis 生态系统的集成中表现更加出色，为用户提供了更丰富的功能和更广阔的可能性。我们对命令支持的扩展，为用户提供了更多的灵活性，以满足不同场景下的需求。")]),t._v(" "),p("ul",[p("li",[p("p",[t._v("支持 UNLINK 命令")]),t._v(" "),p("p",[t._v("https://github.com/OpenAtomFoundation/pika/pull/1273")])]),t._v(" "),p("li",[p("p",[t._v("支持 INFO COMMANDSTATS 命令")]),t._v(" "),p("p",[t._v("https://github.com/OpenAtomFoundation/pika/pull/1660")])]),t._v(" "),p("li",[p("p",[t._v("支持 HELLO、SETNAME 命令")]),t._v(" "),p("p",[t._v("https://github.com/OpenAtomFoundation/pika/pull/1245")])]),t._v(" "),p("li",[p("p",[t._v("支持 BLPOP、BRPOP 命令")]),t._v(" "),p("p",[t._v("https://github.com/OpenAtomFoundation/pika/pull/1548")])]),t._v(" "),p("li",[p("p",[t._v("新增 Pika 原创 DISKRECOVERY 命令")]),t._v(" "),p("p",[t._v("https://github.com/OpenAtomFoundation/pika/pull/1843")])])]),t._v(" "),p("h2",{attrs:{id:"_3-rocksdb-版本升级和分级压缩"}},[p("a",{staticClass:"header-anchor",attrs:{href:"#_3-rocksdb-版本升级和分级压缩"}},[t._v("#")]),t._v(" 3 RocksDB 版本升级和分级压缩")]),t._v(" "),p("p",[t._v("在 v3.5.0 版本中，我们进行了一项重要的升级，将 RocksDB 引擎升级至 v8.1.1 版本，并实现了分级压缩功能的整合。这一升级不仅是技术的飞跃，也是我们对系统性能和优化的持续关注的体现。通过这项升级，我们为 Pika 增加了更高级别的数据管理能力，同时也让系统更好地适应不同的压缩需求，为用户的数据存储和检索提供了更大的灵活性和效率。")]),t._v(" "),p("ul",[p("li",[p("p",[t._v("升级 RocksDB 版本到 v8.1.1")]),t._v(" "),p("p",[t._v("https://github.com/OpenAtomFoundation/pika/pull/1396")])]),t._v(" "),p("li",[p("p",[t._v("实现 RocksDB 分级压缩")]),t._v(" "),p("p",[t._v("https://github.com/OpenAtomFoundation/pika/pull/1365")])]),t._v(" "),p("li",[p("p",[t._v("新增 RocksDB 缓存配置项 num-shard-bits 能够从配置文件中读取")]),t._v(" "),p("p",[t._v("https://github.com/OpenAtomFoundation/pika/pull/1189")])])]),t._v(" "),p("h2",{attrs:{id:"_4-支持-blobdb"}},[p("a",{staticClass:"header-anchor",attrs:{href:"#_4-支持-blobdb"}},[t._v("#")]),t._v(" 4 支持 BlobDB")]),t._v(" "),p("p",[t._v("在 v3.5.0 版本中，我们引入了引人瞩目的创新--对 BlobDB 和 KV 存储层进行了分离，为我们的系统注入了新的活力。这个版本的升级使得 Pika 在数据存储方面更加灵活和高效。我们通过支持 BlobDB KV 分离，提供了更优化的数据存储结构，为用户的数据管理和查询操作带来了更深层次的优势。这一重要改进将在更多应用场景下展现出其强大的潜力。")]),t._v(" "),p("ul",[p("li",[p("p",[t._v("支持 BlobDB KV 分离")]),t._v(" "),p("p",[t._v("https://github.com/OpenAtomFoundation/pika/pull/1456")])])]),t._v(" "),p("h2",{attrs:{id:"_5-基于-codis-的集群模式"}},[p("a",{staticClass:"header-anchor",attrs:{href:"#_5-基于-codis-的集群模式"}},[t._v("#")]),t._v(" 5 基于 Codis 的集群模式")]),t._v(" "),p("p",[t._v("在 v3.5.0 版本中，我们积极引入了 Codis 集群模式，此外，我们不仅仅将 Codis 集群模式融入了系统中，还为其提供了迁移 slot 的命令支持，从而实现了更加智能化的集群管理。这一重大变革不仅扩展了 Pika 在大规模数据存储场景中的应用范围，还进一步提升了系统的可扩展性和高可用性。通过引入 Codis 集群模式，我们对用户的数据处理和管理提供了更优化的解决方案。")]),t._v(" "),p("ul",[p("li",[p("p",[t._v("引入 Codis 到 Pika")]),t._v(" "),p("p",[t._v("https://github.com/OpenAtomFoundation/pika/pull/1279")])]),t._v(" "),p("li",[p("p",[t._v("引入 Codis 的 CI")]),t._v(" "),p("p",[t._v("https://github.com/OpenAtomFoundation/pika/pull/1311")])]),t._v(" "),p("li",[p("p",[t._v("支持 Codis 迁移 slot 命令")]),t._v(" "),p("p",[t._v("https://github.com/OpenAtomFoundation/pika/pull/1632")])]),t._v(" "),p("li",[p("p",[t._v("新增是否在 reload 的 slotmigrate 状态")]),t._v(" "),p("p",[t._v("https://github.com/OpenAtomFoundation/pika/pull/1700")])])]),t._v(" "),p("h2",{attrs:{id:"_6-可观测性"}},[p("a",{staticClass:"header-anchor",attrs:{href:"#_6-可观测性"}},[t._v("#")]),t._v(" 6 可观测性")]),t._v(" "),p("p",[t._v("在 v3.5.0 版本中，我们引入了一个创新性的工具--pika_exporter，以提升对 Pika 数据库的可观测性。这一工具的加入不仅是对我们对系统监测能力的持续增强的反映。而在版本的后续更新中，我们进一步充实了指标，不断丰富了 Pika 的可观测性。为用户提供了更为全面和精准的数据洞察力。")]),t._v(" "),p("ul",[p("li",[p("p",[t._v("新增 Pika 可观测系统 pika_exporter")]),t._v(" "),p("p",[t._v("https://github.com/OpenAtomFoundation/pika/pull/1388")])]),t._v(" "),p("li",[p("p",[t._v("新增网络 I/O 流量监控指标")]),t._v(" "),p("p",[t._v("https://github.com/OpenAtomFoundation/pika/pull/1733")])]),t._v(" "),p("li",[p("p",[t._v("新增命令统计耗时指标")]),t._v(" "),p("p",[t._v("https://github.com/OpenAtomFoundation/pika/pull/1751")])]),t._v(" "),p("li",[p("p",[t._v("新增 estimate_pending_compaction_bytes 度量来分析碎片率指标")]),t._v(" "),p("p",[t._v("https://github.com/OpenAtomFoundation/pika/pull/1736")])]),t._v(" "),p("li",[p("p",[t._v("新增 RocksDB 指标")]),t._v(" "),p("p",[t._v("https://github.com/OpenAtomFoundation/pika/pull/1560")])])]),t._v(" "),p("h2",{attrs:{id:"_7-容器化部署"}},[p("a",{staticClass:"header-anchor",attrs:{href:"#_7-容器化部署"}},[t._v("#")]),t._v(" 7 容器化部署")]),t._v(" "),p("p",[t._v("在 v3.5.0 版本中，我们引入了一个具有创新意义的里程碑--pika-operator mvp 版本，这一版本在技术上实现了一个重要目标：将 Pika 单实例服务迁移到 Kubernetes（K8s）平台上的快速部署。这不仅是对我们持续关注行业发展的体现，也是我们不断提升用户体验的追求。通过 pika-operator，我们为用户提供了更便捷的部署方案，将 Pika 的高性能数据库引擎与 Kubernetes 的灵活性相融合，从而为用户的应用环境带来更高效、更弹性的支持。")]),t._v(" "),p("ul",[p("li",[p("p",[t._v("实现 Pika 单例服务在 K8s 上快速部署")]),t._v(" "),p("p",[t._v("https://github.com/OpenAtomFoundation/pika/pull/1243")])]),t._v(" "),p("li",[p("p",[t._v("实现了在 MiniKube 环境中部署 Pika")]),t._v(" "),p("p",[t._v("https://github.com/OpenAtomFoundation/pika/pull/1330")])]),t._v(" "),p("li",[p("p",[t._v("给 pika-operator 添加 E2E 测试")]),t._v(" "),p("p",[t._v("https://github.com/OpenAtomFoundation/pika/pull/1347")])])]),t._v(" "),p("h2",{attrs:{id:"_8-跨平台编译"}},[p("a",{staticClass:"header-anchor",attrs:{href:"#_8-跨平台编译"}},[t._v("#")]),t._v(" 8 跨平台编译")]),t._v(" "),p("p",[t._v("在 v3.5.0 版本中，Pika 呈现出一种全面性的蓬勃发展态势，得以在不同操作系统平台上展现其优越性。此版本的突破性之处在于，Pika 实现了对 MacOS、CentOS 和 Ubuntu 这些主要平台的完整编译和使用支持。这个举措不仅仅体现了我们对多样化技术环境的关注，也是为了最大程度地拓展用户基础，为广泛的用户群体提供灵活、高效的数据库解决方案。这种跨平台兼容性的加强将 Pika 推向更广阔的技术生态。")]),t._v(" "),p("ul",[p("li",[p("p",[t._v("支持 MacOS 平台")]),t._v(" "),p("p",[t._v("https://github.com/OpenAtomFoundation/pika/pull/1372")])])]),t._v(" "),p("h2",{attrs:{id:"_9-多平台集成测试及单元测试"}},[p("a",{staticClass:"header-anchor",attrs:{href:"#_9-多平台集成测试及单元测试"}},[t._v("#")]),t._v(" 9 多平台集成测试及单元测试")]),t._v(" "),p("p",[t._v("在 v3.5.0 版本中，我们迈出了一个令人瞩目的步伐，不仅在多个主要操作系统平台上实现了支持，还在测试领域实施了全面升级。我们为 Ubuntu、CentOS 和 MacOS 这三大平台搭建了持续集成（CI）环境，以确保系统的完整性和稳定性。在测试方面，我们引入了更为广泛的覆盖，包括 Go 语言的集成测试、TCL 的单元测试以及 Python 的端到端（E2E）测试。通过这些测试策略的升级，我们在确保系统性能和可靠性方面迈出了更大的一步。")]),t._v(" "),p("ul",[p("li",[p("p",[t._v("新增 CentOS 环境下的 CI")]),t._v(" "),p("p",[t._v("https://github.com/OpenAtomFoundation/pika/pull/1534")])]),t._v(" "),p("li",[p("p",[t._v("新增 MacOS 环境下的 CI")]),t._v(" "),p("p",[t._v("https://github.com/OpenAtomFoundation/pika/pull/1769")])]),t._v(" "),p("li",[p("p",[t._v("新增 E2E 测试框架")]),t._v(" "),p("p",[t._v("https://github.com/OpenAtomFoundation/pika/pull/1347")])]),t._v(" "),p("li",[p("p",[t._v("新增在 Github CI Workflow 中添加 CMake 编译环境")]),t._v(" "),p("p",[t._v("https://github.com/OpenAtomFoundation/pika/pull/1268")])]),t._v(" "),p("li",[p("p",[t._v("新增在 TCL 脚本中 populate 方法模拟 Redis debug populate 方法，用以填充测试数据")]),t._v(" "),p("p",[t._v("https://github.com/OpenAtomFoundation/pika/pull/1693")])]),t._v(" "),p("li",[p("p",[t._v("新增在 blackwidow 中添加 CMake 文件，添加对 blackwidow 的单元测试")]),t._v(" "),p("p",[t._v("https://github.com/OpenAtomFoundation/pika/pull/1246")])]),t._v(" "),p("li",[p("p",[t._v("移植 Redis 测试脚本")]),t._v(" "),p("p",[t._v("https://github.com/OpenAtomFoundation/pika/pull/1357")])])]),t._v(" "),p("h2",{attrs:{id:"_10-others"}},[p("a",{staticClass:"header-anchor",attrs:{href:"#_10-others"}},[t._v("#")]),t._v(" 10 Others")]),t._v(" "),p("p",[t._v("若您有任何疑问，诚挚欢迎您扫描微信二维码，加入我们的交流群，与一众志同道合的成员展开深入的讨论，我们热切期待与您分享见解、交流心得，为共同的技术探索和创新之旅添砖加瓦。在这个群体中，我们将以卓越的智慧和互动的合作精神，构建出一个相互学习、不断进步的技术共同体。")]),t._v(" "),p("p",[p("img",{attrs:{src:"https://mmbiz.qpic.cn/mmbiz_png/3ykbyfcQomxNyCaDXTWKNd3nyOlWfriauyT1Ak3wVpWuynDYGfDC58SVtxzyicA8x1GM2lX2NLh1DSP93YwFrlHg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1",alt:"图片"}})])])}),[],!1,null,null,null);p.default=o.exports}}]);