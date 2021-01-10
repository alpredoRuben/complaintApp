import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';

import Themes from './src/utils/Themes';
import AppNavigation from './src/navigations/AppNavigation';

const App = () => {
  return (
    <PaperProvider theme={Themes}>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
