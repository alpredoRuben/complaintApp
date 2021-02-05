import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
// import Samples from './Samples';
import App from './App';
import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => Samples);
AppRegistry.registerComponent(appName, () => App);
