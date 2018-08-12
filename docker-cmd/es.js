#!/usr/bin/env node
'use strict';
let Manager = require('./manager');
class EsManager extends Manager {
    constructor() {
        super();
        this.cmdCode = "value-es";
    }
}
let esManager = new EsManager();
esManager.exe();
