# unifi-detect

Wifi device presence detection with unifi controller

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

The 

### How to run

To test unifi-detect, just run `$:>unifi-detect` from the folder where your config.json is, or `$:>unifi-detect -c the-folder-with-config-json`. If no errors are shown, go into Domoticz to see if the virtual switches you created in step 5 in the installation have been updated.

When the installation has been verified, set up running unifi-detect periodically with cron. How often depends on how close to real-time you want the detection to be. In my experience, a phone connecting will be pretty instantaneously detected by the Unifi controller. A phone disconnection will take up to five minutes or so before registering.
