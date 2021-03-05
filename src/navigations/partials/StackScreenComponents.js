import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Colors from '../../utils/Colors';
import {
  DashboardScreen,
  ProfileScreen,
  EditProfileScreen,
  optionEditProfile,
  NotifScreen,
  InfoScreen,
  ComplaintScreen,
  AddComplaintScreen,
  optionDashboard,
  optionProfile,
  optionNotif,
  optionInfo,
  optionComplaint,
  optionAddComplaint,
  DetailNotificationScreen,
  optionDetailNotification,
  DetailComplaintScreen,
  optionDetailComplaint,
  SettingScreen,
  optionSetting,
  FinishComplaintScreen,
  optionFinishComplaint,
  EditPasswordScreen,
  optionEditPassword,
  ProductScreen,
  optionProductScreen,
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
const ComplaintStack = createStackNavigator();
const SettingStack = createStackNavigator();
const NotifStack = createStackNavigator();
const InventoryStack = createStackNavigator();

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

/** Profile Stack Screen */
export const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={navigatorScreenOption}>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={optionProfile}
      />
      <ProfileStack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={optionEditProfile}
      />
      <ProfileStack.Screen
        name="EditPasswordScreen"
        component={EditPasswordScreen}
        options={optionEditPassword}
      />
    </ProfileStack.Navigator>
  );
};

/** Complaint Screen */
export const ComplaintStackScreen = () => {
  return (
    <ComplaintStack.Navigator
      initialRouteName="ComplaintScreen"
      name="ComplaintStackScreen"
      screenOptions={navigatorScreenOption}>
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

      <ComplaintStack.Screen
        name="DetailComplaintScreen"
        component={DetailComplaintScreen}
        options={optionDetailComplaint}
      />
      <ComplaintStack.Screen
        name="FinishComplaintScreen"
        component={FinishComplaintScreen}
        options={optionFinishComplaint}
      />
    </ComplaintStack.Navigator>
  );
};

/** Setting Screen */
export const SettingStackScreen = () => {
  return (
    <SettingStack.Navigator screenOptions={navigatorScreenOption}>
      <SettingStack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={optionSetting}
      />
    </SettingStack.Navigator>
  );
};

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

export const NotifStackScreen = () => {
  return (
    <NotifStack.Navigator
      initialRouteName="NotifScreen"
      screenOptions={navigatorScreenOption}>
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

export const InventoryStackScreen = () => {
  return (
    <InventoryStack.Navigator
      initialRouteName="ProductScreen"
      screenOptions={navigatorScreenOption}>
      <InventoryStack.Screen
        name="ProductScreen"
        component={ProductScreen}
        options={optionProductScreen}
      />
    </InventoryStack.Navigator>
  );
};
