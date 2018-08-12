#!/usr/bin/env node
'use strict';
let Manager = require('./manager');
class SupervisorManager extends Manager {
    constructor() {
        super();
        this.cmdCode = "value-supervisor";
    }
}
let superManager = new SupervisorManager();
superManager.exe();
