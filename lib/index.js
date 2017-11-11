const inquirer = require('inquirer');
const theme = require('./theme');

class TaskSelector {
    constructor() {
        this.taskList = [
            require('./createConfig'),
            require('./version'),
            require('./versionBump'),
            require('./swBuilder'),
            require('./preCacheList')
        ]
    }

    applyArgument(args) {
        const argumentTask = this.taskArgumentExists(args._[0]);
        if (argumentTask) {
            argumentTask.handler(args);
        } else {
            this.showTaskList(args);
        }
    }

    taskArgumentExists(argumentTask) {
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
                console.log(task.config.argument, selectedArgument);
                if(task.config.subArguments){
                    //todo secilen taskı alamıyorum subargumentleri olanlar için
                    const merged = task.config.argument + task.config.subArguments
                }else{
                    return task.config.argument == selectedArgument;
                }
            }).handler(args);
        });
    }

    createTaskAvailableList() {
        return this.taskList.reduce(function (list, task) {
            if (task.config.subArguments) {
                for (let i = 0, len = task.config.subArguments.length; i < len; i++) {
                    list.push({
                        name: [task.config.argument + ' ' + task.config.subArguments[i], theme.info(task.config.name[i])].join(' | '),
                        disabled: task.config.isDisabled()
                    });
                }
            } else {
                list.push({
                    name: [task.config.argument, theme.info(task.config.name)].join(' | '),
                    disabled: task.config.isDisabled()
                });
            }
            return list;
        }, []);
    }
}

module.exports = new TaskSelector();