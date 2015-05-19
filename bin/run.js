#!/usr/bin/env node
'use strict';
var argv = require('commander'),
    hateip = require('../index.js'),
    packageJson = require('../package.json')
    ;

argv
  .version(packageJson.version)
  .option('-n, --name [subdomain]', 'hateip.com subdomain name. [name].hateip.com etc.')
  .option('-i, --ip [ip]', 'custom ip.')
  .option('--with-pac [boolean]', 'with pac server.')
  .option('--pac-port [pac-port]', 'pac server port.')
  .option('--pac-proxy-port [proxy-port]', 'pac server port.')
  .parse(process.argv);

hateip.run({
    name : argv['name'],
    ip : argv['ip'],
    withPac : argv['withPac'],
    pacPort : argv['pacPort'],
    pacProxyPort : argv['pacProxyPort']
});