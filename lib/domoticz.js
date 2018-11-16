'use strict';

const rp = require('request-promise-native');

let domoticzUrl;

// Call this before calling any other methods in this module
function init (url) {
  domoticzUrl = url;
}

function changeSwitch (switchIndex, command) {
  const domoticzReadCommandOptions = {
    method: 'GET',
    uri: `${domoticzUrl}/json.htm?type=devices&rid=${switchIndex}`,
    json: true
  };

  const domoticzSetCommandOptions = {
    method: 'GET',
    uri: `${domoticzUrl}/json.htm?type=command&param=switchlight&idx=${switchIndex}&switchcmd=${command}`,
    json: true
  };

  return rp(domoticzReadCommandOptions)
    .then(devices => {
      if (devices.result[0].Status !== command) {
        return rp(domoticzSetCommandOptions);
      }
    });
}

function turnOnSwitch (switchIndex) {
  return changeSwitch(switchIndex, 'On');
}

function turnOffSwitch (switchIndex) {
  return changeSwitch(switchIndex, 'Off');
}

module.exports = {
  init,
  turnOnSwitch,
  turnOffSwitch
};
