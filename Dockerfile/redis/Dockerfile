FROM value/supervisor

ENV REDIS_VERSION 3.2.0
ENV REDIS_DOWNLOAD_URL http://download.redis.io/releases/redis-3.2.0.tar.gz
ENV REDIS_DOWNLOAD_SHA1 0c1820931094369c8cc19fc1be62f598bc5961ca

RUN buildDeps='gcc libc6-dev make wget' \
  && set -x \
  && apt-get update && apt-get install -y $buildDeps --no-install-recommends \
  && rm -rf /var/lib/apt/lists/* \
  && wget -O redis.tar.gz "$REDIS_DOWNLOAD_URL" \
  && echo "$REDIS_DOWNLOAD_SHA1 *redis.tar.gz" | sha1sum -c - \
  && mkdir -p /usr/src/redis \
  && tar -xzf redis.tar.gz -C /usr/src/redis --strip-components=1 \
  && rm redis.tar.gz \
  && make -C /usr/src/redis \
  && make -C /usr/src/redis install \
  && rm -r /usr/src/redis \
  && mkdir /data \
  && apt-get purge -y --auto-remove $buildDeps \
  && echo '[program:redis]\ncommand=redis-server --protected-mode no'>> /etc/supervisor/conf.d/redis.conf 

# Define working directory.
WORKDIR /root

EXPOSE 6379
# Define default command.
CMD ["supervisord", "-c", "/etc/supervisor/supervisord.conf"]