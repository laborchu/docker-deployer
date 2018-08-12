##安装步骤
###下载文件
```
wget https://github.com/happyfish100/libfastcommon/archive/V1.0.7.tar.gz -O libfastcommon-1.0.7.tar.gz 
wget https://codeload.github.com/happyfish100/fastdfs/tar.gz/V5.08 -O fastdfs-5.08.tar.gz
```

###安装libfastcommon
```
tar -zxvf libfastcommon-1.0.7.tar.gz 
cd libfastcommon-1.0.7
./make.sh
./make.sh install
```

###安装lfastdfs
```
tar -zxvf fastdfs-5.08.tar.gz
cd fastdfs-5.08
./make.sh
./make.sh install
```

##tracker说明配置说明

-disable
```
#func：配置是否生效
#valu：true、false
disable=false
```

bind_addr
```
#func：绑定IP
#valu：IP地址
bind_addr=192.168.6.102
```

port
```
#func：服务端口
#valu：端口整数值
port=22122
```

connect_timeout
```
#func：连接超时
#valu：秒单位正整数值
connect_timeout=30
```

network_timeout
```
#func：网络超时
#valu：秒单位正整数值
network_timeout=60
```

base_path
```
#func：Tracker数据/日志目录地址
#valu：路径
base_path=/home/michael/fdfs/base4tracker
```

max_connections
```
#func：最大连接数
#valu：正整数值
max_connections=256
```

work_threads
```
#func：线程数，通常设置CPU数
#valu：正整数值
work_threads=4
```

store_lookup
```
#func：上传文件的选组方式。
#valu：0、1或2。
# 0：表示轮询
# 1：表示指定组
# 2：表示存储负载均衡（选择剩余空间最大的组）
store_lookup=2
```

store_group
```
#func：指定上传的组，如果在应用层指定了具体的组，那么这个参数将不会起效。另外如果store_lookup如果是0或2，则此参数无效。
#valu：group1等
store_group=group1
```

store_server
```
#func：上传服务器的选择方式。(一个文件被上传后，这个storage server就相当于这个文件的storage server源，会对同组的storage server推送这个文件达到同步效果)
#valu：0、1或2
# 0: 轮询方式（默认）
# 1: 根据ip 地址进行排序选择第一个服务器（IP地址最小者）
# 2: 根据优先级进行排序（上传优先级由storage server来设置，参数名为upload_priority），优先级值越小优先级越高。
store_server=0
```

store_path
```
#func：上传路径的选择方式。storage server可以有多个存放文件的base path（可以理解为多个磁盘）。
#valu：
# 0: 轮流方式，多个目录依次存放文件
# 2: 存储负载均衡。选择剩余空间最大的目录存放文件（注意：剩余磁盘空间是动态的，因此存储到的目录或磁盘可能也是变化的）
store_path=0
```

download_server
```
#func：下载服务器的选择方式。
#valu：
# 0：轮询（默认）
# 1：IP最小者
# 2：优先级排序（值最小的，优先级最高。）
download_server=0
```

reserved_storage_space
```
#func：保留空间值。如果某个组中的某个服务器的剩余自由空间小于设定值，则文件不会被上传到这个组。
#valu：
# G or g for gigabyte
# M or m for megabyte
# K or k for kilobyte
reserved_storage_space=1GB
```

log_level
```
#func：日志级别
#valu：
# emerg for emergency
# alert
# crit for critical
# error
# warn for warning
# notice
# info for information
# debug for debugging
log_level=info
```

run_by_group / run_by_user
```
#func：指定运行该程序的用户组
#valu：用户组名或空
```

run_by_group=
```
#func：
#valu：
run_by_user=
```

allow_hosts
```
#func：可以连接到tracker server的ip范围。可设定多个值。
#valu
allow_hosts=
```

