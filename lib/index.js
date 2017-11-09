// ./lib/index.js

const inquirer = require('inquirer');
const theme = require('./theme');


class TaskSelector {
    constructor() {
        this.taskList = [
            require('./create-config'),
            require('./version'),
            require('./version-bump')
        ]
    }

    applyArgument(args) {
        const argumentTask = this.taskArgumentExists(args._[0]);
        if (argumentTask) {
            argumentTask.handler();
        }else{
            this.showTaskList();
        }
    }

    taskArgumentExists(argumentTask){
        return this.taskList.find((task) => {
            return task.config.argument === argumentTask;
        });
    }

    showTaskList() {
        const taskList = this.createTaskAvailableList();
        inquirer.prompt([{
            type: 'list',
            name: 'selectedTask',
            message: 'What you need?',
            choices: taskList,
            default: taskList[0].name
        }]).then(function (answers) {
            console.log(answers);
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