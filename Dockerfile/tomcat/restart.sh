#!/bin/sh 
export CATALINA_OPTS="-Dhostname=$HOSTNAME -Duser.timezone=GMT+08"
rm -R /usr/tomcat/webapps/*
tar -zxvf /root/apps/eduos.tar.gz -C /usr/tomcat/webapps/
/usr/tomcat/bin/catalina.sh run