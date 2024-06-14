(window.webpackJsonp=window.webpackJsonp||[]).push([[51],{459:function(e,n,t){"use strict";t.r(n);var r=t(2),a=Object(r.a)({},(function(){var e=this,n=e._self._c;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h2",{attrs:{id:"pika主从同步"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#pika主从同步"}},[e._v("#")]),e._v(" pika主从同步")]),e._v(" "),n("p",[e._v("主要为了分析探索一下pika是如何实现主从同步的，pika的主从同步的原理与redis的同步方案还不相同，本文主要是为了分析其主从同步的相关流程（pika基于3.4版本）。")]),e._v(" "),n("h2",{attrs:{id:"pika主从同步原理"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#pika主从同步原理"}},[e._v("#")]),e._v(" pika主从同步原理")]),e._v(" "),n("p",[e._v("主从同步的原理，主要是通过在启动的时候启动了两部分的线程来进行的。")]),e._v(" "),n("ul",[n("li",[e._v("auxiliary_thread线程")]),e._v(" "),n("li",[e._v("pika_rm中的pika_repl_client线程池和pika_repl_server线程池")])]),e._v(" "),n("p",[e._v("先逐个分析一下两个部分线程的工作的流程。")]),e._v(" "),n("h3",{attrs:{id:"auxiliary-thread线程"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#auxiliary-thread线程"}},[e._v("#")]),e._v(" auxiliary_thread线程")]),e._v(" "),n("p",[e._v("在pika的pika_server的Start函数中启动了auxiliary_thread线程。")]),e._v(" "),n("div",{staticClass:"language-c++ extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('  ret = pika_auxiliary_thread_->StartThread();\n  if (ret != pink::kSuccess) {\n    tables_.clear();\n    LOG(FATAL) << "Start Auxiliary Thread Error: " << ret << (ret == pink::kCreateThreadError ? ": create thread error " : ": other error");\n  }\n')])])]),n("p",[e._v("此时启动的线程就是位于pika_auxiliary_thread.cc中的线程函数。")]),e._v(" "),n("div",{staticClass:"language-c++ extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('void* PikaAuxiliaryThread::ThreadMain() {\n  while (!should_stop()) {            //  是否停止线程\n    if (g_pika_conf->classic_mode()) {    // 判断当前运行的模式是分布式模式还是经典模式\n      if (g_pika_server->ShouldMetaSync()) {\n        g_pika_rm->SendMetaSyncRequest();\n      } else if (g_pika_server->MetaSyncDone()) {\n        g_pika_rm->RunSyncSlavePartitionStateMachine();\n      }\n    } else {\n      g_pika_rm->RunSyncSlavePartitionStateMachine();  // 分布式模式则直接启动状态机的同步\n    }\n\n    Status s = g_pika_rm->CheckSyncTimeout(slash::NowMicros());  // 检查超时的节点\n    if (!s.ok()) {\n      LOG(WARNING) << s.ToString();\n    }\n\n    // TODO(whoiami) timeout\n    s = g_pika_server->TriggerSendBinlogSync();     // 触发binlog的主从同步\n    if (!s.ok()) {\n      LOG(WARNING) << s.ToString();\n    }\n    // send to peer\n    int res = g_pika_server->SendToPeer();   // 将待发送的任务加入到工作线程队列中\n    if (!res) {\n      // sleep 100 ms\n      mu_.Lock();\n      cv_.TimedWait(100);\n      mu_.Unlock();\n    } else {\n      //LOG_EVERY_N(INFO, 1000) << "Consume binlog number " << res;\n    }\n  }\n  return NULL;\n}\n')])])]),n("h4",{attrs:{id:"runsyncslavepartitionstatemachine"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#runsyncslavepartitionstatemachine"}},[e._v("#")]),e._v(" RunSyncSlavePartitionStateMachine-")]),e._v(" "),n("p",[e._v("该函数就是处理主从同步过程中的状态机，根据不同的状态去进行不同的操作。")]),e._v(" "),n("div",{staticClass:"language-c++ extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('Status PikaReplicaManager::RunSyncSlavePartitionStateMachine() {\n  slash::RWLock l(&partitions_rw_, false);\n  for (const auto& item : sync_slave_partitions_) {   // 获取所有的从节点同步信息\n    PartitionInfo p_info = item.first;\n    std::shared_ptr<SyncSlavePartition> s_partition = item.second;\n    if (s_partition->State() == ReplState::kTryConnect) {   // 如果同步的信息是kTryConnect则发送TrySync的同步请求\n      LOG(WARNING) << "Partition start, Table Name: "\n          << p_info.table_name_ << " Partition Id: " << p_info.partition_id_;\n      SendPartitionTrySyncRequest(p_info.table_name_, p_info.partition_id_);\n    } else if (s_partition->State() == ReplState::kTryDBSync) {  // 如果是kTryDB的状态则发送DB同步的请求\n      SendPartitionDBSyncRequest(p_info.table_name_, p_info.partition_id_);\n    } else if (s_partition->State() == ReplState::kWaitReply) {  // 如果是wait状态则什么都不做\n      continue;\n    } else if (s_partition->State() == ReplState::kWaitDBSync) {  // 如果是waitdb状态则等待\n      std::shared_ptr<Partition> partition =\n          g_pika_server->GetTablePartitionById(\n                  p_info.table_name_, p_info.partition_id_);\n      if (partition) {\n        partition->TryUpdateMasterOffset();   // 更新和主之间的offset\n      } else {\n        LOG(WARNING) << "Partition not found, Table Name: "\n          << p_info.table_name_ << " Partition Id: " << p_info.partition_id_;\n      }\n    } else if (s_partition->State() == ReplState::kConnected\n      || s_partition->State() == ReplState::kNoConnect\n      || s_partition->State() == ReplState::kDBNoConnect) {  // 如果是已连接或者失联则什么都不处理\n      continue;\n    }\n  }\n  return Status::OK();\n}\n')])])]),n("p",[e._v("从状态机的运行来看，所有的步骤都是依赖于该函数通过状态来驱动进行不同的操作。")]),e._v(" "),n("h4",{attrs:{id:"checksynctimeout-检查连接的超时时间"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#checksynctimeout-检查连接的超时时间"}},[e._v("#")]),e._v(" CheckSyncTimeout-检查连接的超时时间")]),e._v(" "),n("div",{staticClass:"language-c++ extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('Status PikaReplicaManager::CheckSyncTimeout(uint64_t now) {\n  slash::RWLock l(&partitions_rw_, false);\n\n  for (auto& iter : sync_master_partitions_) {\n    std::shared_ptr<SyncMasterPartition> partition = iter.second;\n    Status s = partition->CheckSyncTimeout(now);  // 获取所有的master的同步节点检查是否超时\n    if (!s.ok()) {\n      LOG(WARNING) << "CheckSyncTimeout Failed " << s.ToString();\n    }\n  }\n  for (auto& iter : sync_slave_partitions_) {\n    std::shared_ptr<SyncSlavePartition> partition = iter.second;\n    Status s = partition->CheckSyncTimeout(now);  // 获取所有slave的同步节点信息检查是否超时\n    if (!s.ok()) {\n      LOG(WARNING) << "CheckSyncTimeout Failed " << s.ToString();\n    }\n  }\n  return Status::OK();\n}\n')])])]),n("p",[e._v("主要是检查master和slave的同步连接信息是否超时。")]),e._v(" "),n("div",{staticClass:"language-c++ extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('Status SyncMasterPartition::CheckSyncTimeout(uint64_t now) {\n  std::unordered_map<std::string, std::shared_ptr<SlaveNode>> slaves = GetAllSlaveNodes();\n\n  std::vector<Node> to_del;\n  for (auto& slave_iter : slaves) {\n    std::shared_ptr<SlaveNode> slave_ptr = slave_iter.second;   // 获取所有slave的连接信息\n    slash::MutexLock l(&slave_ptr->slave_mu);\n    if (slave_ptr->LastRecvTime() + kRecvKeepAliveTimeout < now) {  // 如果最后的时间超时则删除该连接\n      to_del.push_back(Node(slave_ptr->Ip(), slave_ptr->Port()));\n    } else if (slave_ptr->LastSendTime() + kSendKeepAliveTimeout < now && slave_ptr->sent_offset == slave_ptr->acked_offset) {  // 如果最后的发送时间未超时 并且主从同步的偏移量发送的与回复的相同则发送binlogchips请求并且更新当前的最后发送时间\n      std::vector<WriteTask> task;\n      RmNode rm_node(slave_ptr->Ip(), slave_ptr->Port(), slave_ptr->TableName(), slave_ptr->PartitionId(), slave_ptr->SessionId());\n      WriteTask empty_task(rm_node, BinlogChip(LogOffset(), ""), LogOffset());\n      task.push_back(empty_task);\n      Status s = g_pika_rm->SendSlaveBinlogChipsRequest(slave_ptr->Ip(), slave_ptr->Port(), task);    // 同步当前的主从同步的信息\n      slave_ptr->SetLastSendTime(now);\n      if (!s.ok()) {\n        LOG(INFO)<< "Send ping failed: " << s.ToString();\n        return Status::Corruption("Send ping failed: " + slave_ptr->Ip() + ":" + std::to_string(slave_ptr->Port()));\n      }\n    }\n  }\n\n  for (auto& node : to_del) {  // 将超时的连接信息都删除掉\n    coordinator_.SyncPros().RemoveSlaveNode(node.Ip(), node.Port());\n    g_pika_rm->DropItemInWriteQueue(node.Ip(), node.Port());\n    LOG(WARNING) << SyncPartitionInfo().ToString() << " Master del Recv Timeout slave success " << node.ToString();\n  }\n  return Status::OK();\n}\n')])])]),n("p",[e._v("主节点主要维护了当前的一些主从连接的信息维护。")]),e._v(" "),n("div",{staticClass:"language-c++ extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("Status SyncSlavePartition::CheckSyncTimeout(uint64_t now) {\n  slash::MutexLock l(&partition_mu_);\n  // no need to do session keepalive return ok\n  if (repl_state_ != ReplState::kWaitDBSync && repl_state_ != ReplState::kConnected) {\n    return Status::OK();  // 如果从节点的信息不是waitdb或者连接状态则返回ok\n  }\n  if (m_info_.LastRecvTime() + kRecvKeepAliveTimeout < now) {\n    // update slave state to kTryConnect, and try reconnect to master node\n    repl_state_ = ReplState::kTryConnect;\n    g_pika_server->SetLoopPartitionStateMachine(true);  // 否则就设置成tryconnect状态去尝试连接主节点\n  }\n  return Status::OK();\n}\n")])])]),n("h4",{attrs:{id:"triggersendbinlogsync-生成每个节点待发送的数据任务"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#triggersendbinlogsync-生成每个节点待发送的数据任务"}},[e._v("#")]),e._v(" TriggerSendBinlogSync-生成每个节点待发送的数据任务")]),e._v(" "),n("div",{staticClass:"language-c++ extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("Status PikaServer::TriggerSendBinlogSync() {\n  return g_pika_rm->WakeUpBinlogSync();\n}\n\n...\n\nStatus PikaReplicaManager::WakeUpBinlogSync() {\n  slash::RWLock l(&partitions_rw_, false);\n  for (auto& iter : sync_master_partitions_) {\n    std::shared_ptr<SyncMasterPartition> partition = iter.second;\n    Status s = partition->WakeUpSlaveBinlogSync(); // 检查每个节点是否需要生成binlog同步任务\n    if (!s.ok()) {\n      return s;\n    }\n  }\n  return Status::OK();\n}\n")])])]),n("p",[e._v("主要是检查每个连接的从节点信息是否需要生成同步binlog任务。")]),e._v(" "),n("div",{staticClass:"language-c++ extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('Status SyncMasterPartition::WakeUpSlaveBinlogSync() {\n  std::unordered_map<std::string, std::shared_ptr<SlaveNode>> slaves = GetAllSlaveNodes();\n  std::vector<std::shared_ptr<SlaveNode>> to_del;\n  for (auto& slave_iter : slaves) {\n    std::shared_ptr<SlaveNode> slave_ptr = slave_iter.second;\n    slash::MutexLock l(&slave_ptr->slave_mu);\n    if (slave_ptr->sent_offset == slave_ptr->acked_offset) {  // 检查当前同步的数据信息是否跟回复的数据偏移相同\n      Status s = ReadBinlogFileToWq(slave_ptr);  // 写binlog任务到该从节点连接上面\n      if (!s.ok()) {\n        to_del.push_back(slave_ptr);\n        LOG(WARNING) << "WakeUpSlaveBinlogSync falied, Delete from RM, slave: " <<\n          slave_ptr->ToStringStatus() << " " << s.ToString();\n      }\n    }\n  }\n  for (auto& to_del_slave : to_del) {  // 如果同步失败则删除该node\n    RemoveSlaveNode(to_del_slave->Ip(), to_del_slave->Port());\n  }\n  return Status::OK();\n}\n')])])]),n("p",[e._v("其中ReadBinlogFileToWq就是根据当前的连接来生成binlog同步任务。")]),e._v(" "),n("div",{staticClass:"language-c++ extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('Status SyncMasterPartition::ReadBinlogFileToWq(const std::shared_ptr<SlaveNode>& slave_ptr) {\n  int cnt = slave_ptr->sync_win.Remaining();\n  std::shared_ptr<PikaBinlogReader> reader = slave_ptr->binlog_reader;  //获取当前binlogreader\n  if (reader == nullptr) {\n    return Status::OK();\n  }\n  std::vector<WriteTask> tasks;\n  for (int i = 0; i < cnt; ++i) {\n    std::string msg;\n    uint32_t filenum;\n    uint64_t offset;\n    if (slave_ptr->sync_win.GetTotalBinlogSize() > PIKA_MAX_CONN_RBUF_HB * 2) {\n      LOG(INFO) << slave_ptr->ToString() << " total binlog size in sync window is :"\n                << slave_ptr->sync_win.GetTotalBinlogSize();\n      break;  //检查当前同步窗口的大小\n    }\n    Status s = reader->Get(&msg, &filenum, &offset);  //获取对应的偏移数据\n    if (s.IsEndFile()) {\n      break;\n    } else if (s.IsCorruption() || s.IsIOError()) {\n      LOG(WARNING) << SyncPartitionInfo().ToString()\n        << " Read Binlog error : " << s.ToString();\n      return s;\n    }\n    BinlogItem item;\n    if (!PikaBinlogTransverter::BinlogItemWithoutContentDecode(\n          TypeFirst, msg, &item)) {\n      LOG(WARNING) << "Binlog item decode failed";\n      return Status::Corruption("Binlog item decode failed");\n    }\n    BinlogOffset sent_b_offset = BinlogOffset(filenum, offset);   // 生成发送的偏移量\n    LogicOffset sent_l_offset = LogicOffset(item.term_id(), item.logic_id());\n    LogOffset sent_offset(sent_b_offset, sent_l_offset);\n\n    slave_ptr->sync_win.Push(SyncWinItem(sent_offset, msg.size()));  //设置同步窗口的大小\n    slave_ptr->SetLastSendTime(slash::NowMicros());   //设置最后的发送时间\n    RmNode rm_node(slave_ptr->Ip(), slave_ptr->Port(), slave_ptr->TableName(), slave_ptr->PartitionId(), slave_ptr->SessionId());\n    WriteTask task(rm_node, BinlogChip(sent_offset, msg), slave_ptr->sent_offset);\n    tasks.push_back(task);  // 包装成任务\n    slave_ptr->sent_offset = sent_offset;  // 设置当前的发送偏移量\n  }\n\n  if (!tasks.empty()) {\n    g_pika_rm->ProduceWriteQueue(slave_ptr->Ip(), slave_ptr->Port(), partition_info_.partition_id_, tasks);  // 将任务放入队列中等待处理\n  }\n  return Status::OK();\n}\n')])])]),n("p",[e._v("主要就是通过获取偏移量，然后生成任务并放入发送队列中等待处理。")]),e._v(" "),n("h4",{attrs:{id:"sendtopeer-将待发送的binlog同步任务发送给从节点"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#sendtopeer-将待发送的binlog同步任务发送给从节点"}},[e._v("#")]),e._v(" SendToPeer-将待发送的binlog同步任务发送给从节点")]),e._v(" "),n("div",{staticClass:"language-c++ extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('int PikaServer::SendToPeer() {\n  return g_pika_rm->ConsumeWriteQueue();\n}\n\n...\n  \nint PikaReplicaManager::ConsumeWriteQueue() {\n  std::unordered_map<std::string, std::vector<std::vector<WriteTask>>> to_send_map;\n  int counter = 0;\n  {\n    slash::MutexLock l(&write_queue_mu_);\n    for (auto& iter : write_queues_) {\n      const std::string& ip_port = iter.first;\n      std::unordered_map<uint32_t, std::queue<WriteTask>>& p_map = iter.second; //获取队列\n      for (auto& partition_queue : p_map) {\n        std::queue<WriteTask>& queue = partition_queue.second;\n        for (int i = 0; i < kBinlogSendPacketNum; ++i) {\n          if (queue.empty()) {\n            break;\n          }\n          size_t batch_index = queue.size() > kBinlogSendBatchNum ? kBinlogSendBatchNum : queue.size();   // 检查当前可发送的大小\n          std::vector<WriteTask> to_send;\n          int batch_size = 0;\n          for (size_t i = 0; i < batch_index; ++i) {\n            WriteTask& task = queue.front();\n            batch_size +=  task.binlog_chip_.binlog_.size();\n            // make sure SerializeToString will not over 2G\n            if (batch_size > PIKA_MAX_CONN_RBUF_HB) {\n              break;\n            }\n            to_send.push_back(task);  // 放入可发送的队列中\n            queue.pop();\n            counter++;\n          }\n          if (!to_send.empty()) {\n            to_send_map[ip_port].push_back(std::move(to_send));\n          }\n        }\n      }\n    }\n  }\n\n  std::vector<std::string> to_delete;\n  for (auto& iter : to_send_map) {\n    std::string ip;\n    int port = 0;\n    if (!slash::ParseIpPortString(iter.first, ip, port)) {\n      LOG(WARNING) << "Parse ip_port error " << iter.first;\n      continue;\n    }\n    for (auto& to_send : iter.second) {\n      Status s = pika_repl_server_->SendSlaveBinlogChips(ip, port, to_send); // 发送Binglog任务\n      if (!s.ok()) {\n        LOG(WARNING) << "send binlog to " << ip << ":" << port << " failed, " << s.ToString();\n        to_delete.push_back(iter.first);  // 如果发送失败则放入失败队列中\n        continue;\n      }\n    }\n  }\n\n  if (!to_delete.empty()) {\n    {\n      slash::MutexLock l(&write_queue_mu_);\n      for (auto& del_queue : to_delete) {\n        write_queues_.erase(del_queue);  //删除发送失败的任务\n      }\n    }\n  }\n  return counter;\n}\n')])])]),n("p",[e._v("最终通过pika_repl_server_的SendSlaveBinlogChip"),n("a",{attrs:{href:"https://so.csdn.net/so/search?q=s%E5%87%BD%E6%95%B0&spm=1001.2101.3001.7020",target:"_blank",rel:"noopener noreferrer"}},[e._v("s函数"),n("OutboundLink")],1),e._v("将当前待发送的任务发送出去。")]),e._v(" "),n("h3",{attrs:{id:"pika-repl-client和pika-repl-server-线程"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#pika-repl-client和pika-repl-server-线程"}},[e._v("#")]),e._v(" pika_repl_client和pika_repl_server_线程")]),e._v(" "),n("p",[e._v("这两个线程就是维护了主从连接的client和server端的交互功能，auxiliary_thread中状态机触发的连接状态就是依赖于这两个线程来完成交互。")]),e._v(" "),n("h4",{attrs:{id:"pika-repl-client客户端连接管理线程"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#pika-repl-client客户端连接管理线程"}},[e._v("#")]),e._v(" pika_repl_client客户端连接管理线程")]),e._v(" "),n("p",[e._v("pika_reple_client的最核心的原理就是通过一个基于epoll（linux平台）的事件驱动，去完成多个连接的事件驱动，并通过加入线程池来提供epoll的处理性能。接下来就大致了解一下pika_repl_client完成的交互的相关功能。")]),e._v(" "),n("p",[e._v("在主从同步过程中，无论是pika_repl_client还是pika_repl_server_底层都利用了pink库的PbConn模式来进行的数据交互。")]),e._v(" "),n("p",[e._v("通过client_thread的逻辑流程来简单分析一下PbConn的执行流程。")]),e._v(" "),n("p",[e._v("在PikaReplClient的Start流程中，启动了如下线程。")]),e._v(" "),n("div",{staticClass:"language-c++ extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('int PikaReplClient::Start() {\n  int res = client_thread_->StartThread();   // 启动一个epoll的事件驱动\n  if (res != pink::kSuccess) {\n    LOG(FATAL) << "Start ReplClient ClientThread Error: " << res << (res == pink::kCreateThreadError ? ": create thread error " : ": other error");\n  }\n  for (size_t i = 0; i < bg_workers_.size(); ++i) {  // 通过将epoll事件驱动的执行分发到线程池中执行\n    res = bg_workers_[i]->StartThread();\n    if (res != pink::kSuccess) {\n      LOG(FATAL) << "Start Pika Repl Worker Thread Error: " << res\n        << (res == pink::kCreateThreadError ? ": create thread error " : ": other error");\n    }\n  }\n  return res;\n}\n')])])]),n("p",[e._v("此时client_thread启动的就是位于pink的client_thread.c中的ClientThread线程。")]),e._v(" "),n("div",{staticClass:"language-c++ extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('void *ClientThread::ThreadMain() {\n  int nfds = 0;\n  PinkFiredEvent *pfe = NULL;\n\n  struct timeval when;\n  gettimeofday(&when, NULL);\n  struct timeval now = when;\n\n  when.tv_sec += (cron_interval_ / 1000);\n  when.tv_usec += ((cron_interval_ % 1000) * 1000);\n  int timeout = cron_interval_;\n  if (timeout <= 0) {\n    timeout = PINK_CRON_INTERVAL;\n  }\n\n  std::string ip_port;\n\n  while (!should_stop()) {\n    if (cron_interval_ > 0) {\n      gettimeofday(&now, nullptr);\n      if (when.tv_sec > now.tv_sec ||\n          (when.tv_sec == now.tv_sec && when.tv_usec > now.tv_usec)) {\n        timeout = (when.tv_sec - now.tv_sec) * 1000 +\n          (when.tv_usec - now.tv_usec) / 1000;\n      } else {\n        // do user defined cron\n        handle_->CronHandle();   // 执行定时任务\n\n        DoCronTask();\n        when.tv_sec = now.tv_sec + (cron_interval_ / 1000);\n        when.tv_usec = now.tv_usec + ((cron_interval_ % 1000) * 1000);\n        timeout = cron_interval_;\n      }\n    }\n    //{\n    //InternalDebugPrint();\n    //}\n    nfds = pink_epoll_->PinkPoll(timeout);  //事件驱动\n    for (int i = 0; i < nfds; i++) {\n      pfe = (pink_epoll_->firedevent()) + i;\n      if (pfe == NULL) {\n        continue;\n      }\n\n      if (pfe->fd == pink_epoll_->notify_receive_fd()) {  // 处理驱动\n        ProcessNotifyEvents(pfe);\n        continue;\n      }\n\n      int should_close = 0;\n      std::map<int, std::shared_ptr<PinkConn>>::iterator iter = fd_conns_.find(pfe->fd);\n      if (iter == fd_conns_.end()) {\n        log_info("fd %d not found in fd_conns\\n", pfe->fd);\n        pink_epoll_->PinkDelEvent(pfe->fd);\n        continue;\n      }\n\n      std::shared_ptr<PinkConn> conn = iter->second;\n\n      if (connecting_fds_.count(pfe->fd)) {\n        Status s = ProcessConnectStatus(pfe, &should_close);\n        if (!s.ok()) {\n          handle_->DestConnectFailedHandle(conn->ip_port(), s.ToString());\n        }\n        connecting_fds_.erase(pfe->fd);\n      }\n\n      if (!should_close && (pfe->mask & EPOLLOUT) && conn->is_reply()) {\n        WriteStatus write_status = conn->SendReply();   // 如果当前是可以写数据则调用SendReply\n        conn->set_last_interaction(now);\n        if (write_status == kWriteAll) {\n          pink_epoll_->PinkModEvent(pfe->fd, 0, EPOLLIN);\n          conn->set_is_reply(false);\n        } else if (write_status == kWriteHalf) {\n          continue;\n        } else {\n          log_info("send reply error %d\\n", write_status);\n          should_close = 1;\n        }\n      }\n\n      if (!should_close && (pfe->mask & EPOLLIN)) {\n        ReadStatus read_status = conn->GetRequest();  // 如果是接受数据则调用GetRequest来解析\n        conn->set_last_interaction(now);\n        if (read_status == kReadAll) {\n          // pink_epoll_->PinkModEvent(pfe->fd, 0, EPOLLOUT);\n        } else if (read_status == kReadHalf) {\n          continue;\n        } else {\n          log_info("Get request error %d\\n", read_status);\n          should_close = 1;\n        }\n      }\n\n      if ((pfe->mask & EPOLLERR) || (pfe->mask & EPOLLHUP) || should_close) {\n        {\n          log_info("close connection %d reason %d %d\\n", pfe->fd, pfe->mask, should_close);\n          pink_epoll_->PinkDelEvent(pfe->fd);  // 如果关闭则删除该事件\n          CloseFd(conn);\n          fd_conns_.erase(pfe->fd);\n          if (ipport_conns_.count(conn->ip_port())) {\n            ipport_conns_.erase(conn->ip_port());\n          }\n          if (connecting_fds_.count(conn->fd())) {\n            connecting_fds_.erase(conn->fd());\n          }\n        }\n      }\n    }\n  }\n  return nullptr;\n}\n')])])]),n("p",[e._v("通过client_thread的执行函数可知，这是一个标准的事件驱动模型。如果可写入则调用conn的SendReply函数，如果是接受事情则调用conn的GetRequest函数。此时的conn就是PbConn。")]),e._v(" "),n("div",{staticClass:"language-c++ extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('// Msg is [ length(COMMAND_HEADER_LENGTH) | body(length bytes) ]\n//   step 1. kHeader, we read COMMAND_HEADER_LENGTH bytes;\n//   step 2. kPacket, we read header_len bytes;\nReadStatus PbConn::GetRequest() {\n  while (true) {\n    switch (connStatus_) {\n      case kHeader: {\n        ssize_t nread = read(\n            fd(), rbuf_ + cur_pos_, COMMAND_HEADER_LENGTH - cur_pos_); // 解析头部信息\n        if (nread == -1) {\n          if (errno == EAGAIN) {\n            return kReadHalf;\n          } else {\n            return kReadError;\n          }\n        } else if (nread == 0) {\n          return kReadClose;\n        } else {\n          cur_pos_ += nread;\n          if (cur_pos_ == COMMAND_HEADER_LENGTH) {\n            uint32_t integer = 0;\n            memcpy(reinterpret_cast<char*>(&integer),\n                   rbuf_, sizeof(uint32_t));\n            header_len_ = ntohl(integer);\n            remain_packet_len_ = header_len_;\n            connStatus_ = kPacket;\n            continue;\n          }\n          return kReadHalf;\n        }\n      }\n      case kPacket: {\n        if (header_len_ > rbuf_len_ - COMMAND_HEADER_LENGTH) {  //解析packet\n          uint32_t new_size = header_len_ + COMMAND_HEADER_LENGTH;\n          if (new_size < kProtoMaxMessage) {\n            rbuf_ = reinterpret_cast<char *>(realloc(rbuf_, sizeof(char) * new_size));\n            if (rbuf_ == NULL) {\n              return kFullError;\n            }\n            rbuf_len_ = new_size;\n            log_info("Thread_id %ld Expand rbuf to %u, cur_pos_ %u\\n", pthread_self(), new_size, cur_pos_);\n          } else {\n            return kFullError;\n          }\n        }\n        // read msg body\n        ssize_t nread = read(fd(), rbuf_ + cur_pos_, remain_packet_len_);\n        if (nread == -1) {\n          if (errno == EAGAIN) {\n            return kReadHalf;\n          } else {\n            return kReadError;\n          }\n        } else if (nread == 0) {\n          return kReadClose;\n        }\n        cur_pos_ += nread;\n        remain_packet_len_ -= nread;\n        if (remain_packet_len_ == 0) {\n          connStatus_ = kComplete;\n          continue;\n        }\n        return kReadHalf;\n      }\n      case kComplete: {  //解析完成之后调用DealMessage函数来处理\n        if (DealMessage() != 0) {\n          return kDealError;\n        }\n        connStatus_ = kHeader;\n        cur_pos_ = 0;\n        return kReadAll;\n      }\n      // Add this switch case just for delete compile warning\n      case kBuildObuf:\n        break;\n\n      case kWriteObuf:\n        break;\n    }\n  }\n\n  return kReadHalf;\n}\n\nWriteStatus PbConn::SendReply() {\n  ssize_t nwritten = 0;\n  size_t item_len;\n  slash::MutexLock l(&resp_mu_);\n  while (!write_buf_.queue_.empty()) {  //写入的队列是否为空\n    std::string item = write_buf_.queue_.front();\n    item_len = item.size();\n    while (item_len - write_buf_.item_pos_ > 0) {\n      nwritten = write(fd(), item.data() + write_buf_.item_pos_, item_len - write_buf_.item_pos_);   // 将数据写入对应的文件描述符\n      if (nwritten <= 0) {\n        break;\n      }\n      write_buf_.item_pos_ += nwritten;\n      if (write_buf_.item_pos_ == item_len) {\n        write_buf_.queue_.pop();\n        write_buf_.item_pos_ = 0;\n        item_len = 0;\n      }\n    }\n    if (nwritten == -1) {\n      if (errno == EAGAIN) {\n        return kWriteHalf;\n      } else {\n        // Here we should close the connection\n        return kWriteError;\n      }\n    }\n    if (item_len - write_buf_.item_pos_ != 0) {\n      return kWriteHalf;\n    }\n  }\n  return kWriteAll;\n}\n')])])]),n("p",[e._v("从client的事件驱动可知，处理的主要的逻辑函数就是自定义的DealMessage()函数。")]),e._v(" "),n("p",[e._v("我们继续分析PikaReplClientConn类。")]),e._v(" "),n("p",[e._v("在pika_repl_client_thread.h的定义中。")]),e._v(" "),n("div",{staticClass:"language-c++ extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('class PikaReplClientThread : public pink::ClientThread {\n public:\n  PikaReplClientThread(int cron_interval, int keepalive_timeout);\n  virtual ~PikaReplClientThread() = default;\n  int Start();\n\n private:\n  class ReplClientConnFactory : public pink::ConnFactory {\n   public:\n    virtual std::shared_ptr<pink::PinkConn> NewPinkConn(\n        int connfd,\n        const std::string &ip_port,\n        pink::Thread *thread,\n        void* worker_specific_data,\n        pink::PinkEpoll* pink_epoll) const override {\n      return std::static_pointer_cast<pink::PinkConn>\n        (std::make_shared<PikaReplClientConn>(connfd, ip_port, thread, worker_specific_data, pink_epoll));  // 新连接进来的时候通过初始化成PikaReplClientConn\n    }\n  };\n  class ReplClientHandle : public pink::ClientHandle {\n   public:\n    void CronHandle() const override {\n    }\n    void FdTimeoutHandle(int fd, const std::string& ip_port) const override;\n    void FdClosedHandle(int fd, const std::string& ip_port) const override;\n    bool AccessHandle(std::string& ip) const override {\n      // ban 127.0.0.1 if you want to test this routine\n      // if (ip.find("127.0.0.2") != std::string::npos) {\n      //   std::cout << "AccessHandle " << ip << std::endl;\n      //   return false;\n      // }\n      return true;\n    }\n    int CreateWorkerSpecificData(void** data) const override {\n      return 0;\n    }\n    int DeleteWorkerSpecificData(void* data) const override {\n      return 0;\n    }\n    void DestConnectFailedHandle(std::string ip_port, std::string reason) const override {\n    }\n  };\n\n  ReplClientConnFactory conn_factory_;\n  ReplClientHandle handle_;\n};\n')])])]),n("p",[e._v("由于每次client_thread都会将新连接通过PikaReplClientConn来初始化，故每次有事件驱动的时候就调用该PikaReplClientConn的Dealmessage函数，来处理解析的数据。")]),e._v(" "),n("div",{staticClass:"language-c++ extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('int PikaReplClientConn::DealMessage() {\n  std::shared_ptr<InnerMessage::InnerResponse> response =  std::make_shared<InnerMessage::InnerResponse>();\n  ::google::protobuf::io::ArrayInputStream input(rbuf_ + cur_pos_ - header_len_, header_len_);\n  ::google::protobuf::io::CodedInputStream decoder(&input);\n  decoder.SetTotalBytesLimit(g_pika_conf->max_conn_rbuf_size(), g_pika_conf->max_conn_rbuf_size());\n  bool success = response->ParseFromCodedStream(&decoder) && decoder.ConsumedEntireMessage();  \n  if (!success) {\n    LOG(WARNING) << "ParseFromArray FAILED! " << " msg_len: " << header_len_;\n    g_pika_server->SyncError();\n    return -1;\n  }\n  switch (response->type()) {  // 根据协议解析的类型来判断执行什么操作\n    case InnerMessage::kMetaSync:\n    {\n      ReplClientTaskArg* task_arg = new ReplClientTaskArg(response, std::dynamic_pointer_cast<PikaReplClientConn>(shared_from_this()));\n      g_pika_rm->ScheduleReplClientBGTask(&PikaReplClientConn::HandleMetaSyncResponse, static_cast<void*>(task_arg));  // 如果是元数据同步，将该事件放入到处理线程池中执行\n      break;\n    }\n    case InnerMessage::kDBSync:\n    {\n      ReplClientTaskArg* task_arg = new ReplClientTaskArg(response, std::dynamic_pointer_cast<PikaReplClientConn>(shared_from_this()));\n      g_pika_rm->ScheduleReplClientBGTask(&PikaReplClientConn::HandleDBSyncResponse, static_cast<void*>(task_arg));\n      break;\n    }\n    case InnerMessage::kTrySync:\n    {\n      ReplClientTaskArg* task_arg = new ReplClientTaskArg(response, std::dynamic_pointer_cast<PikaReplClientConn>(shared_from_this()));\n      g_pika_rm->ScheduleReplClientBGTask(&PikaReplClientConn::HandleTrySyncResponse, static_cast<void*>(task_arg));  // 如果是同步则放入线程池中去执行HandleTrySyncResponse函数\n      break;\n    }\n    case InnerMessage::kBinlogSync:\n    {\n      DispatchBinlogRes(response);  // binlog同步处理\n      break;\n    }\n    case InnerMessage::kRemoveSlaveNode:\n    {\n      ReplClientTaskArg* task_arg = new ReplClientTaskArg(response, std::dynamic_pointer_cast<PikaReplClientConn>(shared_from_this()));\n      g_pika_rm->ScheduleReplClientBGTask(&PikaReplClientConn::HandleRemoveSlaveNodeResponse, static_cast<void*>(task_arg));\n      break;\n    }\n    default:\n      break;\n  }\n  return 0;\n}\n')])])]),n("p",[e._v("至此，一个pika_repl_client的整个的处理流程就清晰，即每次都会根据协议调用PikaReplClientConn的DealMessage函数，将每个执行任务放入线程池中去处理。")]),e._v(" "),n("h4",{attrs:{id:"pika-repl-server线程"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#pika-repl-server线程"}},[e._v("#")]),e._v(" pika_repl_server线程")]),e._v(" "),n("p",[e._v("该线程的核心思想与pika_repl_client的处理流程差不多，只不过在pink中对应的是HolyThread，处理流程大同小异，最终调用的就是PikaReplServerConn的DealMessage方法。")]),e._v(" "),n("div",{staticClass:"language-c++ extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('int PikaReplServerConn::DealMessage() {\n  std::shared_ptr<InnerMessage::InnerRequest> req = std::make_shared<InnerMessage::InnerRequest>();\n  bool parse_res = req->ParseFromArray(rbuf_ + cur_pos_ - header_len_, header_len_);\n  if (!parse_res) {\n    LOG(WARNING) << "Pika repl server connection pb parse error.";\n    return -1;\n  }\n  switch (req->type()) {\n    case InnerMessage::kMetaSync:\n    {\n      ReplServerTaskArg* task_arg = new ReplServerTaskArg(req, std::dynamic_pointer_cast<PikaReplServerConn>(shared_from_this()));\n      g_pika_rm->ScheduleReplServerBGTask(&PikaReplServerConn::HandleMetaSyncRequest, task_arg);\n      break;\n    }\n    case InnerMessage::kTrySync:\n    {\n      ReplServerTaskArg* task_arg = new ReplServerTaskArg(req, std::dynamic_pointer_cast<PikaReplServerConn>(shared_from_this()));\n      g_pika_rm->ScheduleReplServerBGTask(&PikaReplServerConn::HandleTrySyncRequest, task_arg);\n      break;\n    }\n    case InnerMessage::kDBSync:\n    {\n      ReplServerTaskArg* task_arg = new ReplServerTaskArg(req, std::dynamic_pointer_cast<PikaReplServerConn>(shared_from_this()));\n      g_pika_rm->ScheduleReplServerBGTask(&PikaReplServerConn::HandleDBSyncRequest, task_arg);\n      break;\n    }\n    case InnerMessage::kBinlogSync:\n    {\n      ReplServerTaskArg* task_arg = new ReplServerTaskArg(req, std::dynamic_pointer_cast<PikaReplServerConn>(shared_from_this()));\n      g_pika_rm->ScheduleReplServerBGTask(&PikaReplServerConn::HandleBinlogSyncRequest, task_arg);\n      break;\n    }\n    case InnerMessage::kRemoveSlaveNode:\n    {\n      ReplServerTaskArg* task_arg = new ReplServerTaskArg(req, std::dynamic_pointer_cast<PikaReplServerConn>(shared_from_this()));\n      g_pika_rm->ScheduleReplServerBGTask(&PikaReplServerConn::HandleRemoveSlaveNodeRequest, task_arg);\n      break;\n    }\n    default:\n      break;\n  }\n  return 0;\n}\n\n')])])]),n("h3",{attrs:{id:"主从同步的流程"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#主从同步的流程"}},[e._v("#")]),e._v(" 主从同步的流程")]),e._v(" "),n("p",[e._v("pika_repl_server的流程可用如图描述。")]),e._v(" "),n("p",[n("img",{attrs:{src:"https://img-blog.csdnimg.cn/f5f65e0cb6e74b45a9afbc45933ab12f.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5bCP5bGL5a2Q5aSn5L6g,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center",alt:"在这里插入图片描述"}})]),e._v(" "),n("p",[e._v("pika_repl_client的流程可用如图描述。")]),e._v(" "),n("p",[n("img",{attrs:{src:"https://img-blog.csdnimg.cn/8cd2006d23814034b0b6372412506363.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5bCP5bGL5a2Q5aSn5L6g,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center",alt:"在这里插入图片描述"}})]),e._v(" "),n("p",[e._v("主从的状态机流程如下。")]),e._v(" "),n("p",[n("img",{attrs:{src:"https://img-blog.csdnimg.cn/9fbd751015384d198c2ea514e4ca84b6.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5bCP5bGL5a2Q5aSn5L6g,size_12,color_FFFFFF,t_70,g_se,x_16#pic_center",alt:"在这里插入图片描述"}})]),e._v(" "),n("p",[e._v("通过如上三个图就可以能够明白pika官网描述的主从同步的流程图。")]),e._v(" "),n("p",[n("a",{attrs:{href:"https://github.com/OpenAtomFoundation/pika/wiki/pika-%E5%A2%9E%E9%87%8F%E5%90%8C%E6%AD%A5",target:"_blank",rel:"noopener noreferrer"}},[e._v("pika-增量同步"),n("OutboundLink")],1)]),e._v(" "),n("p",[n("a",{attrs:{href:"https://github.com/OpenAtomFoundation/pika/wiki/pika-%E5%85%A8%E5%90%8C%E6%AD%A5",target:"_blank",rel:"noopener noreferrer"}},[e._v("pika-全同步"),n("OutboundLink")],1)]),e._v(" "),n("h2",{attrs:{id:"总结"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[e._v("#")]),e._v(" 总结")]),e._v(" "),n("p",[e._v("本文根据pika官网的流程，分析了一下pika主从的一个大致流程，其中还包含了很多的技术细节限于本文篇幅并没有详尽分析，主要通过原理流程的一个分析来查看了主从同步的状态机线程，和主从同步的线程模型的基本原理。由于本人才疏学浅，如有错误请批评指正。")])])}),[],!1,null,null,null);n.default=a.exports}}]);