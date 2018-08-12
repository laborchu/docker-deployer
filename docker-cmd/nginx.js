#!/usr/bin/env node
'use strict';
let path = require('path');
let Manager = require('./manager');
class NginxManager extends Manager {
    constructor() {
        super();
        this.cmdCode = "value-nginx";
    }

     _beforeCreate() {
        let dataPath = path.join(this._getDataPath(), "nginx", this._getIndex() + "", "conf.d");
        super._createFolder(dataPath);
    }
}
let nginxManager = new NginxManager();
nginxManager.exe();
