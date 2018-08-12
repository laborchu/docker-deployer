#!/usr/bin/env node
'use strict';
let Manager = require('./manager');
class MemManager extends Manager {
    constructor() {
        super();
        this.cmdCode = "value-memcached";
    }
}
let memManager = new MemManager();
memManager.exe();
