FROM value/supervisor

# Install Etcd.
RUN \
  apt-get update && \
  apt-get install -y curl && \
  

  ETCD_VER=v3.1.0-rc.1 && \
  DOWNLOAD_URL=http://45.116.61.6/file && \
  curl -L ${DOWNLOAD_URL}/etcd-${ETCD_VER}-linux-amd64.tar.gz -o /tmp/etcd-${ETCD_VER}-linux-amd64.tar.gz && \
  mkdir -p /root/.etcd && mkdir -p /root/etcd && \
  tar xzvf /tmp/etcd-${ETCD_VER}-linux-amd64.tar.gz -C /root/etcd --strip-components=1 && \
  echo '[program:etcd]\ncommand=/root/.etcd/startEtcd.sh'>> /etc/supervisor/conf.d/etcd.conf  && \

  rm -rf /var/lib/apt/lists/* && \
  rm /tmp/etcd-${ETCD_VER}-linux-amd64.tar.gz && \
  apt-get purge -y --auto-remove curl


# Define working directory.
WORKDIR /root

EXPOSE 2379
# Define default command.
CMD ["supervisord", "-c", "/etc/supervisor/supervisord.conf"]