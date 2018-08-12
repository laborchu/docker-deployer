#!/usr/bin/env node
'use strict';
let Manager = require('./manager');
class FastdfsManager extends Manager {
    constructor() {
        super();
        this.cmdCode = "value-fastdfs";
    }
    _beforeCreate() {
        let cmd = this._getCmd();
        if(cmd){
            if (cmd !== "t"&&cmd !== "s") {
                console.log(`cmd(${cmd}) should in [t|s]`);
                process.exit(1);
            }
            if(cmd === "t"){
                return {cmd:"/etc/supervisor/supervisord-tracker.conf"};
            }else {
                return {cmd:"/etc/supervisor/supervisord-storage.conf"};
            }
        }
        return {cmd:"/etc/supervisor/supervisord.conf"};
    }
}
let fastdfsManager = new FastdfsManager();
fastdfsManager.exe();
