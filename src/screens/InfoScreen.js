import React from 'react';
import {View, Text} from 'react-native';
import CustomMenuButton from '../components/CustomMenuButton';

export default function InfoScreen(props) {
  return (
    <View>
      <Text>Info Scree</Text>
    </View>
  );
}

export const InfoScreenOptions = (navdata) => {
  return {
    headerTitle: 'Informasi Pengaduan',
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
