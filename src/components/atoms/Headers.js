/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import ToggleHeader from './ToggleHeader';
import Carts from './Carts';

const Headers = (props, title) => {
  return {
    headerTitle: () => (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
          {title}
        </Text>
      </View>
    ),
    headerLeft: () => {
      return (
        <ToggleHeader
          name="ios-menu"
          onPress={() => props.navigation.openDrawer()}
        />
      );
    },
    headerRight: () => <Carts {...props} />,
    headerTitleStyle: {
      alignSelf: 'center',
    },
  };
};

export default Headers;
