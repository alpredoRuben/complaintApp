import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../utils/Colors';
import {
  DashboardStackScreen,
  InfoStackScreen,
  ProfileStackScreen,
} from './StackScreenComponents';

const tabOptions = (tabLabel, iconName) => ({
  tabBarLabel: tabLabel,
  tabBarColor: Colors.SecondBackground,
  tabBarIcon: ({color}) => <Icon name={iconName} color={color} size={26} />,
});

const BottomTab = createMaterialBottomTabNavigator();
function BottomTabNavigator() {
  return (
    <BottomTab.Navigator initialRouteName="DashboardScreen" activeColor="#fff">
      <BottomTab.Screen
        name="DashboardScreen"
        component={DashboardStackScreen}
        options={tabOptions('Dashboard', 'ios-home')}
      />
      <BottomTab.Screen
        name="InfoScreen"
        component={InfoStackScreen}
        options={tabOptions('Informasi', 'ios-information-circle')}
      />
      <BottomTab.Screen
        name="ProfileScreen"
        component={ProfileStackScreen}
        options={tabOptions('Profile', 'ios-person')}
      />
    </BottomTab.Navigator>
  );
}

export default BottomTabNavigator;
