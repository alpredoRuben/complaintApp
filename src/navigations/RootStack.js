import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import DashboardScreen, {
  DashboardScreenOptions,
} from '../screens/DashboardScreen';
import OperationalTypeScreen, {
  OperationalTypeScreenOptions,
} from '../screens/OperationalTypeScreen';
import ComplaintScreen, {
  ComplaintScreenOptions,
} from '../screens/ComplaintScreen';
import ComplaintTypeScreen, {
  ComplaintTypeScreenOptions,
} from '../screens/ComplaintTypeScreen';
import SettingScreen, {SettingScreenOptions} from '../screens/SettingScreen';
import NotifScreen, {NotifScreenOptions} from '../screens/NotifScreen';
import Colors from '../utils/Colors';

const screenOptionStack = {
  headerStyle: {
    backgroundColor: Colors.PrimaryBackground,
  },
  headerTintColor: Colors.White,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const DashboardStack = createStackNavigator();
const OperationalStack = createStackNavigator();
const ComplaintTypeStack = createStackNavigator();
const ComplaintStack = createStackNavigator();
const SettingStack = createStackNavigator();
const NotifStact = createStackNavigator();

export const DashboardStackScreen = () => (
  <DashboardStack.Navigator screenOptions={screenOptionStack}>
    <DashboardStack.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={DashboardScreenOptions}
    />
  </DashboardStack.Navigator>
);

export const OperationalStackScreen = () => (
  <OperationalStack.Navigator screenOptions={screenOptionStack}>
    <OperationalStack.Screen
      name="Dashboard"
      component={OperationalTypeScreen}
      options={OperationalTypeScreenOptions}
    />
  </OperationalStack.Navigator>
);

export const ComplaintTypeStackScreen = () => (
  <ComplaintTypeStack.Navigator screenOptions={screenOptionStack}>
    <ComplaintTypeStack.Screen
      name="ComplaintType"
      component={ComplaintTypeScreen}
      options={ComplaintTypeScreenOptions}
    />
  </ComplaintTypeStack.Navigator>
);

export const NotifStactScreen = () => (
  <NotifStact.Navigator screenOptions={screenOptionStack}>
    <NotifStact.Screen
      name="Notif"
      component={NotifScreen}
      options={NotifScreenOptions}
    />
  </NotifStact.Navigator>
);

export const ComplaintStackScreen = () => (
  <ComplaintStack.Navigator screenOptions={screenOptionStack}>
    <ComplaintStack.Screen
      name="Complaint"
      component={ComplaintScreen}
      options={ComplaintScreenOptions}
    />
  </ComplaintStack.Navigator>
);

export const SettingStackScreen = () => (
  <SettingStack.Navigator screenOptions={screenOptionStack}>
    <SettingStack.Screen
      name="Setting"
      component={SettingScreen}
      options={SettingScreenOptions}
    />
  </SettingStack.Navigator>
);
