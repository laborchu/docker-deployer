#!/usr/bin/env node

'use strict';
let fs = require('fs');
let path = require('path');
let mkdirp = require('mkdirp');

var program = require('commander');
var execSync = require('child_process').execSync;
var packageConfig = require('./package.json');
var cmdConfig = packageConfig.cmdConfig;
var composeConfig = packageConfig.compose;

const EXE_CREATE = "create";
const EXE_RESTART = "restart";
const EXE_STOP = "stop";
const EXE_REMOVE = "remove";
const EXE_BASH = "bash";
const EXE_IP = "ip";
const EXE_RMI = "rmi";
const EXE_COMPOSE = "compose";
const EXE_BUILD = "build";

const ENV_DOCKER = "docker";
const ENV_WEAVE = "weave";
const DATA_PATH = process.env.HOME+"/.vdata";


let argv = {};
program
    .version('0.0.1')
    .option('-E --exeEnv <env>', '启动环境docker启动还是weave启动，默认weave')
    .option('--verbose', '查看更多的debug信息');

program
    .command('create <index>')
    .description('创建容器')
    .option("-P, --portMap [enable]", "是否端口映射,默认false")
    .option("-c, --cmd [cmd]", "是否传递命令")
    .option("-n, --noc ", "不创建容器,只执行before和after")
    .option("-p, --prefix [prefix]", "前缀")
    .action(function(index, options) {
        if (!Number.isInteger(+index)) {
            console.log('index必须为数字,现在值是[%s]', index);
            process.exit(1);
        }
        if (options.portMap !== undefined) {
            argv.portMap = true;
            if (typeof(options.portMap) !== "boolean") {
                console.log('-pm必须是boolean类型,现在是[%s]', options.portMap);
                process.exit(1);
            }
        }
        argv.exe = EXE_CREATE;
        argv.index = +index;
        argv.cmd = options.cmd;
        argv.noc = options.noc?true:false;
        if(options.prefix){
            argv.prefix = options.prefix;
        }else{
            argv.prefix = "";
        }
    });

program
    .command('restart <index>')
    .description('重启容器')
    .action(function(index) {
        if (!Number.isInteger(+index)) {
            console.log('index必须为数字,现在值是[%s]', index);
            process.exit(1);
        }
        argv.exe = EXE_RESTART;
        argv.index = +index;
    });

program
    .command('stop <index>')
    .description('停止容器')
    .action(function(index) {
        if (!Number.isInteger(+index)) {
            console.log('index必须为数字,现在值是[%s]', index);
            process.exit(1);
        }
        argv.exe = EXE_STOP;
        argv.index = +index;
    });

program
    .command('remove <index>')
    .description('删除容器')
    .action(function(index) {
        if (!Number.isInteger(+index)) {
            console.log('index必须为数字,现在值是[%s]', index);
            process.exit(1);
        }
        argv.exe = EXE_REMOVE;
        argv.index = +index;
    });

program
    .command('bash <index>')
    .description('bash容器')
    .option("-p, --prefix [prefix]", "前缀")
    .action(function(index,options) {
        if (!Number.isInteger(+index)) {
            console.log('index必须为数字,现在值是[%s]', index);
            process.exit(1);
        }
        argv.exe = EXE_BASH;
        argv.index = +index;
        argv.prefix = options.prefix;
    });

program
    .command('ip <index>')
    .description('后去容器ip')
    .action(function(index) {
        if (!Number.isInteger(+index)) {
            console.log('index必须为数字,现在值是[%s]', index);
            process.exit(1);
        }
        argv.exe = EXE_IP;
        argv.index = +index;
    });

program
    .command('rmi ')
    .description('删除镜像')
    .action(function() {
        argv.exe = EXE_RMI;
    });


program
    .command('bi')
    .description('构建image')
    .action(function(name) {
        argv.exe = EXE_BUILD;
    });

program
    .command('bc <name>')
    .description('构建compose')
    .option("-s, --swarm ", "构建swarm")
    .action(function(name,options) {
        argv.exe = EXE_COMPOSE;
        argv.name = name;
        argv.swarm = options.swarm?true:false;
    });

program.parse(process.argv);

if (program.exeEnv !== undefined) {
    if (program.exeEnv !== ENV_DOCKER && program.env !== ENV_WEAVE) {
        console.log('-e必须是docker|weave,现在是[%s]', program.exeEnv);
        process.exit(1);
    }
}
argv.exeEnv = program.exeEnv || process.env.DOCKER_EXE_ENV || ENV_WEAVE;
argv.verbose = program.verbose ? true : false;

if (process.env.DOCKER_DNS === undefined) {
    console.log('请在环境变量中设置DOCKER_DNS');
    process.exit(1);
}
if (process.env.DOCKER_NS === undefined) {
    console.log('请在环境变量中设置DOCKER_NS');
    process.exit(1);
}
if (process.env.DOCKER_IP === undefined) {
    console.log('请在环境变量中设置DOCKER_IP');
    process.exit(1);
}

