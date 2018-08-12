#!/usr/bin/env node
'use strict';
let path = require('path');
let Manager = require('./manager');
class TomcatManager extends Manager {
    constructor() {
        super();
        this.cmdCode = "value-tomcat";
    }

     _beforeCreate() {
        let dataPath = path.join(this._getDataPath(), "tomcat", this._getIndex() + "", "webapps");
        super._createFolder(dataPath);
        dataPath = path.join(this._getDataPath(), "tomcat", this._getIndex() + "", "logs");
        super._createFolder(dataPath);
        dataPath = path.join(this._getDataPath(), "tomcat", this._getIndex() + "", "apps");
        super._createFolder(dataPath);
        dataPath = path.join(this._getDataPath(), "tomcat", this._getIndex() + "", "restart.sh");
        super._copyFile("../Dockerfile/tomcat/restart.sh",dataPath);
    }
}
let tomcatManager = new TomcatManager();
tomcatManager.exe();
