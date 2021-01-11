import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider as ReduxProvider} from 'react-redux';
import store from './src/store';

import Themes from './src/utils/Themes';
import Navigations from './src/navigations';

const App = () => {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={Themes}>
        <NavigationContainer theme={Themes}>
          <Navigations />
        </NavigationContainer>
      </PaperProvider>
    </ReduxProvider>
  );
};

export default App;
