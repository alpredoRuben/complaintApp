import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';

const AuthStack = createStackNavigator();

const AuthNavigation = () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen name="SplashScreen" component={SplashScreen} />
    <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
  </AuthStack.Navigator>
);
export default AuthNavigation;
