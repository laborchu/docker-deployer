FROM value/supervisor

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN \
  apt-get update && apt-get install -y wget \
  && wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash \
  && export NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node \
  && source /root/.nvm/nvm.sh \
  && nvm install 8.2.1 \

  && apt-get purge -y --auto-remove wget \
  && rm -rf /var/lib/apt/lists/* /root/.nvm/.cache/*

WORKDIR /root

EXPOSE 3000

# Define default command.
CMD ["supervisord", "-c", "/etc/supervisor/supervisord.conf"]