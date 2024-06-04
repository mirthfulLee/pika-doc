(window.webpackJsonp=window.webpackJsonp||[]).push([[58],{468:function(e,l,i){"use strict";i.r(l);var a=i(2),r=Object(a.a)({},(function(){var e=this,l=e._self._c;return l("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[l("p",[e._v("pika 使用的是多线程模型，使用多个工作线程来进行读写操作，由底层 blackwidow 引擎来保证线程安全，线程分为 12 种：")]),e._v(" "),l("ul",[l("li",[e._v("PikaServer：主线程")]),e._v(" "),l("li",[e._v("DispatchThread：监听 1 个端口，接收用户连接请求")]),e._v(" "),l("li",[e._v("WorkerThread：存在多个(用户配置)，每个线程里有若干个用户客户端的连接，负责接收用户命令，然后将命令封装成一个 Task 扔到 ThreadPool 执行，任务执行完毕之后由该线程将 reply 返回给用户")]),e._v(" "),l("li",[e._v("ThreadPool：线程池中的线程数量由用户配置，执行 WorkerThread 调度过来的 Task, Task 的内容主要是写 DB 和写 Binlog")]),e._v(" "),l("li",[e._v("PikaAuxiliaryThread：辅助线程，处理同步过程中状态机状态的切换，主从之间心跳的发送以及超时检查")]),e._v(" "),l("li",[e._v("PikaReplClient：本质上是一个 Epoll 线程(与其他 Pika 实例的 PikaReplServer 进行通信)加上一个由若干线程组成的线程数组(异步的处理写 Binlog 以及写 DB 的任务)")]),e._v(" "),l("li",[e._v("PikaReplServer：本质上是一个 Epoll 线程(与其他 Pika 实例的 PikaReplClient 进行通信)加上一个由若干线程组成的线程池(处理同步的请求以及根据从库返回的 Ack 更新 Binlog 滑窗)")]),e._v(" "),l("li",[e._v("KeyScanThread：在这个线程中执行 info keyspace 1 触发的统计 Key 数量的任务")]),e._v(" "),l("li",[e._v("BgSaveThread：对指定的 DB 进行 Dump 操作，以及全同步的时候发送 Dump 数据到从库（对一个 DB 执行全同步是先后向 Thread 中扔了 BgSave 以及 DBSync 两个任务从而保证顺序)")]),e._v(" "),l("li",[e._v("PurgeThread：用于清理过期的 Binlog 文件")]),e._v(" "),l("li",[e._v("PubSubThread：用于支持 PubSub 相关功能")])])])}),[],!1,null,null,null);l.default=r.exports}}]);