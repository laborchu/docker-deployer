#!/usr/bin/env node
'use strict';
let Manager = require('./manager');
class SmsManager extends Manager {
    constructor() {
        super();
        this.cmdCode = "value-sms";
    }
}
let smsManager = new SmsManager();
smsManager.exe();
