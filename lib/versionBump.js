const util = require('./util');
const constants = require('./constants');
const theme = require('./theme');

exports.config = {
    name: 'Updates service worker for cleaning cache',
    argument: 'version bump',
    isDisabled() {
        return util.fileExists(constants.configFileName) ? false : 'You should create service worker first'
    }
};

exports.handler = () => {
    const config = util.readConfig();
    config.version++;
    util.toFile(constants.configFileName, JSON.stringify(config, null, 4));
    require('./swBuilder').handler(config);
    console.log(theme.info('Version:'), config.version - 1, ' -> ', config.version);
};