check_active_interval
```
#func：检测 storage server 存活的时间隔，单位为秒。
#      storage server定期向tracker server 发心跳，
#      如果tracker server在一个check_active_interval内还没有收到storage server的一次心跳，
#      那边将认为该storage server已经下线。所以本参数值必须大于storage server配置的心跳时间间隔。
#      通常配置为storage server心跳时间间隔的2倍或3倍。
check_active_interval=120
```

thread_stack_size
```
#func：设定线程栈的大小。 线程栈越大，一个线程占用的系统资源就越多。
#      如果要启动更多的线程（V1.x对应的参数为max_connections，V2.0为work_threads），可以适当降低本参数值。
#valu：如64KB，默认值为64，tracker server线程栈不应小于64KB
thread_stack_size=64KB
```

storage_ip_changed_auto_adjust
```
#func：这个参数控制当storage server IP地址改变时，集群是否自动调整。注：只有在storage server进程重启时才完成自动调整。
#valu：true或false
storage_ip_changed_auto_adjust=true
```


storage_sync_file_max_delay
```
#func：同组storage服务器之间同步的最大延迟时间。存储服务器之间同步文件的最大延迟时间，根据实际情况进行调整
#valu：秒为单位，默认值为1天（24*3600）
#sinc：v2.0
storage_sync_file_max_delay=86400
```

storage_sync_file_max_time
```
#func：存储服务器同步一个文件需要消耗的最大时间，缺省为300s，即5分钟。
#sinc：v2.0
storage_sync_file_max_time=300
```

sync_log_buff_interval
```
#func：同步或刷新日志信息到硬盘的时间间隔。注意：tracker server 的日志不是时时写硬盘的，而是先写内存。
#valu：以秒为单位
sync_log_buff_interval=10
```

use_trunk_file
```
#func：是否使用trunk文件来存储几个小文件
#valu：true或false
#sinc：v3.0
use_trunk_file=false
```

slot_min_size
```
#func：最小slot大小
#valu：<= 4KB，默认为256字节
#sinc：v3.0
slot_min_size=256
```

slot_max_size
```
#func：最大slot大小
#valu：>= slot_min_size，当小于这个值的时候就存储到trunk file中。默认为16MB。
#sinc：v3.0
slot_max_size=16MB
```

trunk_file_size
```
#func：trunk file的size
#valu：>= 4MB，默认为64MB
#sinc：v3.0
trunk_file_size=64MB
```

##storage说明配置说明

disabled
```
#func：该配置文件是否生效
#valu：
## true：无效
## false：生效
disabled=false
```

group_name
```
#func；本storage server所属组名
group_name=group1
```

bind_addr
```
#func：绑定本storage server的IP
bind_addr=
```

client_bind
```
#func：bind_addr是针对server的，当指定bind_addr时，本参数才有效。
#valu：
## true：绑定bind_addr所指定的IP
## false：绑定本机的任意IP
client_bind=true
```

port
```
#func：storage server端口
port=23000
```

connect_timeout
```
#func：连接超时
connect_timeout=30
```

network_timeout
```
#func：网络超时
network_timeout=60
```

heart_beat_interval
```
#func：本storage向tracker发送心跳时间间隔
heart_beat_interval=30
```

stat_report_interval
```
#func：硬盘存储空间使用情况检测时间间隔
stat_report_interval=60
```

base_path
```
#func：base_path
base_path=/home/michael/fdfs/base4storage
```

max_connections
```
#func：本storage server支持的最大并发连接数
max_connections=256
```

buff_size
```
#func：buff size to recv/send data
buff_size=256KB
```

work_thread
```
#func：work thread count, should <= max_connections
#valu：默认为4
#sinc：v2.0
work_thread=4
```

store_path_count / store_path
```
#func：storage path的个数
#valu：默认为1
store_path_count=1

#func：根据store_path_count的值，如果是N个，就要有store_path0, store_path1 ... store_path(N-1)
#valu：
store_path0=/home/michael/fdfs/storage0
```

subdir_count_per_path
```
#func：FastDFS存储文件时，默认采用了两级目录。这里配置存放文件的目录个数
subdir_count_per_path=32
```

