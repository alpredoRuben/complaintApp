import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import DashboardScreen, {
  DashboardScreenOptions,
} from '../screens/DashboardScreen';

import ComplaintTypeScreen, {
  ComplaintTypeScreenOptions,
} from '../screens/ComplaintTypeScreen';

import InfoScreen, {InfoScreenOptions} from '../screens/InfoScreen';
import ProfileScreen, {ProfileScreenOptions} from '../screens/ProfileScreen';
import NotifScreen, {NotifScreenOptions} from '../screens/NotifScreen';
import ComplaintScreen, {
  ComplaintScreenOptions,
} from '../screens/ComplaintScreen';
import AddComplaintScreen, {
  AddComplaintScreenOptions,
} from '../screens/AddComplaintScreen';
import Colors from '../utils/Colors';

// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

// function getHeaderTitle(route) {
//   const routeName = getFocusedRouteNameFromRoute(route) ?? 'ComplaintScreen';

//   switch (routeName) {
//     case 'ComplaintScreen':
//       return 'Data Pengaduan';
//     case 'AddComplaintScreen':
//       return 'Form Buat Pengaduan';
//     case 'Feed':
//       return 'Feedback';
//   }
// }

// const Tab = createMaterialTopTabNavigator();

const optionScreen = {
  headerStyle: {
    backgroundColor: Colors.PrimaryBackground,
  },
  headerTintColor: Colors.White,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const DashboardStack = createStackNavigator();
export const DashboardStackScreen = () => {
  return (
    <DashboardStack.Navigator screenOptions={optionScreen}>
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
    <ComplaintTypeStack.Navigator screenOptions={optionScreen}>
      <ComplaintTypeStack.Screen
        name="ComplaintTypeScreen"
        component={ComplaintTypeScreen}
        options={ComplaintTypeScreenOptions}
      />
    </ComplaintTypeStack.Navigator>
  );
};

const InfoStack = createStackNavigator();
export const InfoStackScreen = () => {
  return (
    <InfoStack.Navigator screenOptions={optionScreen}>
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
    <ProfileStack.Navigator screenOptions={optionScreen}>
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
    <NotifStack.Navigator screenOptions={optionScreen}>
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
    <ComplaintStack.Navigator screenOptions={optionScreen}>
      <ComplaintStack.Screen
        name="ComplaintScreen"
        component={ComplaintScreen}
        options={ComplaintScreenOptions}
      />
      <ComplaintStack.Screen
        name="AddComplaintScreen"
        component={AddComplaintScreen}
        options={AddComplaintScreenOptions}
      />
    </ComplaintStack.Navigator>
  );
};
