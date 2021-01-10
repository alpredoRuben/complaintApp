import React from 'react';
import {View, Text} from 'react-native';
import CustomMenuButton from '../components/CustomMenuButton';

export default function SettingScreen(props) {
  return (
    <View>
      <Text>Setting Screen</Text>
    </View>
  );
}

export const SettingScreenOptions = (navdata) => {
  return {
    headerTitle: 'Pengaturan',
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
