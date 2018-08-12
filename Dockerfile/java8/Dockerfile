FROM value/supervisor

ENV JAVA_HOME /usr/jdk1.8.0_66

# Install Java.
RUN \
  apt-get update && apt-get install -y curl \

  && curl \
  "http://45.116.61.6/file/server-jre-8u66-linux-x64.tar.gz" \
    | gunzip \
    | tar x -C /usr/ \
    && rm -rf $JAVA_HOME/man \

  && apt-get purge -y --auto-remove curl \
  && rm -rf /var/lib/apt/lists/* 

ENV PATH ${PATH}:${JAVA_HOME}/bin

# Define default command.
CMD ["supervisord", "-c", "/etc/supervisor/supervisord.conf"]