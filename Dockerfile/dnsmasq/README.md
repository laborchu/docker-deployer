##配置

###配置自定义的域名和ip
```
vi /etc/addn-hosts
比如
192.168.2.3 a.server
192.168.2.4 b.server
192.168.2.5 c.server
```

###配置dns的域名服务器
```
vi /etc/resolv.dnsmasq.conf
比如
nameserver 8.8.8.8
nameserver xxx.xxx.xxx.xxx
```