import React from 'react';
import {View, Text} from 'react-native';
import {ToggleHeader} from '../../components';

function SettingScreen(props) {
  return (
    <View>
      <Text>Info Screen</Text>
    </View>
  );
}

export const optionSetting = (props) => ({
  headerTitle: 'Pengaturan',
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

export default SettingScreen;
