// ./lib/index.js

const inquirer = require('inquirer');
const theme = require('./theme');


class TaskSelector {
    constructor() {
        this.taskList = [
            require('./createConfig'),
            require('./version'),
            require('./versionBump'),
            require('./swBuilder')
        ]
    }

    applyArgument(args) {
        const argumentTask = this.taskArgumentExists(args._[0]);
        if (argumentTask) {
            argumentTask.handler(args);
        }else{
            this.showTaskList(args);
        }
    }

    taskArgumentExists(argumentTask){
        return this.taskList.find((task) => {
            return task.config.argument === argumentTask;
        });
    }

    showTaskList(args) {
        const self = this;
        const taskList = this.createTaskAvailableList();
        inquirer.prompt([{
            type: 'list',
            name: 'selectedTask',
            message: 'What you need?',
            choices: taskList,
            default: taskList[0].name
        }]).then(function (answer) {
            const selectedArgument = answer['selectedTask'].split(' |')[0];
            self.taskList.find((task) => {
                return task.config.argument == selectedArgument;
            }).handler(args);
        });
    }

    createTaskAvailableList () {
        return this.taskList.map(function (task) {
            return {
                name: [task.config.argument,theme.info(task.config.name)].join(' | '),
                disabled: task.config.isDisabled()
            }
        });
    }
}

module.exports = new TaskSelector();