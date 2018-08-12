FROM ubuntu:16.04

RUN \
  mv /etc/apt/sources.list /etc/apt/sources.list.bak \
  &&  echo 'deb http://mirrors.aliyun.com/ubuntu/ trusty main restricted universe multiverse \ndeb http://mirrors.aliyun.com/ubuntu/ trusty-security main restricted universe multiverse \ndeb http://mirrors.aliyun.com/ubuntu/ trusty-updates main restricted universe multiverse \ndeb http://mirrors.aliyun.com/ubuntu/ trusty-proposed main restricted universe multiverse \ndeb http://mirrors.aliyun.com/ubuntu/ trusty-backports main restricted universe multiverse \ndeb-src http://mirrors.aliyun.com/ubuntu/ trusty main restricted universe multiverse \ndeb-src http://mirrors.aliyun.com/ubuntu/ trusty-security main restricted universe multiverse \ndeb-src http://mirrors.aliyun.com/ubuntu/ trusty-updates main restricted universe multiverse \ndeb-src http://mirrors.aliyun.com/ubuntu/ trusty-proposed main restricted universe multiverse \ndeb-src http://mirrors.aliyun.com/ubuntu/ trusty-backports main restricted universe multiverse'>> /etc/apt/sources.list \
  &&  apt-get update && apt-get install -y wget mysql-client \
  && wget http://45.116.61.6/file/Atlas-2.2-debian7.0-x86_64.deb \
  && dpkg -i Atlas-2.2-debian7.0-x86_64.deb\
  && apt-get purge -y --auto-remove wget \
  && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
  && rm Atlas-2.2-debian7.0-x86_64.deb && rm -rf /var/lib/apt/lists/* 

WORKDIR /root

EXPOSE 1234 2345
HEALTHCHECK --timeout=2s --interval=3s \
      CMD netstat -anp|grep 1234 || exit 1

# Define default command.
CMD /usr/local/mysql-proxy/bin/mysql-proxyd test start && tail -f /usr/local/mysql-proxy/log/test.log