tracker_server
```
#func：tracker_server 的列表 要写端口号
tracker_server=192.168.6.188:22122
tracker_server=192.168.6.189:22122
tracker_server=192.168.6.190:22122
```

log_level
```
#func：
log_level=info
```

run_by_group
```
#func：
run_by_group
```

run_by_user
```
#func
run_by_user
```

allow_hosts
```
#func：允许连接的客户端IP列表
allow_hosts=*
```

file_distribute_path_mode
```
#func：文件分布到data path的方式
#valu：
## 0：轮询
## 1：随机，根据哈希code
file_distribute_path_mode=0
```

file_distribute_rotate_count
```
#func：当file_distribute_path_mode设置为0（轮询）时，该值才有效。功能是，当写文件计数打到该值时，转至下一个path。
file_distribute_rotate_count=100
```

thread_stack_size
```
#func：线程栈大小
#valu：要求至少512KB
thread_stack_size=512KB
```

upload_priority
```
#func：上传优先级。只有tracker.conf中store_server=2时，才有效。
#valu：值约小，优先级越高。默认为10.
upload_priority=10
```

if_alias_prefix
```
#func：
#valu：
if_alias_prefix=
```

check_file_duplicate
```
#func：是否检查file重复。但为1时，使用FastDHT存储文件索引
#valu：默认为0
## 1, yes, true or on：check
## 0, no, false or off：不check
check_file_duplicate=0
```

key_namespace
```
#func：当上个参数设定为1或yes时(true/on也是可以的)，在FastDHT中的命名空间
key_namespace=FastDFS
```

keep_alive
```
#func：与FastDHT的连接方式
#valu：默认为0，短连接
## 0：短连接（short connection）
## 1：长连接（persistent connection）
keep_alive=0
```


disk_rw_separated
```
#func：是否I/O分离
#valu：默认为true
## true：分离
## false：不分离
disk_rw_separated=true
```

disk_rw_direct
```
#func：是否直接写，不使用cache
#value：
## true：直接写
## false：不直接写
disk_rw_direct=false
```

disk_reader_threads
```
#func：每个storage base path的读线程数。对于disk_rw_separated=true的方式该值为0.
#valu：默认为1
disk_reader_threads=1
```

disk_writer_threads
```
#func：每个storage base path的写线程数。对于disk_rw_separated=true的方式该值为0.
#valu：默认为1
disk_writer_threads=1
```

sync_wait_msec
```
#func：同步文件时，如果从binlog中没有读到要同步的文件，休眠N毫秒后重新读取。
#valu：单位为毫秒。0表示不休眠，立即再次尝试读取。
sync_wait_msec=50
```

sync_interval
```
#func：同步一个文件后，在下次进行同步前的休息时间
#valu：单位为毫秒
sync_interval=0
```

sync_start_time
```
#func：每天存储同步的开始时间。
#valu：HH:mm
sync_start_time=00:00
```

sync_end_time
```
#func：每天存储同步的结束时间。
#valu：HH:mm
sync_end_time=23:59
```

write_mark_file_freq
```
#func：把storage的mark文件定期同步到磁盘的时间间隔
#valu：单位为秒
write_mark_file_freq=500
```

fsync_after_written_bytes
```
#func：当写大文件时，每写入N个字节，调用一次系统函数fsync将内容强行同步到硬盘。
#valu：0表示从不调用fsync
fsync_after_written_bytes=0
```

sync_log_buff_interval
```
#func：同步或刷新日志信息到硬盘的时间间隔
#valu：单位为秒
sync_log_buff_interval=10
```

sync_binlog_buff_interval
```
#func：同步binlog（更新操作日志）到硬盘的时间间隔
#valu：单位为秒
sync_binlog_buff_interval=60
```

sync_stat_file_interval
```
#func：把storage的stat文件同步到磁盘的时间间隔
#valu：单位为秒
sync_stat_file_interval=300
```