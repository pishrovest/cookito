import { Platform } from 'react-native';
import { registerRootComponent } from 'expo';
import App from './App';

if (Platform.OS === 'web') {
  require('./app.web');
} else {
  registerRootComponent(App);
}