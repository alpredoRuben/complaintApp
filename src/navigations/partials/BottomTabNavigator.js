import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../utils/Colors';
import {
  DashboardStackScreen,
  ProfileStackScreen,
} from './StackScreenComponents';

const tabOptions = (tabLabel, iconName) => ({
  tabBarLabel: tabLabel,
  tabBarColor: Colors.FaceColorTheme,
  tabBarIcon: ({color}) => <Icon name={iconName} color={color} size={26} />,
});

const BottomTab = createMaterialBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator initialRouteName="DashboardScreen" activeColor="gold">
      <BottomTab.Screen
        name="DashboardScreen"
        component={DashboardStackScreen}
        options={tabOptions('Dashboard', 'ios-home')}
      />
      <BottomTab.Screen
        name="ProfileStackScreen"
        component={ProfileStackScreen}
        options={tabOptions('Profile', 'ios-person')}
      />
    </BottomTab.Navigator>
  );
}

export default BottomTabNavigator;
