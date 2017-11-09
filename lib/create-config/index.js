const inquirer = require('inquirer');

exports.config = {
    name: 'Create a new service worker',
    argument: 'create',
    isDisabled() {
        return false;
    }
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
    }
];

class ConfigCreator {
    constructor(){
        this.askQuestions();
    }

    askQuestions() {
        inquirer.prompt(questions).then(function (answers) {
            console.log(answers);
        });
    }
}



exports.handler = (args) => {
  const configCreator = new ConfigCreator();
};

