'use strict';

const nconf = require('nconf').env({
  separator: '__',
  lowerCase: true
}).file({
  file: 'config.json',
  dir: '../../',
  search: true
});

function init (configFilePath) {
  nconf.use('file', { file: `${configFilePath}/config.json` });

  config.unifi = {
    url: nconf.get('unifi:url'),
    user: nconf.get('unifi:user'),
    password: nconf.get('unifi:password'),
    idleTime: nconf.get('unifi:idleTime')
  };
  config.domoticz = {
    url: nconf.get('domoticz:url'),
    deviceMappings: nconf.get('domoticz:deviceMappings')
  };
}

const config = {
  init: init,
  unifi: {
    url: nconf.get('unifi:url'),
    user: nconf.get('unifi:user'),
    password: nconf.get('unifi:password'),
    idleTime: nconf.get('unifi:idleTime')
  },
  domoticz: {
    url: nconf.get('domoticz:url'),
    deviceMappings: JSON.parse(nconf.get('domoticz:deviceMappings'))
  }
};

module.exports = config;
