import { AppRegistry, DeviceEventEmitter } from 'react-native';
import { Event } from 'react';
import App from './app/main';

DeviceEventEmitter.addListener('onDefaultMessage', function(event) {
    //Replace this with your own handling code.
    console.log("You have receieved a push message." + JSON.stringify(event));
  });

AppRegistry.registerComponent('SnapScreen', () => App);
