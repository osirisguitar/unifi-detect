#! /usr/bin/env node
'use strict';

const unifi = require('./lib/unifi');
const domoticz = require('./lib/domoticz');
const config = require('./lib/config');

let configArgIndex = process.argv.findIndex(arg => {
  return arg === '-c';
});

if (configArgIndex) {
  config.init(process.argv[configArgIndex + 1]);
}

domoticz.init(config.domoticz.url);
unifi.init(config.unifi);

unifi.getDevices(config.unifi.url, config.unifi.host, config.unifi.user, config.unifi.password)
  .then(devices => {
    config.domoticz.deviceMappings.forEach(deviceMapping => {
      let device = devices.find(device => {
        return device.mac === deviceMapping.mac;
      });

      if (device) {
        domoticz.turnOnSwitch(deviceMapping.switchId);
      } else {
        domoticz.turnOnSwitch(deviceMapping.switchId);
      }
    });
  });
