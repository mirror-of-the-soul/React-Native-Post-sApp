import React, {useState} from 'react';
import AppLoading from 'expo-app-loading';
import {bootstrap} from './src/bootstrap';
import {AppNavigation} from './src/navigation/AppNavigation';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
console.disableYellowBox = true;

export default function App() {
  const [isReady, setIsReady] = useState(false)

  if (!isReady) {
    return (
      <AppLoading
        startAsync={bootstrap}
        onFinish={() => setIsReady(true)}
        onError={err => console.log(err)}
      />
    )
  }

  return <AppNavigation />
}
