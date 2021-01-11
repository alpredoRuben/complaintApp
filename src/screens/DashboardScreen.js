import React from 'react';
import {View, Text} from 'react-native';
import {CustomMenuButton} from '../components';

export default function DashboardScreen(props) {
  return (
    <View>
      <Text>Dashboard Screen</Text>
    </View>
  );
}

export const DashboardScreenOptions = (navdata) => {
  return {
    headerTitle: 'Dashboard',
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
