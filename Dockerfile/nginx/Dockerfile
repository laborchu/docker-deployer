FROM ubuntu:16.04

ENV NGXIN_VERSION 1.13.4

RUN \
  mv /etc/apt/sources.list /etc/apt/sources.list.bak \
  && echo 'deb http://mirrors.aliyun.com/ubuntu/ trusty main restricted universe multiverse \ndeb http://mirrors.aliyun.com/ubuntu/ trusty-security main restricted universe multiverse \ndeb http://mirrors.aliyun.com/ubuntu/ trusty-updates main restricted universe multiverse \ndeb http://mirrors.aliyun.com/ubuntu/ trusty-proposed main restricted universe multiverse \ndeb http://mirrors.aliyun.com/ubuntu/ trusty-backports main restricted universe multiverse \ndeb-src http://mirrors.aliyun.com/ubuntu/ trusty main restricted universe multiverse \ndeb-src http://mirrors.aliyun.com/ubuntu/ trusty-security main restricted universe multiverse \ndeb-src http://mirrors.aliyun.com/ubuntu/ trusty-updates main restricted universe multiverse \ndeb-src http://mirrors.aliyun.com/ubuntu/ trusty-proposed main restricted universe multiverse \ndeb-src http://mirrors.aliyun.com/ubuntu/ trusty-backports main restricted universe multiverse'>> /etc/apt/sources.list \
  && apt-get update && apt-get install -y zlib1g-dev libpcre3 \
  && buildDeps='make gcc libpcre3-dev wget' \
  && apt-get install -y $buildDeps \
  && rm -rf /var/lib/apt/lists/* \
  && wget -O nginx.tar.gz "http://nginx.org/download/nginx-$NGXIN_VERSION.tar.gz" \
  && tar -xzf nginx.tar.gz  \
  && rm nginx.tar.gz \
  && cd nginx-$NGXIN_VERSION \
  && ./configure && make && make install \
  && rm -rf nginx \
  && apt-get purge -y --auto-remove $buildDeps \
  && sed '116 iinclude conf.d/*.conf;' -i /usr/local/nginx/conf/nginx.conf \
  && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime 

# Define working directory.
WORKDIR /usr/local/nginx

EXPOSE 80

HEALTHCHECK --timeout=2s --interval=3s \
      CMD netstat -anp|grep 80 || exit 1

# Define default command.
CMD ["/usr/local/nginx/sbin/nginx", "-g", "daemon off;"]

