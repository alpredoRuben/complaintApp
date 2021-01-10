import React from 'react';
import {View, Text} from 'react-native';
import CustomMenuButton from '../components/CustomMenuButton';

export default function ComplaintTypeScreen(props) {
  return (
    <View>
      <Text>Complaint Type Screen</Text>
    </View>
  );
}

export const ComplaintTypeScreenOptions = (navdata) => {
  return {
    headerTitle: 'Jenis Pengaduan',
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
