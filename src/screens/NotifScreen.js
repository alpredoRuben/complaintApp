import React from 'react';
import {View, Text} from 'react-native';
import CustomMenuButton from '../components/CustomMenuButton';

export default function NotifScreen(props) {
  return (
    <View>
      <Text>Notif Screen</Text>
    </View>
  );
}

export const NotifScreenOptions = (navdata) => {
  return {
    headerTitle: 'List Notifikasi',
    headerLeft: () => {
      return (
        <CustomMenuButton
          name="ios-menu"
          onPress={() => navdata.navigation.openDrawer()}
        />
      );
    },
    headerTitleStyle: {
      alignSelf: 'center',
    },
  };
};
