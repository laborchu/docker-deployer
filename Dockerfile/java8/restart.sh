#!/bin/sh 
cp /root/apps/fsc-server.jar /root
cp /root/apps/fastdfs.conf /root
java -jar -Dhostname=$HOSTNAME /root/fsc-server.jar