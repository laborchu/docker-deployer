#!/bin/bash
curl -sSL http://acs-public-mirror.oss-cn-hangzhou.aliyuncs.com/docker-engine/internet | sh -
echo "DOCKER_OPTS=\"\$DOCKER_OPTS --registry-mirror=https://grmyh4r3.mirror.aliyuncs.com\"" | sudo tee -a /etc/default/docker
sudo gpasswd -a ${USER} docker
sudo service docker restart
