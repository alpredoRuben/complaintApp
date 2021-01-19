import React from 'react';
import {View, Text} from 'react-native';
import {ToggleHeader} from '../../components';

function InfoScreen(props) {
  return (
    <View>
      <Text>Info Screen</Text>
    </View>
  );
}

export const optionInfo = (props) => ({
  headerTitle: 'Informasi Pengaduan',
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

export default InfoScreen;
