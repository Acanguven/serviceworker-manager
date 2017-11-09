const chalk = require('chalk');

module.exports = {
    info: chalk.keyword('blue'),
    success: chalk.keyword('green'),
    error: chalk.keyword('red'),
    introText: chalk.cyan(`                                                 
  _____      ___ __ ___   __ _ _ __  
 / __\\ \\ /\\ / / '_ \` _ \\ / _\` | '_ \\ 
 \\__ \\\\ V  V /| | | | | | (_| | | | |
 |___/ \\_/\\_/ |_| |_| |_|\\__,_|_| |_|
                                     
       Service Worker Manager                              
`)
};