FROM value/java8

ARG MIRROR=http://apache.mirrors.pair.com
ARG VERSION=3.4.11

# Install Supervisor.
RUN \
  apt-get update && apt-get install -y wget \
  && rm -rf /var/lib/apt/lists/* \
  && wget -q -O - $MIRROR/zookeeper/zookeeper-$VERSION/zookeeper-$VERSION.tar.gz | tar -xzf - -C /root \
  && apt-get purge -y --auto-remove wget \
  && mv /root/zookeeper-$VERSION /root/zookeeper \
  && cp /root/zookeeper/conf/zoo_sample.cfg /root/zookeeper/conf/zoo.cfg \
  && echo '[program:zookeeper]\ncommand=/root/zookeeper/bin/zkServer.sh start'>> /etc/supervisor/conf.d/zookeeper.conf

EXPOSE 2181 2888 3888
WORKDIR /root

# Define default command.
CMD ["supervisord", "-c", "/etc/supervisor/supervisord.conf"]

