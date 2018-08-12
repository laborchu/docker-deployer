FROM value/supervisor

ENV NGXIN_VERSION 1.11.8

RUN \
  apt-get update && apt-get install -y vim libpcre3 \
  && buildDeps='gcc make zlib1g-dev libpcre3-dev libssl-dev wget openssl' \
  && apt-get install -y $buildDeps \
  && rm -rf /var/lib/apt/lists/* \
  && cd /tmp \
  && wget -O nginx.tar.gz "http://nginx.org/download/nginx-$NGXIN_VERSION.tar.gz" \
  && wget -O nginx-rtmp-module.tar.gz "http://45.116.61.6/file/nginx-rtmp-module-1.1.10.tar.gz" \
  && tar -xzf nginx.tar.gz  \
  && tar -xzf nginx-rtmp-module.tar.gz \
  && cd nginx-1.11.8 \
  && ./configure --add-module=/tmp/nginx-rtmp-module-1.1.10 --with-http_ssl_module && make && make install \
  && cd /root && rm -rf /tmp/* \
  && apt-get purge -y --auto-remove $buildDeps \
  && sed '116 iinclude conf.d/*.conf;' -i /usr/local/nginx/conf/nginx.conf \
  && echo '[program:sms]\ncommand=/usr/local/nginx/sbin/nginx'>> /etc/supervisor/conf.d/sms.conf

# Define working directory.
WORKDIR /usr/local/nginx

EXPOSE 1935
# Define default command.
CMD ["supervisord", "-c", "/etc/supervisor/supervisord.conf"]

