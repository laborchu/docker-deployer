FROM value/java8

ENV METAQ_HOME /usr/metaq

# Install Java.
RUN \
  apt-get update && apt-get install -y curl \

  && curl \
  "http://45.116.61.6/file/metaq-server-1.4.6.2.tar.gz" \
    | gunzip \
    | tar x -C /usr/ \
  && mv /usr/taobao/metamorphosis-server-wrapper /usr/metaq \

  && sed -Ei 's/localhost/zookeeper1/' /usr/metaq/conf/server.ini \

  && apt-get purge -y --auto-remove curl \
  && rm -rf /var/lib/apt/lists/*  \
  && echo '[program:metaq]\ncommand=metaServer.sh start local'>> /etc/supervisor/conf.d/metaq.conf

WORKDIR /root

ENV PATH ${PATH}:${METAQ_HOME}/bin

# Define default command.
CMD ["supervisord", "-c", "/etc/supervisor/supervisord.conf"]