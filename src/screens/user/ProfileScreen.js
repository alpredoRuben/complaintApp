import React from 'react';
import {View, Text} from 'react-native';
import {ToggleHeader} from '../../components';

function ProfileScreen(props) {
  return (
    <View>
      <Text>Profile Screen</Text>
    </View>
  );
}

export const optionProfile = (props) => ({
  headerTitle: 'Profile',
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

export default ProfileScreen;
