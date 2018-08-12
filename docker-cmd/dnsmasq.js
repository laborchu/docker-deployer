#!/usr/bin/env node
'use strict';
let Manager = require('./manager');
class DnsManager extends Manager {
    constructor() {
        super();
        this.cmdCode = "value-dnsmasq";
    }
}
let dnsManager = new DnsManager();
dnsManager.exe();
