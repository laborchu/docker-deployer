#!/bin/bash
#安装nvm
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
source ~/.bashrc
#安装node
. ~/.nvm/nvm.sh
nvm install node
source ~/.bashrc
