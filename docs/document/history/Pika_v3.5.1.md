---
title: What's new in Pika v3.5.1
author: --
date: '2023-12-02'
---
# 



Pika 社区很高兴宣布，我们今天发布已经过我们生产环境验证 v3.5.1 版本 [https://github.com/OpenAtomFoundation/pika/releases/tag/v3.5.1](https://www.oschina.net/action/GoToLink?url=https%3A%2F%2Fgithub.com%2FOpenAtomFoundation%2Fpika%2Freleases%2Ftag%2Fv3.5.1) 。

该版本不仅做了很多优化工作，还引入了多项新功能。这些新功能包括 动态关闭 WAL、ReplicationID 检测是否增量复制、在 K8s 环境上 Pika 服务的自动注册从而实现集群的自组织、以及 exporter 检测集群指标等等，无疑将会让用户享受到更为稳定和高效的 NoSQL 使用体验。

## 1 新特性

- 1 Slow log 增加队列等待时间统计，在队列阻塞的时候方便我们进行问题定位。[PR 1997](https://www.oschina.net/action/GoToLink?url=https%3A%2F%2Fgithub.com%2FOpenAtomFoundation%2Fpika%2Fpull%2F1997)， 作者 [wangshao1](https://www.oschina.net/action/GoToLink?url=https%3A%2F%2Fgithub.com%2Fwangshao1)。
    
- 2 主从复制使用 ReplicationID 判断是否进行增量同步，解决原主从同步方式切主后整个数据集会进行全量复制的问题，可以提升 Pika 性能。[PR 1951](https://www.oschina.net/action/GoToLink?url=https%3A%2F%2Fgithub.com%2FOpenAtomFoundation%2Fpika%2Fpull%2F1951)， 作者 [Mixficsol](https://www.oschina.net/action/GoToLink?url=https%3A%2F%2Fgithub.com%2FMixficsol)。
    
- 3 WAL 以 'disablewal' 命令方式支持动态关闭，在写性能遇到瓶颈的时候，可以通过命令关闭 WAL  缓解写性能下降的问题，关闭 WAL 有机器宕机后丢失数据的风险，用户需要根据自己的使用习惯权衡。[PR 2015](https://www.oschina.net/action/GoToLink?url=https%3A%2F%2Fgithub.com%2FOpenAtomFoundation%2Fpika%2Fpull%2F2015)，作者 [Mixficsol](https://www.oschina.net/action/GoToLink?url=https%3A%2F%2Fgithub.com%2FMixficsol)。
    
- 4 flush 线程数和 compaction 线程数合二为一，在 Compaction 性能瓶颈时，可以动态调整线程数，缓解 Comapction 损耗 Pika 性能的问题。[PR 2014](https://www.oschina.net/action/GoToLink?url=https%3A%2F%2Fgithub.com%2FOpenAtomFoundation%2Fpika%2Fpull%2F2014)， 作者 [Tianpingan](https://www.oschina.net/action/GoToLink?url=https%3A%2F%2Fgithub.com%2FTianpingan)。
    
- 5 升级了 RocksDB 版本到 v8.3.3。[PR 2000](https://www.oschina.net/action/GoToLink?url=https%3A%2F%2Fgithub.com%2FOpenAtomFoundation%2Fpika%2Fpull%2F2000)， 作者 [dingxiaoshuai123](https://www.oschina.net/action/GoToLink?url=https%3A%2F%2Fgithub.com%2Fdingxiaoshuai123)。
    
- 6 新增周期性打印工作队列的长度功能，在队列阻塞的时候可以快速定位问题。[PR 1978](https://www.oschina.net/action/GoToLink?url=https%3A%2F%2Fgithub.com%2FOpenAtomFoundation%2Fpika%2Fpull%2F1978)， 作者 [Tianpingan](https://www.oschina.net/action/GoToLink?url=https%3A%2F%2Fgithub.com%2FTianpingan)。
    
- 7 新增利用一个 `pika_exporter` 监测整个集群的指标，实现一个 Pika Exporter 实例监控整个集群，解决了 3.5.0 版本一个 Pika Exporter  监测一个 Pika 实例消耗资源的问题。[PR 1953](https://www.oschina.net/action/GoToLink?url=https%3A%2F%2Fgithub.com%2FOpenAtomFoundation%2Fpika%2Fpull%2F1953)， 作者 [chenbt-hz](https://www.oschina.net/action/GoToLink?url=https%3A%2F%2Fgithub.com%2Fchenbt-hz)。
    
- 8 实现在  K8s  环境上  Pika  服务的自动注册，在启动时自动注册，从而实现集群的自组织 ，实现了通过命令拉起整个 Pika Cluster 集群。[PR 1931](https://www.oschina.net/action/GoToLink?url=https%3A%2F%2Fgithub.com%2FOpenAtomFoundation%2Fpika%2Fpull%2F1931)， 作者 [machinly](https://www.oschina.net/action/GoToLink?url=https%3A%2F%2Fgithub.com%2Fmachinly)。
    

## 2 bug 修复

- 1 调整了 Rate\_limit 参数，修复了压测时出现 RPS 为 0 的情况 。[PR 2009](https://www.oschina.net/action/GoToLink?url=https%3A%2F%2Fgithub.com%2FOpenAtomFoundation%2Fpika%2Fpull%2F2009)， 作者 [Mixficsol](https://www.oschina.net/action/GoToLink?url=https%3A%2F%2Fgithub.com%2FMixficsol)。
    
- 2 修复了 INFODATA 命令中对于遍历数据文件时出现空路径的逻辑判断。[PR 1996](https://www.oschina.net/action/GoToLink?url=https%3A%2F%2Fgithub.com%2FOpenAtomFoundation%2Fpika%2Fpull%2F1996)， 作者 [Mixficsol](https://www.oschina.net/action/GoToLink?url=https%3A%2F%2Fgithub.com%2FMixficsol)。
    
- 3 修复了 Codis 在线上出现大毛刺的问题。[PR 2016](https://www.oschina.net/action/GoToLink?url=https%3A%2F%2Fgithub.com%2FOpenAtomFoundation%2Fpika%2Fpull%2F2016)， 作者 [chejinge](https://www.oschina.net/action/GoToLink?url=https%3A%2F%2Fgithub.com%2Fchejinge)。
    
- 4 修复了 macOS 环境下编译使用 tools 导致编译不过的问题 。[PR 2011](https://www.oschina.net/action/GoToLink?url=https%3A%2F%2Fgithub.com%2FOpenAtomFoundation%2Fpika%2Fpull%2F2011)， 作者 [A2ureStone](https://www.oschina.net/action/GoToLink?url=https%3A%2F%2Fgithub.com%2FA2ureStone)。
    
- 5 减少了 exporter 非必要日志的打印，降低 了资源利用率。[PR 1945](https://www.oschina.net/action/GoToLink?url=https%3A%2F%2Fgithub.com%2FOpenAtomFoundation%2Fpika%2Fpull%2F1945)， 作者 [Mixficsol](https://www.oschina.net/action/GoToLink?url=https%3A%2F%2Fgithub.com%2FMixficsol)。
    

## 3 使用建议

本次新增了几个配置参数，大家在使用过程中，需要根据使用情况按需调整：

- 1 max-rsync-parallel-num：主从全量复制线程数，需要根据自己机器 CPU 核数和部署实例个数进行调整，建议最小设置为 2。
    
- 2 rate-limiter-bandwidth: 限制 RocksDB 数据库读写速度，限制数据库在一定时间内可以读写的数据量，默认 2000MiB/s，需要根据自己的机器性能和部署实例做调整。
    
- max-background-jobs: compaction 和 flushdb 线程数，要根据自己机器 CPU 核数和部署实例个数进行调整，建议最小设置为 4。
    
- 3 throttle-bytes-per-second: 主从复制传输限速参数，默认为 200MiB/s，该参数可以根据机器网卡的配置及部署 pika 实例的个数进行调整。