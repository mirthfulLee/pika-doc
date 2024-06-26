---
title: Pika源码学习--pika的通信和线程模型
# author: --
# date: '2023-12-02'
---


pika 的线程模型有官方的[wiki 介绍](https://github.com/Qihoo360/pika/wiki/pika-%E7%BA%BF%E7%A8%8B%E6%A8%A1%E5%9E%8B)，这里主要介绍了 pika 都有哪些线程，这些线程用来干嘛。本篇文章主要涉及监听线程 DispatchThread、IO 工作线程 WorkerThread 和工作线程池 ThreadPool，结合代码介绍里面实现的一些细节。

## 1.监听线程 DispatchThread

在创建 PikaServer 的时候，会构造一个 PikaDispatchThread，这个 PikaDispatchThread，实际上是用了 pink 网络库的 DispatchThread::DispatchThread

![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200504211351842-717042333.png)

DispatchThread 构造函数里面会初始化好若干个 WorkerThread

![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200504211402681-2139977514.png)

DispatchThread 继承自 ServerThread，ServerThread 继承了 Thread，线程启动时实际上运行的是子类的 ThreadMain 方法，继承了 Thread 类的子类需要有自己的 ThreadMain，监听线程 start 的时候，入口是 ServerThread::ThreadMain()。线程启动会先 ServerThread::InitHandle()，绑定和监听端口，下面看看 ServerThread::ThreadMain()里面做了啥。

ServerThread::ThreadMain()主要逻辑是一个 epoll，当有新的连接事件来的时候，accept，然后调用 DispatchThread::HandleNewConn 来处理这个新的连接

![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200504211420944-44529319.png)

DispatchThread::HandleNewConn 如何处理连接呢？实际上监听线程会把连接分发给 IO 工作线程 WorkerThread 来处理。每个 WorkerThread 都有一个 PinkEpoll，PinkEpoll 有一个 notify_queue\_，新的连接会以 PinkItem 的形式 push 到这个队列里面，然后通知 WorkerThread 来处理。分发的方式类似轮训，会按顺序分发给 notify_queue\_没有满的 WorkerThread。

![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200504211444902-1456517637.png)

那么监听线程如何通知 WorkerThread 来处理新的连接呢？使用的是管道的方式，PinkEpoll 会创建一个管道用来通知，并且把这个管道加到 Epoll 里面。在确定好要分发的 WorkerThread 后，往这个 WorkerThread 的管道写进去一个 1 字节的内容，来触发这个管道的读事件。

![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200504211503089-556234836.png)

## 2.IO 工作线程 WorkerThread

DispatchThread::StartThread 的时候会起 WorkerThread 线程，WorkerThread 也是继承了 Thread，因此工作线程的入口是 WorkerThread::ThreadMain。上文说到监听线程把新的连接放到 WorkerThread 的队列里面后，通知了 WorkerThread 进行处理。下面我们看看 WorkerThread 怎么处理的。  
WorkerThread 同样是一个 Epoll，这里会处理新连接请求事件和已连接请求的事件，如果 Epoll 返回的 fd 是 notify_receive_fd，即管道的接收 fd，说明是内部的通知事件，一次性读取多个字节的内容，因为前面已知每个通知是 1 个字节，因此这里读到了多少个字节就说明有多少个通知，然后在一个循环里面处理这些请求。类型为 kNotiConnect 则是新的连接，这里会把监听线程 push 的 PinkItem 取出来，然后创建一个 NewPinkConn，加到 conns\_里面，并且把这个 fd 加到 WorkerThread 的 epoll，后续的消息事件就可以在这个 epoll 被处理。这里 conn_factory 用的是 ClientConnFactory，返回的是 PikaClientConn，继承了 pink::RedisConn。

![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200504211529140-293547830.png)

连接绑定到 WorkerThread 后，已建立连接的客户端发送请求过来，则是走的下面的分支，根据 fd 在 conns\_里面找到 PinkConn，我们先只看读请求部分，回响应部分后面再看。

![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200504211547253-403441315.png)

在 conns\_里面找到的是对应 fd 的 PikaClientConn，使用 RedisConn::GetRequest 来读取客户端的的请求，此处有一个细节，如果 read_status 为 kReadAll，则一次完整的请求被读取，会先把这个请求 fd 的读写事件给删除。这是为啥呢？删除了不是后续就处理不了这个请求的读写吗，这个我们后面讲到了再说明。  
RedisConn::GetRequest 里面，使用 RedisParser::ProcessRequestBuffer 来解析读取到的内容，然后有 2 种处理方式，DealMessage 和 Complete

![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200504211604666-630946544.png)

先看下这两个函数的初始化，DealMessage 对应着 ParserDealMessageCb，Complete 对应着 ParserCompleteCb

![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200504211614176-1981251597.png)

我们看这两个方法，原来一个是同步处理，一个是异步，同步的话就是一个个命令调用 DealMessage 来处理，异步的话是解析完合成一组命令统一调 Complete 处理。异步的处理方式是将请求的命令提交给线程池来处理 PikaClientConn::AsynProcessRedisCmds，怎么提交的我们在工作线程池里面介绍。

![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200504211623299-1545622130.png)

## 3.工作线程池 ThreadPool

PikaServer 构造的时候会创建一个 PikaClientProcessor，PikaClientProcessor 里面有一个 ThreadPool，ThreadPool 启动时会创建 Worker 线程，Worker 线程实际的处理函数是 ThreadPool::runInThread()

![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200504211640808-501332565.png)

前面讲到 WorkerThread 解析完 redis 命令后会把命令提交给 ThreadPool 来处理，实际上是调用了线程池的 ThreadPool::Schedule 方法，Schedule 需要一个 TaskFunc 来真正处理命令，这里使用的是 DoBackgroundTask

![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200504211650944-528923964.png)

ThreadPool::Schedule 里面，把参数封装成 Task，然后 push 到线程池的任务队列，接着通知线程池处理，这里 WorkerThread 是生产者，线程池是消费者。

![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200504211659311-1593740381.png)

而线程池的工作线程，则是不断地在队列里面取出 Task 进行处理。

![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200504211706011-1186397446.png)

## 4.命令处理和响应流程

线程池里面实际处理命令的是 DoBackgroundTask，我们先来看看命令是怎么被处理的。DoBackgroundTask 里面调用的是 PikaClientConn::BatchExecRedisCmd

![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200504211725577-840307513.png)

BatchExecRedisCmd 里面是命令一个一个取出来 ExecRedisCmd，然后 PikaClientConn::DoCmd，响应消息先塞到 resp_array，在 TryWriteResp 里面又把响应一个个取出来塞到 response\_里，并且把 is_reply\_置为 true，然后做了一个 NotifyEpoll 的操作。

![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200504211734931-1122119978.png)

可以看到，这里把处理结果又封装成一个 PinkItem，然后和前面介绍的监听线程把连接请求分发给 WorkerThread 一样，把 PinkItem 放到 PinkEpoll 的队列里面，然后通过在管道里面写了一个字节的字符触发 epoll 的读事件。所以我们回过头来看看 WorkerThread 的处理 WorkerThread::ThreadMain

![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200504211746421-1789485029.png)

这里的流程和前面介绍的差不多，可以看到这里把这个连接的 fd 的读写事件重新加到 epoll 里面，前面我们留了一个疑问，在一次命令读取结束后，把连接 fd 的读写事件从 epoll 里面删除了，这是为啥呢？这里我们看到命令处理结束后又把读写事件加回来了。应该是因为 pika 用的是异步处理，一个连接的命令是异步地交给线程池处理，如果同个连接发了 2 个命令，因为是异步处理，没有办法保证 2 个命令满足 FIFO，即先来的命令需要先回复，后来的命令后回复，redis 是单线程模型，因此天然满足，pika 是多线程异步处理，所以这里在读取了第一个命令后，把连接的读写事件删除了，等前一个命令处理完了才加回来，读取第二个命令来处理。

_连接的 fd 加进 epoll 后，fd 可写了，那么 epoll 会返回可写事件，用 RedisConn::SendReply 来发送响应给客户端，如果写完了会把 fd 的写事件给删掉，如果没写完，则等 fd 可写了会继续触发写事件来写回复。_

![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200504211757806-720675248.png)

## 5.总结

通过上面的分析可以知道，监听线程是用来监听新的连接，连接来了会交由 WorkerThread 处理，已建立连接的请求会由 WorkerThread 封装成 Task 交给线程池 ThreadPool 处理，ThreadPool 处理完了后，还是由 WorkerThread 来回复。WorkerThread 就是做接收消息，回复消息的，而 ThreadPool 只是处理消息，不涉及接收和回复的 IO 操作。这 3 者的关系大概如下图所示：

![](https://img2020.cnblogs.com/blog/1993880/202005/1993880-20200504211808161-12335581.png)
