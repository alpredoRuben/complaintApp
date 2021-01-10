import React from 'react';
import {View, Text} from 'react-native';
import CustomMenuButton from '../components/CustomMenuButton';

export default function ComplaintScreen(props) {
  return (
    <View>
      <Text>Complaint Screen</Text>
    </View>
  );
}

export const ComplaintScreenOptions = (navdata) => {
  return {
    headerTitle: 'Pengaduan',
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
