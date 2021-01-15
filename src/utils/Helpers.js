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

const replaced = (l, v) => {
  return {label: l, value: v};
};

export const generateDropDownPicker = (data, labelName, valueName) => {
  var newData = [];
  for (let i = 0; i < data.length; i++) {
    const element = replaced(data[i][labelName], data[i][valueName]);
    newData.push(element);
  }
};
