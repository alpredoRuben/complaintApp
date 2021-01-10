import React from 'react';
import {View, Text} from 'react-native';
import CustomMenuButton from '../components/CustomMenuButton';

export default function ProfileScreen(props) {
  return (
    <View>
      <Text>Profile Screen</Text>
    </View>
  );
}

export const ProfileScreenOptions = (navdata) => {
  return {
    headerTitle: 'Profil Pengguna',
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
