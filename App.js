import React from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider as ReduxProvider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';

import Themes from './src/utils/Themes';
import ConfigStore from './src/store';
import Mains from './src/Main';

const {store, persistor} = ConfigStore();

const App = () => {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={Themes}>
          <NavigationContainer theme={Themes}>
            <Mains />
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;
