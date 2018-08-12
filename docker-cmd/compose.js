#!/usr/bin/env node

'use strict';
let Manager = require('./manager');
let _ = require('lodash');
let fs = require('fs');
let mkdirp = require('mkdirp');

class ComposeManager extends Manager {
    constructor() {
        super();
    }
    compose() {
        let composeConfig = super._getCompose();
        let argv = super._getArgv();
        let projectName = argv.name;
        if (!composeConfig) {
            console.log(`package.json->compse未找到${argv.name}的配置`);
            process.exit(1);
        }
        let dns = super._getDns();
        let cmdConfig = super._getCmdConfig();
        let buildData = [];
        let services = [];
        let useWeaveNet = false;
        if(composeConfig instanceof Array){
            services = composeConfig;
        }else{
            services = composeConfig.services;
            useWeaveNet = composeConfig.useWeaveNet || false;
        }
        services.forEach((service)=> {
            let count = service.count || 1;
            let cmdCode = `value-${service.serviceName}`;
            let config = cmdConfig[cmdCode];
            for (let i = 0; i < count; i++) {
                //检查volumeMap
            	let volumes;
            	if (config.volumeMap) {
            		volumes = {};
		            Object.keys(config.volumeMap).forEach(key => {
		                var val = config.volumeMap[key];
		                key = key.replace("${index}",`${projectName}/${i+1}`).replace("~",process.env.HOME);
		                volumes[key] = val;
		            });
                    volumes['/home/value/.vdata/shared'] = "/root/shared";
		        }

                //检查envMap
                let envs;
                if (config.envMap) {
                    envs = {};
                    Object.keys(config.envMap).forEach(key => {
                        var val = config.envMap[key];
                        val = val.replace("${dockerIp}",process.env.DOCKER_IP);
                        envs[key] = val;
                    });
                }

                //处理端口
                let ports;
                if (service.ports) {
                    ports = {};
                    envs = envs || {};
                    Object.keys(service.ports).forEach(key => {
                        var val = service.ports[key];
                        let keyArray = key.split(":");
                        if(keyArray.length==1){
                            key = parseInt(key)+i;
                            envs["port_"+val] = key;
                        }else{
                            envs["port_"+val] = (parseInt(keyArray[1])+i);
                            key = keyArray[0]+":"+(parseInt(keyArray[1])+i);
                        }
                        ports[key] = val;
                    });
                }

                //处理服务名称
                let serviceName = service.serviceName+(i+1);
                if(service.alias){
                    if(service.alias.length>=(i+1)){
                        serviceName = service.alias[i];
                    }
                }

                //处理healthcheck
                let healthcheck;
                if(service.healthcheck){
                    if(service.healthcheck.length>=(i+1)){
                        healthcheck = service.healthcheck[i];
                    }
                }

                let depends;
                if(service.depends){
                    depends = [];
                    service.depends.forEach((depend)=>{
                        if(typeof depend== "string"){
                            depends.push({
                                service:`${depend}`,
                                type:"service_started"
                            })
                        }else if(typeof depend== "object"){
                            depends.push(depend);
                        }
                    })
                }

                let links;
                if(service.links){
                    links = [];
                    service.links.forEach((link)=>{
                        links.push(`${link}`);
                    })
                }

            	buildData.push({
                    hostname:`${serviceName}`,
            		serviceName:`${serviceName}`,
            		buildPath:argv.swarm?null:`../../Dockerfile/${service.serviceName}`,
            		imageName:`value/${service.serviceName}`,
            		containerName:argv.swarm?null:`${cmdCode}-${projectName}-${i+1}`,
            		dns:argv.swarm?null:dns,
                    ports:ports,
                    healthcheck:healthcheck,
                    links:argv.swarm?null:links,
            		depends:depends,
                    volumes:volumes,
            		envs:envs
            	});

                let cmdStr = `./${service.serviceName}.js create ${i+1} -n -p ${projectName}`;
                super._exe(cmdStr);
            }
        });
		fs.readFile("yaml/compose.yaml","utf-8",  function(err, data) {
			let driverTpl = _.template(data);
			let composeStr = driverTpl({buildData:buildData,useWeaveNet:useWeaveNet}).replace(/(^[ \t]*\n)/gm, "");
			let folderPath = `../compose/${argv.name}`;
			if (!fs.existsSync(folderPath)) {
				fs.mkdirSync(folderPath);
			}
			fs.writeFile(`${folderPath}/docker-compose.yaml`,composeStr);
        	console.log(composeStr);
		});

        
    }
}
let composeManager = new ComposeManager();
composeManager.compose();
