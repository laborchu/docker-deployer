FROM value/supervisor

RUN \

  apt-get update \
  && apt-get install -y gcc make curl vim \

  && curl -L https://codeload.github.com/happyfish100/fastdfs/tar.gz/V5.08 -o /tmp/fastdfs-5.08.tar.gz  \
  && curl -L http://45.116.61.6/file/libfastcommon-master.tar.gz -o /tmp/libfastcommon-master.tar.gz  \

  && tar xzvf /tmp/fastdfs-5.08.tar.gz -C /tmp  \
  && tar xzvf /tmp/libfastcommon-master.tar.gz -C /tmp \

  && cd /tmp/libfastcommon-master && ./make.sh && ./make.sh install \
  && cd /tmp/fastdfs-5.08 && ./make.sh && ./make.sh install \

  && mkdir -p /root/fastdfs/tracker && mkdir -p /root/fastdfs/storage \

  && sed 's/\/home\/yuqing\/fastdfs/\/root\/fastdfs\/tracker/' /etc/fdfs/tracker.conf.sample > /etc/fdfs/tracker.conf \
  && sed 's/\/home\/yuqing\/fastdfs/\/root\/fastdfs\/storage/;s/192.168.209.121:22122/fastdfs1:22122/' /etc/fdfs/storage.conf.sample > /etc/fdfs/storage.conf \

  && cp /etc/supervisor/supervisord.conf /etc/supervisor/supervisord-tracker.conf \
  && cp /etc/supervisor/supervisord.conf /etc/supervisor/supervisord-storage.conf \
  && sed -Ei 's/\/etc\/supervisor\/conf.d\/\*.conf/\/etc\/supervisor\/conf.d\/tracker.conf/' /etc/supervisor/supervisord-tracker.conf \
  && sed -Ei 's/\/etc\/supervisor\/conf.d\/\*.conf/\/etc\/supervisor\/conf.d\/storage.conf/' /etc/supervisor/supervisord-storage.conf \

  && echo '[program:tracker]\ncommand=/root/startTracker.sh'>> /etc/supervisor/conf.d/tracker.conf \
  && echo '[program:storage]\ncommand=/root/startStorage.sh'>> /etc/supervisor/conf.d/storage.conf \

  && echo '#!/bin/bash \n \
  port=$(netstat -anp|grep 22122)\n \
  if [ "$port"x = ""x ]; then\n \
    /usr/bin/fdfs_trackerd /etc/fdfs/tracker.conf restart\n \
  fi'>> /root/startTracker.sh \

  && echo '#!/bin/bash \n \
  port=$(netstat -anp|grep 23000)\n \
  if [ "$port"x = ""x ]; then\n \
    /usr/bin/fdfs_storaged /etc/fdfs/storage.conf restart\n \
  fi'>> /root/startStorage.sh \
  && chmod +x /root/startStorage.sh /root/startTracker.sh \

  && rm -rf /var/lib/apt/lists/* \
  && rm /tmp/fastdfs-5.08.tar.gz /tmp/libfastcommon-master.tar.gz \
  && rm -R /tmp/fastdfs-5.08 /tmp/libfastcommon-master \
  && apt-get purge -y --auto-remove gcc make curl 


# Define working directory.
WORKDIR /root

EXPOSE 22122 23000
# Define default command.
ENTRYPOINT ["supervisord", "-c", "/etc/supervisor/supervisord.conf"]

