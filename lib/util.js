const fs = require('fs');
const constants = require('./constants');

module.exports.fileExists = (filePath) => {
    return fs.existsSync(process.cwd() + '/' + filePath);
};

module.exports.toFile = (path, name) => {
    fs.writeFileSync(process.cwd() + '/' + path, name);
};

module.exports.readConfig = (path, name) => {
    return JSON.parse(fs.readFileSync(process.cwd() + '/' + constants.configFileName, 'utf-8'));
};