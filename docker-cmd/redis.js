#!/usr/bin/env node
'use strict';
let Manager = require('./manager');
class RedisManager extends Manager {
    constructor() {
        super();
        this.cmdCode = "value-redis";
    }
}
let redisManager = new RedisManager();
redisManager.exe();
