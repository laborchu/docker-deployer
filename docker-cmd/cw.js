#!/usr/bin/env node
'use strict';
let Manager = require('./manager');
class CwManager extends Manager {
    constructor() {
        super();
        this.cmdCode = "value-cw";
    }
}
let cwManager = new CwManager();
cwManager.exe();
