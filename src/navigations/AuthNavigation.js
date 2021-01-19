import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {LoginScreen, SplashScreen} from '../screens';

const AuthStack = createStackNavigator();

const AuthNavigation = () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen name="SplashScreen" component={SplashScreen} />
    <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
  </AuthStack.Navigator>
);
export default AuthNavigation;