module.exports = class Manager {
    constructor() {}
    init() {
        if (!cmdConfig || !cmdConfig[this.cmdCode]) {
            console.log('package.json请配置${this.cmdCode}的信息');
            process.exit(1);
        }
        this.config = cmdConfig[this.cmdCode];
        if (this.config.img === undefined) {
            console.log(`请在package.json中配置${this.cmdCode}.img的信息`);
            process.exit(1);
        }
        // if (this.config.ip === undefined) {
        //     console.log(`请在package.json中配置${this.cmdCode}.ip`);
        //     process.exit(1);
        // }
    }
    create() {
        let env = this._getEnv();
        let ip = "";
        if (argv.exeEnv === ENV_WEAVE) {
            ip = this._getIp();
        }
        let portMap = "";
        if (argv.portMap) {
            portMap = this._getPortMap() || "-P";
        }
        let volumeMap = this._getVolumeMap();
        let dns = process.env.DOCKER_DNS;
        let dockerId = this._getDockerId();
        let img = this.config.img;
        let cmdStr = `${argv.exeEnv} run  ${ip} ${portMap} ${volumeMap} -d ${env} --dns ${dns} --name ${dockerId} ${img}`;
        let options = this._beforeCreate();
        if(options&&options.cmd){
            cmdStr += " "+options.cmd;
        }
        if(!argv.noc){
            this._exe(cmdStr);
            this._afterCreate()
        };
    }
    restart() {
        let dockerId = this._getDockerId();
        let exeStr = `docker stop ${dockerId}`;
        this._exe(exeStr);
        let ip = "";
        if (argv.exeEnv === ENV_WEAVE) {
            ip = this._getIp();
        }
        exeStr = `${argv.exeEnv} start ${ip} ${dockerId}`;
        this._exe(exeStr);
    }
    remove() {
        let dockerId = this._getDockerId();
        let exeStr = `docker stop ${dockerId}`;
        this._exe(exeStr);
        exeStr = `docker rm ${dockerId}`;
        this._exe(exeStr);
    }
    stop() {
        let dockerId = this._getDockerId();
        let exeStr = `docker stop ${dockerId}`;
        this._exe(exeStr);
    }
    bash() {
        let dockerId = this._getDockerId();
        let exeStr = `docker exec -i -t ${dockerId} bash`;
        execSync(exeStr,{ stdio: [0, 1, 2] });
    }
    ip() {
        let dockerId = this._getDockerId();
        let exeStr = `docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' ${dockerId}`;
        let stdout = execSync(exeStr);
        return stdout.toString().replace("\r","").replace("\n","");
    }
    rmi() {
        let img = this.config.img;
        let cmdStr = `docker rmi ${img}`;
        this._exe(cmdStr);
    }
    bi() {
        let img = this.config.img;
        let dockerfile = this.cmdCode.replace("value-","");
        let cmdStr = `cd ../Dockerfile/${dockerfile} && docker build -t ${img} .`;
        this._exe(cmdStr);
    }
    compose() {
        
    }
    exe() {
        this.init();
        if (argv.exe === EXE_CREATE) {
            this.create();
        } else if (argv.exe === EXE_RESTART) {
            this.restart();
        } else if (argv.exe === EXE_STOP) {
            this.stop();
        } else if (argv.exe === EXE_REMOVE) {
            this.remove();
        } else if (argv.exe === EXE_BASH) {
            this.bash();
        } else if (argv.exe === EXE_IP) {
            this.ip();
        } else if (argv.exe === EXE_RMI) {
            this.rmi();
        } else if (argv.exe === EXE_BUILD) {
            this.bi();
        }else{
		    console.log('command not found');
		    process.exit(1);
        }
        console.log(argv.exe+` ${this.cmdCode} success`);
    }

    _exe(exeStr) {
        execSync(exeStr,{ stdio: [0, 1, 2] });
        this._log(exeStr);
    }
    _getDockerId() {
        let prefix = "";
        if(argv.prefix){
            prefix = `-${argv.prefix}-`;
        }
        return `${this.cmdCode}${prefix}${argv.index}`;
    }
    _getIp() {
        let ipStart = this.config.ip;
        return process.env.DOCKER_NS.replace("%s", ipStart + argv.index - 1);
    }
    _getDockerIp() {
        return process.env.DOCKER_IP;
    }
    _getIndex(){
        return argv.index;
    }
    _getCmd(){
        return argv.cmd;
    }
    _getDns(){
        return process.env.DOCKER_DNS;
    }
    _getCompose(){
        return composeConfig[argv.name];
    }
    _getArgv(){
        return argv;
    }
    _getCmdConfig(){
        return cmdConfig;
    }
    _afterCreate(){}
    _beforeCreate(){}
    _getVolumeMap() {
        let volumeMap = "";
        if (this.config.volumeMap) {
            Object.keys(this.config.volumeMap).forEach(key => {
                var val = this.config.volumeMap[key];
                key = key.replace("${index}",argv.index);
                volumeMap += ` -v ${key}:${val}`;
            });
        }
        volumeMap += ` -v ~/.vdata/shared:/root/shared`;
        return volumeMap;
    }
    _getPortMap() {
        let portMap = "";
        if (this.config.ports) {
            Object.keys(this.config.ports).forEach(key => {
                var val = this.config.ports[key];
                portMap += ` -p 127.0.0.1:${parseInt(key)+argv.index}:${val}`;
            });
        }
        return portMap;
    }
    _getEnv(){
        let envMap = "";
        if (this.config.envMap) {
            Object.keys(this.config.envMap).forEach(key => {
                var val = this.config.envMap[key];
                key = key.replace("${dockerIp}",process.env.DOCKER_IP);
                envMap += ` -e ${key}:${val}`;
            });
        }
        return envMap;
    }
    _log(msg) {
    	if (argv.verbose) {
        	console.log(msg);
        }
    }
    _getDataPath(){
        return DATA_PATH;
    }
    _createFolder(folder){
        if (!fs.existsSync(folder)) {
            var oldmask = process.umask(0);
            mkdirp.sync(folder);
            process.umask(oldmask);
        } 
        // else {
        //     fs.chmod(folder, '0777');
        // }
    }
    _copyFile(src,dist){
        if (!fs.existsSync(dist)) {
            var sourceFile = path.join(src);
            var readStream = fs.createReadStream(sourceFile);
            var writeStream = fs.createWriteStream(dist,{mode: 0o777});
            readStream.pipe(writeStream);
        }
    }
};
