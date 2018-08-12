FROM ubuntu:16.04

# Install Supervisor.
RUN \
  mv /etc/apt/sources.list /etc/apt/sources.list.bak && \
  echo 'deb-src http://archive.ubuntu.com/ubuntu xenial main restricted #Added by software-properties \ndeb http://mirrors.aliyun.com/ubuntu/ xenial main restricted \ndeb-src http://mirrors.aliyun.com/ubuntu/ xenial main restricted multiverse universe #Added by software-properties \ndeb http://mirrors.aliyun.com/ubuntu/ xenial-updates main restricted \ndeb-src http://mirrors.aliyun.com/ubuntu/ xenial-updates main restricted multiverse universe #Added by software-properties \ndeb http://mirrors.aliyun.com/ubuntu/ xenial universe \ndeb http://mirrors.aliyun.com/ubuntu/ xenial-updates universe \ndeb http://mirrors.aliyun.com/ubuntu/ xenial multiverse \ndeb http://mirrors.aliyun.com/ubuntu/ xenial-updates multiverse \ndeb http://mirrors.aliyun.com/ubuntu/ xenial-backports main restricted universe multiverse \ndeb-src http://mirrors.aliyun.com/ubuntu/ xenial-backports main restricted universe multiverse #Added by software-properties \ndeb http://archive.canonical.com/ubuntu xenial partner \ndeb-src http://archive.canonical.com/ubuntu xenial partner \ndeb http://mirrors.aliyun.com/ubuntu/ xenial-security main restricted \ndeb-src http://mirrors.aliyun.com/ubuntu/ xenial-security main restricted multiverse universe #Added by software-properties \ndeb http://mirrors.aliyun.com/ubuntu/ xenial-security universe \ndeb http://mirrors.aliyun.com/ubuntu/ xenial-security multiverse'>> /etc/apt/sources.list && \
  apt-get update && \
  apt-get install -y supervisor tzdata && \
  rm -rf /var/lib/apt/lists/* && \
  cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
  sed -i 's/^\(\[supervisord\]\)$/\1\nnodaemon=true/' /etc/supervisor/supervisord.conf

# Define working directory.
WORKDIR /etc/supervisor/conf.d

# Define default command.
CMD ["supervisord", "-c", "/etc/supervisor/supervisord.conf"]