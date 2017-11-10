const util = require('./util');
const constants = require('./constants');

exports.config = {
    name: 'Shows service worker version',
    argument: 'version',
    isDisabled() {
        return util.fileExists(constants.configFileName) ? false : 'You should create service worker first';
    }
};

exports.handler = () => {

};