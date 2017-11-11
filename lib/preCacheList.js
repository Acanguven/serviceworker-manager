const util = require('./util');
const constants = require('./constants');

class PreCache {
    constructor(path, shouldTryServerFisrt, updateOnServer){
        this.regex = path;
        this.shouldTryServerFisrt = shouldTryServerFisrt;
        this.updateOnServer = updateOnServer;
    }

    toRegex(){
        return JSON.stringify(this);
    }
}

class PreCacheList {
    constructor(arr){
        this.list = [];
        this.loadFromArray(arr);
    }

    loadFromArray(arr) {
        this.list = arr.reduce(function (list, preCacheItem) {
            list.push(new PreCache(preCacheItem.path, preCacheItem.shouldTryServerFisrt, preCacheItem.updateOnServer))
            return list;
        }, []);
    }

    outputs() {
        return this.list.map(function (preCacheItem) {
            return preCacheItem.toRegex();
        });
    }
}

module.exports.config = {
    name: ['Adds a new item to precache list', 'Removes an item from precache list'],
    argument: 'precache',
    subArguments: ['add', 'remove'],
    isDisabled(){
        return util.fileExists(constants.configFileName) ? false : 'You should create service worker first'
    }
};
module.exports.handler = (args) => {
    console.log(args);
};
module.exports.PreCacheList = PreCacheList;