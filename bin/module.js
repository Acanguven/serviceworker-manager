#!/usr/bin/env node

const startArguments = require('minimist')(process.argv.slice(2));

require('../lib').applyArgument(startArguments);
