#!/usr/bin/env node
'use strict';
let path = require('path');
let Manager = require('./manager');
class NodejsManager extends Manager {
    constructor() {
        super();
        this.cmdCode = "value-nodejs";
    }

    _beforeCreate() {
        let dataPath = path.join(this._getDataPath(), "nodejs", this._getIndex() + "", "apps");
        super._createFolder(dataPath);
        dataPath = path.join(this._getDataPath(), "nodejs", this._getIndex() + "", "conf.d");
        super._createFolder(dataPath);
    }
}
let nodeManager = new NodejsManager();
nodeManager.exe();
