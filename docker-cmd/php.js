#!/usr/bin/env node
'use strict';
let path = require('path');
let Manager = require('./manager');
class PhpManager extends Manager {
    constructor() {
        super();
        this.cmdCode = "value-php";
    }

    _beforeCreate() {
        let dataPath = path.join(this._getDataPath(), "php", this._getIndex() + "", "apps");
        super._createFolder(dataPath);
        dataPath = path.join(this._getDataPath(), "php", this._getIndex() + "", "conf.d");
        super._createFolder(dataPath);
    }
}
let manager = new PhpManager();
manager.exe();
