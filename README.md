[![npm version](https://badge.fury.io/js/unifi-detect.svg)](https://badge.fury.io/js/unifi-detect)

# unifi-detect

Wifi device presence detection for Domoticz using a Ubiquiti Unifi controller.

### Requirements

1. Node v6 or later
2. A Unifi controller running
3. A Domoticz instance running

### Install

1. Create a directory for unifi-detect and cd into it.
2. Run `$:>npm i -g unifi-detect`
3. Obtain the MAC addresses of the wifi devices you want to detect
4. Create one virtual switch in Domoticz for each wifi device
5. Create a config.json (see below) using your favorite editor

### Configuration

Put a file called config.json in the directory from where you run the command unifi-detect (or specify its location with the -c switch). Contents:

```
{
  "unifi": {
    "url": "https://localhost:8443",
    "user": "unifi",
    "password": "unifi",
    "idleTime": 60
  },
  "domoticz": {
    "url": "http://user:password@localhost:8080",
    "deviceMappings": [{
      "mac": "00:00:00:00:00:00",
      "deviceAlias": "My iPhone",
      "switchId": "77"
    }]
  }
}
```

| Unifi settings | Explanation |
| ------|-|
| url | Url for the Unifi controller, no trailing slash |
| user | User name for the controller |
| password | Password for the controller |
| idleTime | Time in seconds until a device is considered away |

| Domoticz settings | Explanation |
| -------- |-|
| url | Url for the Domoticz installation, including name and password*, no trailing slash. |
| deviceMappings.mac | MAC address of device to detect |
| deviceMappings.deviceAlias | Readable name of device, only used in logging |
| deviceMappings.switchId | Domoticz idx-value of virtual switch |

#### Using environment variables

This project uses nconf, with __ as a separator. So if you are passing the config as environment variables on the docker run command line:

```-e "unifi__url=https://localhost:8443"
-e "unifi__user=unifi"
-e "unifi__password=unifi"
-e "unifi__idleTime=60"
-e "domoticz__url=http://user:password@localhost:8080"
-e "domoticz__deviceMappings=[{\"mac\":\"00:00:00:00:00:00\",\"deviceAlias\":\"My iPhone\",\"switchId\":\"77\"}]"
```

(remove quotes and escaping inside device mappings if passing env variables in an orchestrator UI like rancher).

_* Name and password are required for Domoticz API access even if you access it from addresses that are white-listed in the Domoticz settings._

### How to run

#### Manual installation

To test unifi-detect, just run `$:>unifi-detect` from the folder where your config.json is, or `$:>unifi-detect -c the-folder-with-config-json`. If no errors are shown, go into Domoticz to see if the virtual switches you created in step 5 in the installation have been updated.

When the installation has been verified, set up running unifi-detect periodically with cron or some other scheduler. How often depends on how close to real-time you want the detection to be. In my experience, a phone connecting will be pretty instantaneously detected by the Unifi controller. A phone disconnection will take up to five minutes or so before registering. Because of this, running unifi-detect more often than once a minute will probably not make updates faster.

#### Docker

    $:>docker run -d -e "unifi__url=https://localhost:8443" -e "unifi__user=unifi" -e "unifi__password=unifi" -e "unifi__idleTime=60" -e "domoticz__url=http://user:password@localhost:8080" -e "domoticz__deviceMappings=[{\"mac\":\"00:00:00:00:00:00\",\"deviceAlias\":\"MyiPhone\",\"switchId\":\"77\"}]" -e TASK_SCHEDULE="* * * * *" osirisguitar/unifi-detect:1.1`

The image is here: [https://hub.docker.com/r/osirisguitar/unifi-detect/](https://hub.docker.com/r/osirisguitar/unifi-detect/)