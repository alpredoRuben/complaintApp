import React from 'react';
import {useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import MainNavigation from './navigations/MainNavigation';
import {LoginScreen, SplashScreen} from './screens';
const AuthStack = createStackNavigator();

function Mains(props) {
  const {userInfo} = useSelector((state) => state.AuthReducer);

  return userInfo && userInfo !== null ? (
    <MainNavigation />
  ) : (
    <AuthStack.Navigator headerMode="none">
      <AuthStack.Screen name="SplashScreen" component={SplashScreen} />
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
    </AuthStack.Navigator>
  );
}

export default Mains;
