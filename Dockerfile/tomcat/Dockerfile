FROM value/java8

RUN \
  apt-get update && apt-get install -y wget curl \
  && rm -rf /var/lib/apt/lists/* \
  && wget -q -O - http://download.openpkg.org/components/cache/tomcat/apache-tomcat-8.5.11.tar.gz | tar -xzf - -C /usr \
  && mv /usr/apache-tomcat-8.5.11 /usr/tomcat \
  && apt-get purge -y --auto-remove wget \
  && echo '[program:tomcat]\ncommand=/root/restart.sh'>> /etc/supervisor/conf.d/tomcat.conf

WORKDIR /root

EXPOSE 8080

# Define default command.
CMD ["supervisord", "-c", "/etc/supervisor/supervisord.conf"]

