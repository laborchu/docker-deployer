#!/usr/bin/env node
'use strict';
let path = require('path');
let Manager = require('./manager');
class Java8Manager extends Manager {
    constructor() {
        super();
        this.cmdCode = "value-java8";
    }

    _beforeCreate() {
    	let folder = path.join(this._getDataPath(), "java8", this._getIndex() + "","apps");
        super._createFolder(folder);

        folder = path.join(this._getDataPath(), "java8", this._getIndex() + "", "conf.d");
        super._createFolder(folder);
        
        folder = path.join(this._getDataPath(), "java8", this._getIndex() + "", "logs");
        super._createFolder(folder);
        
        folder = path.join(this._getDataPath(), "java8", this._getIndex() + "", "restart.sh");
        super._copyFile("../Dockerfile/java8/restart.sh",folder);
    }
}
let java8Manager = new Java8Manager();
java8Manager.exe();
