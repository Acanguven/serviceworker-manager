const util = require('./util');
const constants = require('./constants');

exports.config = {
    name: 'Updates service worker for cleaning cache',
    argument: 'version bump',
    isDisabled() {
        return util.fileExists(constants.configFileName) ? false : 'You should create service worker first'
    }
};

exports.handler = () => {

};