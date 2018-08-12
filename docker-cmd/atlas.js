#!/usr/bin/env node
'use strict';
let path = require('path');
let Manager = require('./manager');
class AtlasManager extends Manager {
    constructor() {
        super();
        this.cmdCode = "value-atlas";
    }

     _beforeCreate() {
    	let folder = path.join(this._getDataPath(), "atlas", this._getIndex() + "");
        super._createFolder(folder);

        let dataPath = path.join(this._getDataPath(), "atlas", this._getIndex() + "", "test.cnf");
        super._copyFile("../Dockerfile/atlas/test.cnf",dataPath);
    }
}
let atlasManager = new AtlasManager();
atlasManager.exe();
