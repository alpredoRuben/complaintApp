import React from 'react';
import {StyleSheet, Platform} from 'react-native';
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
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
});

export default Input;
