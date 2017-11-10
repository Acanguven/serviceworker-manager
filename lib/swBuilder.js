const fs = require('fs');
const UglifyES = require("uglify-es");
const util = require('./util');
const constants = require('./constants');

class SwBuilder {
    constructor(){
        this.template = fs.readFileSync(__dirname + '/sw.template.js', 'utf-8');
    }

    build(swConfig){
        this.variableReplace('version', swConfig.version);
        this.variableReplace('cacheName', swConfig.cacheName);
        this.variableReplace('preCacheList', '');
        this.variableReplace('regexCacheList', '');
        this.buildFiles(swConfig);
    }

    variableReplace(name, value){
        this.template = this.template.replace('{' + name + '}', value);
    }

    buildFiles(swConfig){
        util.toFile(swConfig.path, this.template);
    }
}

module.exports.config = {
    name: 'Rebuilds service worker files',
    argument: 'rebuild',
    isDisabled() {
        return util.fileExists(constants.configFileName) ? false : 'You should create service worker first';
    }
};

const swBuilder = new SwBuilder();
module.exports.handler = (args) => {
    const config = args || util.readConfig();
    swBuilder.build(config);
};

