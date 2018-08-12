#!/usr/bin/env node

'use strict';
let path = require('path');
let Manager = require('./manager');
class RocketmqManager extends Manager {
    constructor() {
        super();
        this.cmdCode = "value-rocketmq";
    }

    _beforeCreate() {
        let argv = super._getArgv();
        let folder = path.join(this._getDataPath(), "rocketmq", argv.prefix, this._getIndex() + "", "store");
        super._createFolder(folder);

        folder = path.join(this._getDataPath(), "rocketmq", argv.prefix, this._getIndex() + "", "store", "commitlog");
        super._createFolder(folder);
        folder = path.join(this._getDataPath(), "rocketmq", argv.prefix, this._getIndex() + "", "store", "consumequeue");
        super._createFolder(folder);
        folder = path.join(this._getDataPath(), "rocketmq", argv.prefix, this._getIndex() + "", "store", "index");
        super._createFolder(folder);
        folder = path.join(this._getDataPath(), "rocketmq", argv.prefix, this._getIndex() + "", "store", "checkpoint");
        super._createFolder(folder);
        folder = path.join(this._getDataPath(), "rocketmq", argv.prefix, this._getIndex() + "", "store", "abort");
        super._createFolder(folder);

        folder = path.join(this._getDataPath(), "rocketmq", argv.prefix, this._getIndex() + "", "conf");
        super._createFolder(folder);
        folder = path.join(this._getDataPath(), "rocketmq", argv.prefix, this._getIndex() + "", "conf","broker.conf");

        super._copyFile("../Dockerfile/rocketmq/broker.conf", folder);
    }
}
let manager = new RocketmqManager();
manager.exe();
