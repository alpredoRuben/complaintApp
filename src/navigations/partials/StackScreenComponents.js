import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Headers} from '../../components';

import Colors from '../../utils/Colors';
import {
  DashboardScreen,
  ProfileScreen,
  EditProfileScreen,
  NotifScreen,
  InfoScreen,
  ComplaintScreen,
  AddComplaintScreen,
  DetailNotificationScreen,
  DetailComplaintScreen,
  SettingScreen,
  FinishComplaintScreen,
  EditPasswordScreen,
  ProductScreen,
  DetailCartScreen,
} from '../../screens';

const navigatorScreenOption = () => ({
  headerStyle: {
    backgroundColor: Colors.FaceColorTheme,
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
export function DashboardStackScreen(props) {
  return (
    <DashboardStack.Navigator screenOptions={navigatorScreenOption}>
      <DashboardStack.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={Headers(props, 'DASHBOARD')}
      />
    </DashboardStack.Navigator>
  );
}

/** Profile Stack Screen */
export const ProfileStackScreen = (props) => {
  return (
    <ProfileStack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={navigatorScreenOption}>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={Headers(props, 'PROFIL')}
      />
      <ProfileStack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={Headers(props, 'EDIT PROFIL')}
      />
      <ProfileStack.Screen
        name="EditPasswordScreen"
        component={EditPasswordScreen}
        options={Headers(props, 'FORM UBAH PASSWORD')}
      />
    </ProfileStack.Navigator>
  );
};

/** Complaint Screen */
export const ComplaintStackScreen = (props) => {
  return (
    <ComplaintStack.Navigator
      initialRouteName="ComplaintScreen"
      name="ComplaintStackScreen"
      screenOptions={navigatorScreenOption}>
      <ComplaintStack.Screen
        name="ComplaintScreen"
        component={ComplaintScreen}
        options={Headers(props, 'LIST DATA PENGADUAN')}
      />
      <ComplaintStack.Screen
        name="AddComplaintScreen"
        component={AddComplaintScreen}
        options={Headers(props, 'FORM PENGADUAN')}
      />

      <ComplaintStack.Screen
        name="DetailComplaintScreen"
        component={DetailComplaintScreen}
        options={Headers(props, 'DETAIL PENGADUAN')}
      />
      <ComplaintStack.Screen
        name="FinishComplaintScreen"
        component={FinishComplaintScreen}
        options={Headers(props, 'FORM LAPORAN PEKERJAAN')}
      />
    </ComplaintStack.Navigator>
  );
};

/** Setting Screen */
export const SettingStackScreen = (props) => {
  return (
    <SettingStack.Navigator screenOptions={navigatorScreenOption}>
      <SettingStack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={Headers(props, 'PENGATURAN')}
      />
    </SettingStack.Navigator>
  );
};

/** Info Stack Screen */
export const InfoStackScreen = (props) => {
  return (
    <InfoStack.Navigator screenOptions={navigatorScreenOption}>
      <InfoStack.Screen
        name="InfoScreen"
        component={InfoScreen}
        options={Headers(props, 'INFORMASI PENGADUAN')}
      />
    </InfoStack.Navigator>
  );
};

export const NotifStackScreen = (props) => {
  return (
    <NotifStack.Navigator
      initialRouteName="NotifScreen"
      screenOptions={navigatorScreenOption}>
      <NotifStack.Screen
        name="NotifScreen"
        component={NotifScreen}
        options={Headers(props, 'LIST NOTIFIKASI')}
      />
      <NotifStack.Screen
        name="DetailNotificationScreen"
        component={DetailNotificationScreen}
        options={Headers(props, 'NOTIFIKASI')}
      />
    </NotifStack.Navigator>
  );
};

export const InventoryStackScreen = (props) => {
  return (
    <InventoryStack.Navigator
      initialRouteName="ProductScreen"
      screenOptions={navigatorScreenOption}>
      <InventoryStack.Screen
        name="ProductScreen"
        component={ProductScreen}
        options={Headers(props, 'LIST BARANG')}
      />
      <InventoryStack.Screen
        name="DetailCartScreen"
        component={DetailCartScreen}
        options={Headers(props, 'FORM PEMESANAN BARANG')}
      />
    </InventoryStack.Navigator>
  );
};
