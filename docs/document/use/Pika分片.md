---
title: Pika 分片教程
# author: --
# date: '2023-12-02'
---

关于 sharding mode，pika 底层提供 slot 的概念。Pika 将 key 进行哈希取模之后散列到各个 slot 当中处理。sharding mode 根据线上的具体情况可以应用于单个 pika，也可以应用到多个 pika 组成的 pika cluster。这个 tutorial 主要介绍开启 sharding mode 需要了解的一些概念，以及需要调整的一些配置参数。

## 模式的选择

目前 pika 分为两种模式，两种模式不可兼容，所以请一定先根据业务确定使用哪一种模式。

一种是经典模式(classic)，经典模式下可以支持绝大多数的业务压力，同时支持 8 个 db(db0-db7)的并发读写。建议一般的业务线可以先压测这个模式。

如果经典模式不能满足线上巨大的压力，可以尝试另一种模式，集群模式(sharding)，相对于经典模式，集群模式会提供更高的 QPS，同时也会占用更多的硬件资源。以 Codis 下配置 pika 为其后端存储为例，codis 默认是集群 slots 总数为 1024，每个 slots 都提供五种数据结构的读写。对应每一种数据结构，pika 都会起 rocksdb 实例。这样，集群需要起 1024\*5 个 rocksdb 实例，集群模式的意义当然是把这些 5120 个 pika 实例分布在各个机器的 pika 实例上。所以我们推荐集群需要一定规模的物理机，这个样每个物理机上承载的 rocksdb 实例不会太多。当然我们的设计之初当然是使用人员自行决定需要多少物理机来分布 5120 个 rocksdb 实例。为什么不能布置在一台物理机上呢？原因如下：

1，过多的 rocksdb 实例同时 compaction 的概率变高，对磁盘的压力过大。

2， 每个 rocksdb 会占用一定数量的文件描述符和内存，这个数字乘以 5120 很容易将系统资源耗尽。

总之，一定是更多的硬件资源提供更多的性能，建议新接触 pika 的同学可以用我们的经典模式，如果完全满足不了目前的需求，可以考虑用更多的物理资源，使用集群模式。

具体的性能测试可以参考 [3.2.x Performance](/document/performance/3.2.x性能.html)。

## 所需版本

Pika 从 3.2.0 版本之后支持 sharding mode，建议用最新 release。

## 基本操作

关于 slots 的基本操作详见 [slot commands](https://github.com/Qihoo360/pika/wiki/Pika%E5%88%86%E7%89%87%E5%91%BD%E4%BB%A4)

## 配置文件说明

相关的配置文件调参

```
# default slot number each table in sharding mode
  default-slot-num : 1024

# if this option is set to 'classic', that means pika support multiple DB, in
# this mode, option databases enable
# if this option is set to 'sharding', that means pika support multiple Table, you
# can specify slot num for each table, in this mode, option default-slot-num enable
# Pika instance mode [classic | sharding]
  instance-mode : sharding

# Pika write-buffer-size
write-buffer-size : 67108864

# If the total size of all live memtables of all the DBs exceeds
# the limit, a flush will be triggered in the next DB to which the next write
# is issued.
max-write-buffer-size : 10737418240

# maximum value of Rocksdb cached open file descriptors
max-cache-files : 100
```

配置文件的说明可以在[配置说明](/document/use/配置文件说明.html)中找到。 特别说明的是`write-buffer-size` 代表的是每一个 rockdb 实例的每一个 memtable 的大小，所有的 rocksdb 的所有的 memtable 大小上限由 `max-write-buffer-size`控制。如果达到`max-write-buffer-size`数值，每个 rocksdb 实例都会尝试 flush 当前的 memtable 以减少内存使用。

## 兼容 codis，twemproxy 方案

目前的分布式框架依赖于开源项目，目前 pika 兼容 codis，twemproxy。

具体的兼容方案详见[Support Cluster Slots](https://github.com/Qihoo360/pika/wiki/Support-Cluster-Slots)。
