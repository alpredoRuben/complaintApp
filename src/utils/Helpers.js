import React from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Colors from './Colors';

export const DefaultScreenOptions = {
  headerStyle: {
    backgroundColor: Colors.PrimaryBackground,
  },
  headerTintColor: Colors.White,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

export function MenuToggle(navigation, str) {
  return {
    title: str,
    headerLeft: () => (
      <IonIcon.Button
        name="ios-menu"
        size={25}
        backgroundColor={Colors.PrimaryBackground}
        onPress={() => navigation.openDrawer()}
      />
    ),
  };
}
