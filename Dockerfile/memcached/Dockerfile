FROM value/supervisor

ENV MEMCACHED_VERSION 1.4.34
ENV MEMCACHED_SHA1 7c7214f5183c6e20c22b243e21ed1ffddb91497e

RUN \

  apt-get update && apt-get install -y --no-install-recommends \
    libevent-2.0-5 vim\
  && rm -rf /var/lib/apt/lists/* \

  && buildDeps='gcc libc6-dev libevent-dev make perl wget' \
  && set -x \
  && apt-get update && apt-get install -y $buildDeps --no-install-recommends \
  && rm -rf /var/lib/apt/lists/* \
  && wget -O memcached.tar.gz "http://memcached.org/files/memcached-$MEMCACHED_VERSION.tar.gz" \
  && echo "$MEMCACHED_SHA1  memcached.tar.gz" | sha1sum -c - \
  && mkdir -p /usr/src/memcached \
  && tar -xzf memcached.tar.gz -C /usr/src/memcached --strip-components=1 \
  && rm memcached.tar.gz \
  && cd /usr/src/memcached \
  && ./configure \
  && make -j$(nproc) \
  && make install \
  && cd / && rm -rf /usr/src/memcached \
  && apt-get purge -y --auto-remove $buildDeps \

  && echo '#!/bin/bash \n \
  port=$(netstat -anp|grep 11211)\n \
  if [ "$port"x = ""x ]; then\n \
    /usr/local/bin/memcached -d -p 11211 -u root #-x 192.168.2.105 -X 11111 -v\n \
  fi'>> /root/start.sh \
  && chmod +x /root/start.sh \

  && echo '[program:memcached]\ncommand=/root/start.sh'>> /etc/supervisor/conf.d/memcached.conf


# Define working directory.
WORKDIR /root

EXPOSE 11211
# Define default command.
CMD ["supervisord", "-c", "/etc/supervisor/supervisord.conf"]

