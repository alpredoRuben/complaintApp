import React from 'react';
import {View, Text} from 'react-native';
import {CustomMenuButton} from '../components';

export default function OperationalTypeScreen(props) {
  return (
    <View>
      <Text>Operational Type Screen</Text>
    </View>
  );
}

export const OperationalTypeScreenOptions = (navdata) => {
  return {
    headerTitle: 'Jenis Operasional',
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
