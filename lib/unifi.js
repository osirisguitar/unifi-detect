'use strict';

const rp = require('request-promise-native');

// Most controllers run on internal IPs with self-signed certificates
// so for now we'll just close our eyes and press the accelerator.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

let storedCookies = '';

let config;

// Call this before calling any other methods in this module
function init (unifiConfig) {
  config = unifiConfig;
}

function login () {
  // Room for improvement: save stored cookies to a file and
  // implement a retry if they have expired. Would save almost
  // 50 percent of the requests to the controller.
  if (storedCookies) {
    return Promise.resolve(storedCookies);
  } else {
    const loginOptions = {
      method: 'POST',
      uri: `${config.url}/api/login`,
      resolveWithFullResponse: true,
      body: {
        username: config.user,
        password: config.password,
        remember: true,
        strict: true
      },
      json: true
    };

    return rp(loginOptions)
      .then(response => {
        const receivedCookies = response.headers['set-cookie'];
        const concatString = receivedCookies.reduce((concatenatedString, currentCookie) => {
          const key = currentCookie.split(';')[0].split('=')[0];
          const value = currentCookie.split(';')[0].split('=')[1];

          concatenatedString += `${key}=${value};`;
          return concatenatedString;
        }, '');

        return concatString;
      });
  }
}

function transformDevice (unifiDevice) {
  return {
    mac: unifiDevice.mac,
    ip: unifiDevice.ip,
    apMac: unifiDevice.ap_mac,
    lastSeen: new Date(unifiDevice.last_seen * 1000),
    name: unifiDevice.hostname
  };
}

function getDevices () {
  return login()
    .then(cookies => {
      const requestOptions = {
        method: 'GET',
        uri: `${config.url}/api/s/default/stat/sta`,
        headers: {
          Cookie: cookies
        },
        json: true
      };

      return rp(requestOptions)
        .then(devices => {
          return devices.data.map(device => {
            return transformDevice(device);
          });
        })
        .catch(error => {
          console.log('Error in request', error);
          throw error;
        });
    });
}

module.exports = {
  init,
  getDevices
};
