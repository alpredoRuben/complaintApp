import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Colors from '../../utils/Colors';
import {
  DashboardScreen,
  ProfileScreen,
  NotifScreen,
  InfoScreen,
  TypeComplaintScreen,
  ComplaintScreen,
  AddComplaintScreen,
  DetailNotificationScreen,
  optionDashboard,
  optionProfile,
  optionNotif,
  optionInfo,
  optionTypeComplaint,
  optionComplaint,
  optionAddComplaint,
  optionDetailNotification,
} from '../../screens';

const navigatorScreenOption = () => ({
  headerStyle: {
    backgroundColor: Colors.PrimaryBackground,
  },
  headerTintColor: Colors.White,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
});
const DashboardStack = createStackNavigator();
const InfoStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const NotifStack = createStackNavigator();
const TypeComplaintStack = createStackNavigator();
const ComplaintStack = createStackNavigator();

/** Dashboard Stack Screen */
export function DashboardStackScreen() {
  return (
    <DashboardStack.Navigator screenOptions={navigatorScreenOption}>
      <DashboardStack.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={optionDashboard}
      />
    </DashboardStack.Navigator>
  );
}

/** Info Stack Screen */
export const InfoStackScreen = () => {
  return (
    <InfoStack.Navigator screenOptions={navigatorScreenOption}>
      <InfoStack.Screen
        name="InfoScreen"
        component={InfoScreen}
        options={optionInfo}
      />
    </InfoStack.Navigator>
  );
};

/** Profile Stack Screen */
export const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator screenOptions={navigatorScreenOption}>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={optionProfile}
      />
    </ProfileStack.Navigator>
  );
};

/** Notification Screen */
export const NotifStackScreen = () => {
  return (
    <NotifStack.Navigator screenOptions={navigatorScreenOption}>
      <NotifStack.Screen
        name="NotifScreen"
        component={NotifScreen}
        options={optionNotif}
      />
      <NotifStack.Screen
        name="DetailNotificationScreen"
        component={DetailNotificationScreen}
        options={optionDetailNotification}
      />
    </NotifStack.Navigator>
  );
};

/** Type Complaint Screen */
export const TypeComplaintStackScreen = () => {
  return (
    <TypeComplaintStack.Navigator screenOptions={navigatorScreenOption}>
      <TypeComplaintStack.Screen
        name="TypeComplaintScreen"
        component={TypeComplaintScreen}
        options={optionTypeComplaint}
      />
    </TypeComplaintStack.Navigator>
  );
};

/** Complaint Screen */
export const ComplaintStackScreen = () => {
  return (
    <ComplaintStack.Navigator screenOptions={navigatorScreenOption}>
      <ComplaintStack.Screen
        name="ComplaintScreen"
        component={ComplaintScreen}
        options={optionComplaint}
      />
      <ComplaintStack.Screen
        name="AddComplaintScreen"
        component={AddComplaintScreen}
        options={optionAddComplaint}
      />
    </ComplaintStack.Navigator>
  );
};
