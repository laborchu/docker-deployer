FROM value/supervisor

ENV NGXIN_VERSION 1.13.4

RUN \
  mv /etc/apt/sources.list /etc/apt/sources.list.bak \
  && echo 'deb http://mirrors.aliyun.com/ubuntu/ trusty main restricted universe multiverse \ndeb http://mirrors.aliyun.com/ubuntu/ trusty-security main restricted universe multiverse \ndeb http://mirrors.aliyun.com/ubuntu/ trusty-updates main restricted universe multiverse \ndeb http://mirrors.aliyun.com/ubuntu/ trusty-proposed main restricted universe multiverse \ndeb http://mirrors.aliyun.com/ubuntu/ trusty-backports main restricted universe multiverse \ndeb-src http://mirrors.aliyun.com/ubuntu/ trusty main restricted universe multiverse \ndeb-src http://mirrors.aliyun.com/ubuntu/ trusty-security main restricted universe multiverse \ndeb-src http://mirrors.aliyun.com/ubuntu/ trusty-updates main restricted universe multiverse \ndeb-src http://mirrors.aliyun.com/ubuntu/ trusty-proposed main restricted universe multiverse \ndeb-src http://mirrors.aliyun.com/ubuntu/ trusty-backports main restricted universe multiverse'>> /etc/apt/sources.list \
  && apt-get update \
  && buildDeps='make gcc libpcre3-dev wget' \
  && apt-get install -y $buildDeps zlib1g-dev libpcre3\
  && wget -O nginx.tar.gz "http://45.116.61.6/file/nginx-$NGXIN_VERSION.tar.gz" \

  && apt-get install -y python-software-properties software-properties-common \
  && LC_ALL=C.UTF-8 add-apt-repository ppa:ondrej/php \
  && apt-get update \
  && apt-get install -y php7.0 php7.0-fpm php7.0-mysql \

  && tar -xzf nginx.tar.gz  \
  && rm nginx.tar.gz \
  && cd nginx-1.13.4 \
  && ./configure && make && make install \
  && rm -rf nginx \

  && apt-get purge -y --auto-remove $buildDeps \
  && sed '3 iuser www-data;' -i /usr/local/nginx/conf/nginx.conf \
  && sed '116 iinclude conf.d/*.conf;' -i /usr/local/nginx/conf/nginx.conf \
  && rm -rf /var/lib/apt/lists/* /root/.nvm/.cache/* \
  && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime 

# Define working directory.
WORKDIR /usr/local/nginx

EXPOSE 80

HEALTHCHECK --timeout=2s --interval=3s \
      CMD netstat -anp|grep 80 || exit 1

# Define default command.
CMD ["supervisord", "-c", "/etc/supervisor/supervisord.conf"]

