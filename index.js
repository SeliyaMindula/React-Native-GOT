/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import './src/config/firebaseConfig';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
    'new NativeEventEmitter()', 
    '@firebase/auth:', 
  ]);

AppRegistry.registerComponent(appName, () => App);
