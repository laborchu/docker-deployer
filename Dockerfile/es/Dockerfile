FROM value/java8

RUN \
  apt-get update && apt-get install -y curl \
  && curl \
  "http://45.116.61.6/file/elasticsearch-5.6.0.tar.gz" \
    | gunzip \
    | tar x -C /usr/ \
  && groupadd es && useradd -g es es  \
  && mv /usr/elasticsearch-5.6.0 /usr/elasticsearch \
  && mkdir /usr/elasticsearch/logs && mkdir /usr/elasticsearch/data \
  && chmod -R 777 /usr/elasticsearch/logs /usr/elasticsearch/data \
  && sed -Ei 's/Xms2g/Xms1g/;s/Xmx2g/Xmx1g/' /usr/elasticsearch/config/jvm.options \
  && chown -R es:es /usr/elasticsearch \
  && rm -rf /var/lib/apt/lists/*  \
  && echo '[program:elasticsearch]\nenvironment=PATH="/usr/elasticsearch/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/jdk1.8.0_66/bin"\nuser=es\ncommand=/usr/elasticsearch/bin/elasticsearch'>> /etc/supervisor/conf.d/elasticsearch.conf

WORKDIR /root

EXPOSE 9200 9300

HEALTHCHECK --timeout=3s --retries=3 \
      CMD curl -f http://localhost:9200 || exit 1

# Define default command.
CMD ["supervisord", "-c", "/etc/supervisor/supervisord.conf"]