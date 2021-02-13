/* eslint-disable no-unused-vars */
import React from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {ToggleHeader} from '../../components';

export default function EditPasswordScreen(props) {
  const {userInfo} = useSelector((state) => state.AuthReducer);
  return (
    <View>
      <Text>Edit Password</Text>
    </View>
  );
}

export const optionEditPassword = (props) => ({
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
