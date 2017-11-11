const fs = require('fs');
const constants = require('./constants');
const mkdirp = require('mkdirp');
const path = require('path');

module.exports.fileExists = (filePath) => {
    return fs.existsSync(process.cwd() + '/' + filePath);
};

module.exports.toFile = (filePath, name) => {
    mkdirp.sync(path.dirname(filePath));
    fs.writeFileSync(process.cwd() + '/' + filePath, name);
};

module.exports.readConfig = () => {
    const configContent = fs.readFileSync(process.cwd() + '/' + constants.configFileName, 'utf-8');
    return JSON.parse(configContent);
};