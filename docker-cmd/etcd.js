#!/usr/bin/env node

'use strict';

let Manager = require('./manager');
let fs = require('fs');
let path = require('path');

class EtcdManager extends Manager {
    constructor() {
        super();
        this.cmdCode = "value-etcd";
    }

    _beforeCreate() {
        let folder = path.join(this._getDataPath(), "etcd", this._getIndex() + "");
        super._createFolder(folder);
        let ip = this.cmdCode.replace("value-","");
        let dockerId = this._getDockerId();
        let dockerIp = this._getDockerIp();
        let startEtcd = `#!/bin/bash
#/root/etcd/etcd -name ${dockerIp}-${dockerId} -data-dir /root/.etcd/data -initial-advertise-peer-urls http://${ip}:2380 \\
  -listen-peer-urls http://${ip}:2380 \\
  -listen-client-urls http://${ip}:2379,http://127.0.0.1:2379 \\
  -advertise-client-urls http://${ip}:2379 \\
  -initial-cluster-token my-etcd-cluster \\
  -initial-cluster ${dockerIp}-${dockerId}=http://${ip}:2380 \\
  -initial-cluster-state new`;
        let startEtcdPath = path.join(this._getDataPath(), "etcd", this._getIndex() + "", "startEtcd.sh");
        if (!fs.existsSync(startEtcdPath)) {
            fs.writeFileSync(startEtcdPath, startEtcd, { mode: '777' });
        }
    }
}
let etcdManager = new EtcdManager();
etcdManager.exe();
