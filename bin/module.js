#!/usr/bin/env node

process.stdout.write("\u001b[2J\u001b[0;0H");
console.log(require('../lib/theme').introText);

const startArguments = require('minimist')(process.argv.slice(2));
require('../lib').applyArgument(startArguments);