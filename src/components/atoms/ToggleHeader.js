import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../utils/Colors';

function ToggleHeader(props) {
  return (
    <Icon.Button size={25} backgroundColor={Colors.FaceColorTheme} {...props} />
  );
}

export default ToggleHeader;
