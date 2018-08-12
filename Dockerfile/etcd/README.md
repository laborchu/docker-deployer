###参数说明

- -name：方便理解的节点名称，默认为 default，在集群中应该保持唯一，可以使用 hostname
- -data-dir：服务运行数据保存的路径，默认为 ${name}.etcd
- -snapshot-count：指定有多少事务（transaction）被提交时，触发截取快照保存到磁盘
- -heartbeat-interval：leader 多久发送一次心跳到 followers。默认值是 100ms
- -eletion-timeout：重新投票的超时时间，如果 follow 在该时间间隔没有收到心跳包，会触发重新投票，默认为 1000 ms
- -listen-peer-urls：和同伴通信的地址，比如 http://ip:2380，如果有多个，使用逗号分隔。需要所有节点都能够访问，所以不要使用 localhost！
- -listen-client-urls：对外提供服务的地址：比如 http://ip:2379,http://127.0.0.1:2379，客户端会连接到这里和 etcd 交互，如果服务启动时，设置了--listen-client-urls，需要设置 --advertise-client-urls
- -advertise-client-urls：对外公告的该节点客户端监听地址，这个值会告诉集群中其他节点
- -initial-advertise-peer-urls：该节点同伴监听地址，这个值会告诉集群中其他节点
- -initial-cluster：集群中所有节点的信息，格式为 node1=http://ip1:2380,node2=http://ip2:2380,…。注意：这里的 node1 是节点的 --name 指定的名字；后面的 ip1:2380 是 --initial-advertise-peer-urls 指定的值
- -initial-cluster-state：新建集群的时候，这个值为 new；假如已经存在的集群，这个值为 existing
- -initial-cluster-token：创建集群的 token，这个值每个集群保持唯一。这样的话，如果你要重新创建集群，即使配置和之前一样，也会再次生成新的集群和节点 uuid；否则会导致多个集群之间的冲突，造成未知的错误

###启动脚本
```
#!/bin/bash
/root/etcd/etcd -name etcd2 -data-dir /root/.etcd/data -initial-advertise-peer-urls http://172.17.0.4:2380 \
  -listen-peer-urls http://172.17.0.4:2380 \
  -listen-client-urls http://172.17.0.4:2379,http://127.0.0.1:2379 \
  -advertise-client-urls http://172.17.0.4:2379 \
  -initial-cluster-token my-etcd-cluster \
  -initial-cluster etcd0=http://172.17.0.2:2380,etcd1=http://172.17.0.3:2380,etcd2=http://172.17.0.4:2380 \
  -initial-cluster-state new
```

###etcdctl使用
```
COMMANDS:
     backup          backup an etcd directory
     cluster-health  check the health of the etcd cluster
     mk              make a new key with a given value
     mkdir           make a new directory
     rm              remove a key or a directory
     rmdir           removes the key if it is an empty directory or a key-value pair
     get             retrieve the value of a key
     ls              retrieve a directory
     set             set the value of a key
     setdir          create a new directory or update an existing directory TTL
     update          update an existing key with a given value
     updatedir       update an existing directory
     watch           watch a key for changes
     exec-watch      watch a key for changes and exec an executable
     member          member add, remove and list subcommands
     user            user add, grant and revoke subcommands
     role            role add, grant and revoke subcommands
     auth            overall auth controls

GLOBAL OPTIONS:
   --debug                          output cURL commands which can be used to reproduce the request
   --no-sync                        don't synchronize cluster information before sending request
   --output simple, -o simple       output response in the given format (simple, `extended` or `json`) (default: "simple")
   --discovery-srv value, -D value  domain name to query for SRV records describing cluster endpoints
   --insecure-discovery             accept insecure SRV records describing cluster endpoints
   --peers value, -C value          DEPRECATED - "--endpoints" should be used instead
   --endpoint value                 DEPRECATED - "--endpoints" should be used instead
   --endpoints value                a comma-delimited list of machine addresses in the cluster (default: "http://127.0.0.1:2379,http://127.0.0.1:4001")
   --cert-file value                identify HTTPS client using this SSL certificate file
   --key-file value                 identify HTTPS client using this SSL key file
   --ca-file value                  verify certificates of HTTPS-enabled servers using this CA bundle
   --username value, -u value       provide username[:password] and prompt if password is not supplied.
   --timeout value                  connection timeout per request (default: 2s)
   --total-timeout value            timeout for the command execution (except watch) (default: 5s)
   --help, -h                       show help
   --version, -v                    print the version
```

####常用指令
```
etcdctl member list  #查看集群成员
```
```
etcdctl member update <memberID> <peerURLs> #更新节点peerURLs
```
```
etcdctl member remove <memberID> #删除节点
```
```
etcdctl member add <name> <peerURL> #新增节点
```
```
etcdctl cluster-health  #查看集群监控状态
```