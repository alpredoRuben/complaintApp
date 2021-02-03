import React from 'react';
import {StyleSheet, Platform} from 'react-native';
import {colors} from 'react-native-elements';
import {TextInput} from 'react-native-gesture-handler';
import Colors from '../../utils/Colors';

const Input = ({...rest}) => {
  return (
    <TextInput
      placeholderTextColor={Colors.DefaultText}
      style={[
        styles.textInput,
        {
          color: Colors.DarkGray,
        },
      ]}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    paddingLeft: 10,
    height: 45,
    color: '#05375a',
  },
});

export default Input;
