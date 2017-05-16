'use strict';

const rp = require('request-promise-native');

let domoticzUrl;

function init (url) {
  domoticzUrl = url;
}

function changeSwitch (switchIndex, command) {
  const domoticzCommandOptions = {
    method: 'GET',
    uri: `${domoticzUrl}/json.htm?type=command&param=switchlight&idx=${switchIndex}&switchcmd=${command}`,
    json: true
  };

  return rp(domoticzCommandOptions);
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
