#!/usr/bin/env node
'use strict';
let Manager = require('./manager');
class MongodbManager extends Manager {
    constructor() {
        super();
        this.cmdCode = "value-mongodb";
    }
}
let mongodbManager = new MongodbManager();
mongodbManager.exe();
