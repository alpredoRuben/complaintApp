import React from 'react';
import {View, Text} from 'react-native';
import {ToggleHeader} from '../../components';

function DashboardScreen(props) {
  return (
    <View>
      <Text>Dashboard Screen</Text>
    </View>
  );
}

export const optionDashboard = (props) => ({
  headerTitle: 'Dashboard',
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

export default DashboardScreen;
