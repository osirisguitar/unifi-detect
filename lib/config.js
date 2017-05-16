'use strict';

const nconf = require('nconf').env({
  separator: '__',
  lowerCase: true
}).file({
  file: 'config.json',
  dir: '../../',
  search: true
});

const config = {
  unifi: {
    url: nconf.get('unifi:url'),
    user: nconf.get('unifi:user'),
    password: nconf.get('unifi:password')
  },
  domoticz: {
    url: nconf.get('domoticz:url'),
    deviceMappings: nconf.get('domoticz:deviceMappings')
  }
};

module.exports = config;
