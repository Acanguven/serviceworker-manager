const inquirer = require('inquirer');
const swBuilder = require('./swBuilder');
const util = require('./util');
const constants = require('./constants');

exports.config = {
    name: 'Create a new service worker',
    argument: 'create',
    isDisabled() {
        return util.fileExists(constants.configFileName) ? 'You already have '+constants.configFileName+' created' : false;
    }
};

const swConfig = {
    preCacheList: [],
    regexCacheList: []
};

const questions = [
    {
        type: 'prompt',
        name: 'path',
        message: 'Where do you want the script to be exported?',
        choices: ['a','b','c'],
        default: './sw.js'
    },
    {
        type: 'confirm',
        name: 'minification',
        message: 'Do you want it to be minified?',
    },
    {
        type: 'prompt',
        name: 'minifiedPath',
        message: 'Where do you want your minified script to be exported?',
        default: './sw.min.js',
        when(args){
            return args['minification'];
        }
    },
    {
        type: 'prompt',
        name: 'version',
        message: 'What is your first version?',
        default: 1,
        when(args){
            return args['minification'];
        },
        validate(value){
            return typeof value == 'number';
        }
    },
    {
        type: 'prompt',
        name: 'cacheName',
        message: 'What is your cache name?',
        default: 'swcache',
        validate(value){
            return typeof value == 'string';
        }
    }
];

class ConfigCreator {
    constructor(){
        this.askQuestions();
    }

    askQuestions() {
        const self = this;
        inquirer.prompt(questions).then(function (answers) {
            self.mergeConfig(answers);
            self.createConfigFile();
            swBuilder.handler(swConfig);
        });
    }

    mergeConfig(answers) {
        for(const prop in answers){
            swConfig[prop] = answers[prop];
        }
    }

    createConfigFile() {
        util.toFile(constants.configFileName,JSON.stringify(swConfig, null, 4));
    }
}



exports.handler = (args) => {
  const configCreator = new ConfigCreator();
};

