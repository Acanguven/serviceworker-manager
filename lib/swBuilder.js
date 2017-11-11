const fs = require('fs');
const UglifyES = require("uglify-es");
const util = require('./util');
const constants = require('./constants');
const PreCacheList = require('./preCacheList').PreCacheList;

class SwBuilder {
    constructor(){
        this.template = fs.readFileSync(__dirname + '/sw.template.js', 'utf-8');
    }

    build(swConfig){
        this.variableReplace('version', swConfig.version);
        this.variableReplace('cacheName', swConfig.cacheName);

        this.buildPreCaches(swConfig);

        this.buildFiles(swConfig);
    }

    variableReplace(name, value){
        this.template = this.template.replace('{' + name + '}', value);
    }

    buildFiles(swConfig){
        if(swConfig.minification){
            util.toFile(swConfig.minifiedPath, UglifyES.minify(this.template).code);
        }
        util.toFile(swConfig.path, this.template);
    }

    buildPreCaches(swConfig) {
        const preCacheList = new PreCacheList(swConfig.preCacheList);
        console.log(preCacheList.outputs());
        this.variableReplace('preCacheList', preCacheList.outputs())
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
    const config = !args.hasOwnProperty('_') ? args : util.readConfig();
    swBuilder.build(config);
};

