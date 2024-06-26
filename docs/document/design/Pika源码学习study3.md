---
title: Pika源码学习--pika的命令执行框架
# author: --
# date: '2023-12-02'
---

今天我们一起来看下 pika 收到一个命令后，是怎么处理这个命令的。  
Pika 现在支持了两种模式：一种是 classic，一种是 sharding。如果是使用 classic 模式，则 pika 支持多 db，可以使用 databases 来配置 db 的个数；如果是使用 sharding 模式，则使用 default-slot-num 来配置该 shard 负责处理的 slot 的数量。  
![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200505173154849-1309685236.png)

1.db，table，partition 的关系  
PikaServer 启动的时候，会先初始化表结构，初始的表结构是由配置文件决定的  
![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200505173200705-135712474.png)  
加载配置文件的入口是 PikaConf::Load，根据配置文件，如果配置的是 classic 模式，则用 databases 来初始化 table_struct，有多少个 db，则有初始化多少个 table；如果配置的是 sharding 模式，则获取 solt 的数量，初始化 db0。可以看到，如果是 classic 模式，则一个 db 对应一个 table，并且这个 table 只有一个分区 partition，如果是 sharding 模式，则默认只有一个 db，即 db0，一个 slot 对应一个 partition。  
![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200505173208258-323299003.png)  
默认使用的表是第一个表，可以使用 select dbid 来选择是哪个表，SelectCmd 会修改使用的表。  
![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200505173215240-1766332620.png)  
PikaServer::InitTableStruct 中，会根据生成表结构信息来生成 table，并且给这个 table 创建分区。  
![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200505173225263-407563795.png)  
在 Table::AddPartitions 中，为每个分区创建了一个 Partition，一个 Partition 对应着一个 Blackwidow，Blackwidow 一个基于 rocksdb 的封装的存储引擎，我们先直接认为他就是 rocksdb，创建 Partition 会打开 rocksdb，给后续的操作使用。  
![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200505173233208-499438273.png)

2.命令的执行流程  
在了解命令的执行流程之前还需要了解下命令表 CmdTable 的初始化。Main 函数里面启动 pikaServer 之前会先进行 CmdTable 的初始化  
![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200505173241762-650525870.png)  
入口是 InitCmdTable，我们可以看一下这个函数：  
![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200505173247483-619752696.png)  
这个函数创建了各种命令对象，然后往 CmdTable 里面 insert，CmdTable 是一个 map，key 是命令的字符串，value 就是具体的 Cmd 对象。所有的 Cmd 对象都继承了基类 Cmd，真正执行命令的是各个 Cmd 的 do 方法。下面我们以 set 命令为例来说明这些命令是怎么执行的，在《Pika 源码学习--pika 的通信和线程模型》中我们已经知道了请求是怎么走的，并且知道最后是用了 PikaClientConn::DoCmd 这个函数来执行命令，今天我们具体看看这个 DoCmd 里面做了啥。  
![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200505173254530-692702754.png)  
前面解析请求的时候已经知道了需要执行的是哪个命令，这里先根据命令的名称在 CmdTable 里面找到具体处理命令的对象，比如 Set 命令，就会找到 SetCmd 对象。找到命令后，会先执行 cmd 的初始化，做一些校验等工作，这里 current_table\_默认是使用默认表  
![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200505173300142-2053623532.png)  
然后调用 Cmd::Execute，这里根据不同的命令会走不同的分支，是和命令的类型或者属性有关的，命令属性在初始化 CmdTable 的时候会初始化  
![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200505173307740-429320576.png)  
我们以 ProcessSinglePartitionCmd 为例，处理命令的时候需要先找到 Partition，如果是 classic 模式，一个 table 只有一个分区，如果是 sharding 模式，则根据命令的 key 来决定  
![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200505173316168-2103176629.png)  
需要具体的命令实现自己的 current_key 方法  
![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200505173322121-1115097552.png)  
Get partiton 会根据 key 或者 table_name，使用具体的数据分布算法得到处理的分区  
![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200505173331501-1640762097.png)  
找到分区后，就会调用具体命令对象的 do 方法来处理。partiton 里面的 db，就是前面说到的 Blackwidow（rocksdb）存储引擎。  
![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200505173343320-1967107082.png)

简单总结一下，执行一个命令的时候，先需要知道是哪个 table 的，然后根据命令名称在 CmdTable 里面获取处理命令的对象，然后找到处理具体这个命令的 partiton，然后使用 Blackwidow 引擎来处理命令。
