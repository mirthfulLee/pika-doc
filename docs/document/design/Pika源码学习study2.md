---
title: Pika源码学习--pika的PubSub机制
# author: --
# date: '2023-12-02'
---

前一篇《Pika 源码学习--pika 的通信和线程模型》里说到 WorkerThread 里面有两种处理命令的方式，一种是同步，一种是异步。那什么时候是同步处理，什么时候是异步处理呢？其实  
ClientConnFactory 返回的 PikaClientConn 默认都是异步的。  
![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200505005549942-334271056.png)  
同步是在订阅推送里面用到，我们来了解一下 pika 的 PubSub 机制，这里以 Subscribe/UnSubscribe 命令为例。

1、PubSub 线程  
PikaServer 里面单独起了一个线程用来处理订阅推送的消息  
![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200505005649370-32311091.png)  
PubSubThread 构造函数里面创建了两个管道，和前面介绍的一样，这里的管道是用来线程间通信用的，其中 msg_pfd\_是有推送消息到来时通知进行推送，notify_pfd\_是用于连接的加入。  
![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200505005708981-1148014818.png)  
PubSubThread 继承 Thread，主逻辑入口是 PubSubThread::ThreadMain，在 ThreadMain 里面主要处理新连接加入，推送，以及连接的消息，这几部分需要分别结合下面的介绍来说明。

2、Subscribe  
Subscribe 命令的入口是 SubscribeCmd::Do，这里除了执行 Subscribe 主逻辑外，还做了下图框起来的两个关键的动作  
![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200505005725544-1928899097.png)  
把连接的 fd 从 WorkerThread 线程的 epoll 中删除 WorkerThread::MoveConnOut，设置 PubSub 标记并且把连接的 HandleType 改为同步模式。我们再看下 Subscribe 里面做了啥。订阅本身的逻辑比较简单，就是构造了一个 channel 和 conn 数组的 Map pubsub_channel\_，然后把 channel 和 conn 往这个 map 上加。  
![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200505005800172-1915629957.png)  
我们看下最下面的红框，前面把连接的 fd 从 WorkerThread 里面删除，这里把这个 fd 放到 fd_queue，然后写了一个管道消息通知 PubSub 线程处理，我们看下 PubSubThread::ThreadMain，如果是 notify_pfd\_来的消息，会把 fd 加到 PubSubThread 自己的 epoll，所以如果有 subscribe 命令过来的时候，会把这个连接的 fd 从 WorkerThread 转移到 PubSubThread 这个单独的线程来处理。  
![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200505005812809-1157499289.png)

3、UnSubscribe  
UnSubscribe 命令的入口是 SubscribeCmd::Do，理解了 Subscribe 的逻辑后，UnSubscribe 的逻辑就比较好理解了，因为他做了和 Subscribe 相反的操作：PubSubThread::UnSubscribe 里面会 RemoveConn，把连接 fd 从 PubSubThread 的 epoll 删除；然后把连接加回 WorkerThread 的 epoll，PubSub 标记置为 false  
![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200505005830491-303490051.png)

4、Publish  
Publish 命令的入口是 PublishCmd::Do，主要逻辑是发管道消息通知 PubSubThread 主线程来处理推送  
![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200505005844699-1659355098.png)  
PubSubThread::ThreadMain 如果收到推送的通知，则根据订阅关系进行推送  
![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200505005857391-479496840.png)

5、已订阅连接命令的处理  
为啥需要把订阅的 fd 移到单独的 PubSubThread 线程，并且用同步处理呢？把订阅连接 fd 移到 PubSubThread 线程后，处理已有连接的消息的逻辑其实和在 WorkerThread 类似，也是用 RedisConn::GetRequest 来处理请求，只不过处理类型变成了同步。  
![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200505005907181-314399722.png)  
从前一篇文章我们可以知道，同步的处理是在 ParserDealMessageCb 函数  
![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200505005924500-1034180583.png)  
理论上讲这个 PikaClientConn::DealMessage 应该是要实现的才对，但是我下的最新的代码发现这个函数被改没了（commitid: c9f2a66b1741a9148402b42128f46c36d3d83444）  
![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200505005942021-397174792.png)  
在 commit 记录里面找到了之前的实现，暂时没有研究这个为啥这样改，先按以前的代码看，不影响对整个逻辑的理解。可以看到 DealMessage 实际上也是调用了 PikaClientConn::DoCmd。  
![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200505005954739-286620610.png)  
因为 redis 的 PubSub 实现是这样的，如果一个客户端正在订阅，那么这个客户端只能执行 Subscribe/UnSubscribe/PSubscribe/UnSubscribe/Ping 这几个命令，订阅和取消订阅是有时序关系的，而 ping 命令是可以直接处理的，所以这里应该是为了避免订阅和取消订阅发生时序错误，所以把订阅的连接移到单独的线程 PubSubThread 来处理，并且使用同步的处理方式。  
![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200505010012071-2126813751.png)
