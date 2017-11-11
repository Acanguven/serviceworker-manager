const util = require('./util');
const constants = require('./constants');
const theme = require('./theme');
const versionBumpTask = require('./versionBump');

exports.config = {
    name: 'Shows service worker version',
    argument: 'version',
    isDisabled() {
        return util.fileExists(constants.configFileName) ? false : 'You should create service worker first';
    }
};

exports.handler = (args) => {
    const versionTask = args._[1];
    const config = util.readConfig();

    if(versionTask && this.config.argument + ' ' + versionTask == versionBumpTask.config.argument){
        versionBumpTask.handler(args)
    }else{
        console.log(theme.info('Version:'), config.version);
    }
};

