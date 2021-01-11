import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import DashboardScreen, {
  DashboardScreenOptions,
} from '../screens/DashboardScreen';

import ComplaintTypeScreen, {
  ComplaintTypeScreenOptions,
} from '../screens/ComplaintTypeScreen';

import OperationalTypeScreen, {
  OperationalTypeScreenOptions,
} from '../screens/OperationalTypeScreen';

import InfoScreen, {InfoScreenOptions} from '../screens/InfoScreen';
import ProfileScreen, {ProfileScreenOptions} from '../screens/ProfileScreen';
import NotifScreen, {NotifScreenOptions} from '../screens/NotifScreen';
import ComplaintScreen, {
  ComplaintScreenOptions,
} from '../screens/ComplaintScreen';

const DashboardStack = createStackNavigator();
export const DashboardStackScreen = () => {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={DashboardScreenOptions}
      />
    </DashboardStack.Navigator>
  );
};

const ComplaintTypeStack = createStackNavigator();
export const ComplaintTypeStackScreen = () => {
  return (
    <ComplaintTypeStack.Navigator>
      <ComplaintTypeStack.Screen
        name="ComplaintTypeScreen"
        component={ComplaintTypeScreen}
        options={ComplaintTypeScreenOptions}
      />
    </ComplaintTypeStack.Navigator>
  );
};

const OperationalTypeStack = createStackNavigator();
export const OperationalTypeStackScreen = () => {
  return (
    <OperationalTypeStack.Navigator>
      <OperationalTypeStack.Screen
        name="OperationalTypeScreen"
        component={OperationalTypeScreen}
        options={OperationalTypeScreenOptions}
      />
    </OperationalTypeStack.Navigator>
  );
};

const InfoStack = createStackNavigator();
export const InfoStackScreen = () => {
  return (
    <InfoStack.Navigator>
      <InfoStack.Screen
        name="InfoScreen"
        component={InfoScreen}
        options={InfoScreenOptions}
      />
    </InfoStack.Navigator>
  );
};

const ProfileStack = createStackNavigator();
export const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={ProfileScreenOptions}
      />
    </ProfileStack.Navigator>
  );
};

const NotifStack = createStackNavigator();
export const NotifStackScreen = () => {
  return (
    <NotifStack.Navigator>
      <NotifStack.Screen
        name="NotifScreen"
        component={NotifScreen}
        options={NotifScreenOptions}
      />
    </NotifStack.Navigator>
  );
};

const ComplaintStack = createStackNavigator();
export const ComplaintStackScreen = () => {
  return (
    <ComplaintStack.Navigator>
      <ComplaintStack.Screen
        name="ComplaintScreen"
        component={ComplaintScreen}
        options={ComplaintScreenOptions}
      />
    </ComplaintStack.Navigator>
  );
};
