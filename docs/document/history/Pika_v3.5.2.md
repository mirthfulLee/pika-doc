---
title: What's new in Pika v3.5.2
# author: --
# date: '2023-12-02'
---

Pika 社区近期发布了备受期待的 v3.5.2 版本 https://github.com/OpenAtomFoundation/pika/releases/tag/v3.5.2-alpha ，不仅解决了历史遗留的 Bug 问题，还引入了多项新特性。这些新特性主要包括 Pika 支持 Redis 事务、Pika 上层增加缓存层实现冷热数据分离、提升读性能、Codis-Proxy 支持动态修改配置参数等等，无疑将会让用户感受到更为高效和稳定的使用体验。

## 新特性

- Pika 支持 Redis 事务，使得 Pika 的数据够在一系列命令的执行中保持数据的一致性和可靠性。
  https://github.com/OpenAtomFoundation/pika/pull/2124
- Pika 上层增加缓存层实现冷热数据分离，提升读性能。
  https://github.com/OpenAtomFoundation/pika/pull/2171
- Codis-Proxy 支持动态修改配置参数，方便我们做参数调整。
  https://github.com/OpenAtomFoundation/pika/pull/2110
- 补全 Go Test 测试用例。
  https://github.com/OpenAtomFoundation/pika/pull/2082
- CI 增加 cache 提升编译速度。
  https://github.com/OpenAtomFoundation/pika/pull/2093
- 增加 redis-copy 流量复制工具。
  https://github.com/OpenAtomFoundation/pika/pull/2060

bugfix

- 修复 pika 在使用 SETRANGE 命令出现 coredump 的问题。
  https://github.com/OpenAtomFoundation/pika/pull/2141
- 修复因删除 Clearreplicationid 写进 binlog 导致的全量复制问题。
  https://github.com/OpenAtomFoundation/pika/pull/2135
- 修改锁粒度，提升 pika 写 binlog 的性能。
  https://github.com/OpenAtomFoundation/pika/pull/2129
- 修复复杂数据类型成员变量可能出现数据溢出。
  https://github.com/OpenAtomFoundation/pika/pull/2106
- 修复 decr 命令返回值错误问题。
  https://github.com/OpenAtomFoundation/pika/pull/2092
- 修复 setrange 和 setbit 命令没有保留原 key 的过期时间的问题。
  https://github.com/OpenAtomFoundation/pika/pull/2095

下期版本规划

预计再过两个月左右，我们会在农历新年前发布  3.5.3  版本，相关关键特性有：

- Pika 通过快慢命令分离提升读写性能。
  https://github.com/OpenAtomFoundation/pika/pull/2162
- 支持 Redis ACL，在 Pika 中引入用户概念，进行权限控制。
  https://github.com/OpenAtomFoundation/pika/pull/2013
- 支持 Redis Stream，实现消息队列。
  https://github.com/OpenAtomFoundation/pika/pull/1955
- 添加 Pika 特有命令 compactrange，对指定范围内的 key 进行 compact   以解决大 key 删除时读放大的问题。
  https://github.com/OpenAtomFoundation/pika/pull/2163
- 支持 lastsave 指令。
  https://github.com/OpenAtomFoundation/pika/pull/2167

感谢大家对 Pika 开源公众号的关注 ，Pika 3.5 版本重大特性及使用规范我们会在稍后的文章中进行介绍，我们下期再见～
