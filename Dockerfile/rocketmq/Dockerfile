FROM value/java8

RUN \
  apt-get update && apt-get install -y curl \
  &&  mkdir /usr/apache-rocketmq && curl \
  "http://45.116.61.6/file/apache-rocketmq.tar.gz " \
    | gunzip \
    | tar x -C /usr/apache-rocketmq \

  && sed -Ei 's/-Xms8g -Xmx8g -Xmn4g/-Xms1g -Xmx1g -Xmn512m/' /usr/apache-rocketmq/bin/runbroker.sh \
  && sed -Ei 's/-Xms4g -Xmx4g -Xmn2g/-Xms1g -Xmx1g -Xmn512m/' /usr/apache-rocketmq/bin/runserver.sh \
  && rm -rf /var/lib/apt/lists/*  \
  && echo '[program:rocketmq]\nenvironment=PATH="/usr/apache-rocketmq/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/jdk1.8.0_66/bin"\ncommand=mqnamesrv & mqbroker -c /root/rocketmq/conf/broker.conf'>> /etc/supervisor/conf.d/rocketmq.conf

WORKDIR /root

EXPOSE 9876 10911

# Define default command.
CMD ["supervisord", "-c", "/etc/supervisor/supervisord.conf"]