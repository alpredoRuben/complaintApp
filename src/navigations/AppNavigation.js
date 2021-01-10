import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  LoginScreen,
  SplashScreen,
  DashboardScreen,
  OperationalTypeScreen,
  ComplaintScreen,
  ComplaintTypeScreen,
  SettingScreen,
  ProfileScreen,
  NotifScreen,
  InfoScreen,
} from '../screens';

/** ALL OF STACK */
const InfoStack = createStackNavigator();
const InfoStackScreen = () => (
  <InfoStack.Navigator>
    <InfoStack.Screen name="Info" component={InfoScreen} />
  </InfoStack.Navigator>
);

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={ProfileScreen} />
  </ProfileStack.Navigator>
);

const DashboardStack = createStackNavigator();
const DashboardStackScreen = () => (
  <DashboardStack.Navigator>
    <DashboardStack.Screen name="Dashboard" component={DashboardScreen} />
  </DashboardStack.Navigator>
);

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator activeColor="#fff">
    <Tab.Screen
      name="Dashboard"
      component={DashboardStackScreen}
      options={{
        tabBarLabel: 'Dashboard',
        tabBarColor: '#009387',
        tabBarIcon: ({color}) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Informasi"
      component={InfoStackScreen}
      options={{
        tabBarLabel: 'Info',
        tabBarColor: '#1f65ff',
        tabBarIcon: ({color}) => (
          <Icon name="ios-notifications" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileStackScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarColor: '#694fad',
        tabBarIcon: ({color}) => (
          <Icon name="ios-person" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

const AppStack = createStackNavigator();
const AppNavigation = () => {
  return (
    <AppStack.Navigator headerMode="none">
      <AppStack.Screen name="Splash" component={SplashScreen} />
      <AppStack.Screen name="Login" component={LoginScreen} />
      <AppStack.Screen name="container" component={MainTabScreen} />
    </AppStack.Navigator>
  );
};

export default AppNavigation;
