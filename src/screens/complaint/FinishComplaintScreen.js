import React from 'react';
import {View, Text} from 'react-native';
import {ToggleHeader} from '../../components';

export default function FinishComplaintScreen(props) {
  return (
    <View>
      <Text>Finished Complaint Screen</Text>
    </View>
  );
}

export const optionFinishComplaint = (props) => ({
  headerTitle: 'Lapor Pekerjaan Selesai',
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
