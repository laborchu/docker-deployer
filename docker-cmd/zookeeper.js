#!/usr/bin/env node
'use strict';
let Manager = require('./manager');
class ZkManager extends Manager {
    constructor() {
        super();
        this.cmdCode = "value-zookeeper";
    }
}
let zkManager = new ZkManager();
zkManager.exe();
