FROM value/supervisor

RUN \
  echo "mysql-server mysql-server/root_password password root" | debconf-set-selections \
  && echo "mysql-server mysql-server/root_password_again password root" | debconf-set-selections \
  && apt-get update && apt-get install -y mysql-server && rm -rf /var/lib/apt/lists/* &&\
  mkdir -p /var/lib/mysql && \
  mkdir -p /var/run/mysqld && \
  mkdir -p /var/log/mysql && \
  chown -R mysql:mysql /var/lib/mysql && \
  chown -R mysql:mysql /var/run/mysqld && \
  chown -R mysql:mysql /var/log/mysql \
  && sed -Ei 's/^(bind-address|log)/#&/' /etc/mysql/mysql.conf.d/mysqld.cnf \
  && echo '[mysqld]\nskip-host-cache\nskip-name-resolve' > /etc/mysql/conf.d/docker.cnf && \
  echo '[program:mysql]\ncommand=/etc/init.d/mysql start'>> /etc/supervisor/conf.d/mysql.conf


# Define working directory.
WORKDIR /root

EXPOSE 3306

HEALTHCHECK CMD netstat -anp|grep 3306 || exit 1

# Define default command.
CMD ["supervisord", "-c", "/etc/supervisor/supervisord.conf"]

