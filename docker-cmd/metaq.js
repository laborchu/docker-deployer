#!/usr/bin/env node
'use strict';
let path = require('path');
let Manager = require('./manager');
class MetaqManager extends Manager {
    constructor() {
        super();
        this.cmdCode = "value-metaq";
    }

    _beforeCreate() {
    	let folder = path.join(this._getDataPath(), "metaq", this._getIndex() + "");
        super._createFolder(folder);

        let dataPath = path.join(this._getDataPath(), "metaq", this._getIndex() + "", "server.ini");
        super._copyFile("../Dockerfile/metaq/server.ini",dataPath);
    }
}
let metaqManager = new MetaqManager();
metaqManager.exe();
