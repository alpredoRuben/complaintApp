import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Routes from './Routes';
import {
  DashboardStackScreen,
  InfoStackScreen,
  ProfileStackScreen,
} from './Stackers';

const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator initialRouteName="DashboardScreen" activeColor="#fff">
    <Tab.Screen
      name="DashboardScreen"
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
      name="InfoScreen"
      component={InfoStackScreen}
      options={{
        tabBarLabel: 'Informasi',
        tabBarColor: '#1f65ff',
        tabBarIcon: ({color}) => (
          <Icon name="ios-information-circle" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="ProfileScreen"
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

export default function MainNavigation() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="DashboardDrawer" component={MainTabScreen} />
      {Routes.map((item, index) => (
        <Drawer.Screen
          name={item.name}
          component={item.component}
          key={index}
        />
      ))}
    </Drawer.Navigator>
  );
}
