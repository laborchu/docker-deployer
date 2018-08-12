#!/usr/bin/env node

'use strict';
let path = require('path');
let Manager = require('./manager');

class MysqlManager extends Manager {
    constructor() {
        super();
        this.cmdCode = "value-mysql";
    }
    _beforeCreate() {
        let dataPath = path.join(this._getDataPath(), "mysql", this._getIndex() + "", "data");
        super._createFolder(dataPath);

        let mysqldPath = path.join(this._getDataPath(), "mysql", this._getIndex() + "", "mysqld.cnf");
        super._copyFile("../Dockerfile/mysql/conf.d/mysqld.cnf",mysqldPath);

        let mysqlPath = path.join(this._getDataPath(), "mysql", this._getIndex() + "", "mysql.cnf");
        super._copyFile("../Dockerfile/mysql/conf.d/mysql.cnf",mysqlPath);
    }
}
let mysqlManager = new MysqlManager();
mysqlManager.exe();
