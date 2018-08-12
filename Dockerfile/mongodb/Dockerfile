FROM value/supervisor

ENV MONGODB_HOME /usr/mongodb

RUN \
  apt-get update && apt-get install -y curl \
  && curl \
  "http://45.116.61.6/file/mongodb-linux-x86_64-ubuntu1404-3.4.2.tar.gz" \
    | gunzip \
    | tar x -C /usr/ \
  && mv /usr/mongodb-linux-x86_64-ubuntu1404-3.4.2 /usr/mongodb \
  && mkdir /root/data /root/log \
  && apt-get purge -y --auto-remove curl \
  && rm -rf /var/lib/apt/lists/* \
  && echo '[program:mongodb]\ncommand=/usr/mongodb/bin/mongod --smallfiles --bind_ip=0.0.0.0 --dbpath /root/data --logpath /root/log/mongodb.log'>> /etc/supervisor/conf.d/mongod.conf

# Define working directory.
WORKDIR /root

ENV PATH ${PATH}:${MONGODB_HOME}/bin

EXPOSE 27017
# Define default command.
CMD ["supervisord", "-c", "/etc/supervisor/supervisord.conf"]

