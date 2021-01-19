import React from 'react';
import {View, Text} from 'react-native';
import {ToggleHeader} from '../../components';

function NotifScreen(props) {
  return (
    <View>
      <Text>Notif Screen</Text>
    </View>
  );
}

export const optionNotif = (props) => ({
  headerTitle: 'List Notifikasi',
  headerLeft: () => {
    return (
      <ToggleHeader
        name="ios-menu"
        onPress={() => props.navigation.openDrawer()}
      />
    );
  },
  headerTitleStyle: {
    alignSelf: 'center',
  },
});

export default NotifScreen;
