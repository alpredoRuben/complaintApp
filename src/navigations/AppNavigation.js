/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../utils/Colors';

//RootStack
import {
  DashboardStackScreen,
  OperationalStackScreen,
  ComplaintStackScreen,
  ComplaintTypeStackScreen,
  SettingStackScreen,
  NotifStactScreen,
} from './RootStack';

//Screen
import LoginScreen from '../screens/LoginScreen';
import SplashScreen from '../screens/SplashScreen';
import ProfileScreen, {ProfileScreenOptions} from '../screens/ProfileScreen';
import InfoScreen, {InfoScreenOptions} from '../screens/InfoScreen';
import DrawerContent from '../components/DrawerContent';
import {useWindowDimensions} from 'react-native';

const screenOptionStack = {
  headerStyle: {
    backgroundColor: Colors.PrimaryBackground,
  },
  headerTintColor: Colors.White,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

/** ALL OF STACK */
const InfoStack = createStackNavigator();
const InfoStackScreen = () => (
  <InfoStack.Navigator screenOptions={screenOptionStack}>
    <InfoStack.Screen
      name="Info"
      component={InfoScreen}
      options={InfoScreenOptions}
    />
  </InfoStack.Navigator>
);

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
  <ProfileStack.Navigator screenOptions={screenOptionStack}>
    <ProfileStack.Screen
      name="Profile"
      component={ProfileScreen}
      options={ProfileScreenOptions}
    />
  </ProfileStack.Navigator>
);

/** DRAWER */
const Drawer = createDrawerNavigator();
const MainDrawerNavigator = () => {
  const dimensions = useWindowDimensions();
  const isLargeScreen = dimensions.width >= 768;
  console.log(isLargeScreen);
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      overlayColor="transparent"
      drawerType={isLargeScreen ? 'permanent' : 'back'}
      drawerStyle={isLargeScreen ? null : {width: '70%'}}
      drawerContent={(props) => <DrawerContent {...props} />}
      drawerContentOptions={{
        activeTintColor: '#e91e63',
      }}>
      <Drawer.Screen name="Dashboard" component={DashboardStackScreen} />
      <Drawer.Screen
        name="OperationalType"
        component={OperationalStackScreen}
      />
      <Drawer.Screen
        name="ComplaintType"
        component={ComplaintTypeStackScreen}
      />
      <Drawer.Screen name="Complaint" component={ComplaintStackScreen} />
      <Drawer.Screen name="Notif" component={NotifStactScreen} />
      <Drawer.Screen name="Setting" component={SettingStackScreen} />
    </Drawer.Navigator>
  );
};

/** TAB */
const Tab = createMaterialBottomTabNavigator();
const MainTabScreen = () => (
  <Tab.Navigator
    barStyle={{backgroundColor: Colors.White}}
    activeColor={Colors.PrimaryBackground}
    inactiveColor={Colors.LightGray}>
    <Tab.Screen
      name="Dashboard"
      component={MainDrawerNavigator}
      options={{
        tabBarLabel: 'Dashboard',
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
        tabBarIcon: ({color}) => (
          <Icon name="ios-information-circle" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileStackScreen}
      options={{
        tabBarLabel: 'Profile',
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
