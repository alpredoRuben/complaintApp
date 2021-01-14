/* eslint-disable radix */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';

const {width} = Dimensions.get('window');
const newWidth = parseInt(width / 3) - 10;

const MenuComplaintTypeItem = ({title, onPressHandler}) => {
  const customWidth =
    title.length <= 10
      ? newWidth - 10
      : title.length > 10 && title.length <= 20
      ? newWidth + 50
      : newWidth + 100;
  return (
    <View
      style={[
        styles.container,
        {
          width: customWidth,
        },
      ]}>
      <TouchableOpacity style={styles.button} onPress={onPressHandler}>
        <Text>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    marginVertical: 5,
  },
  button: {
    alignItems: 'center',
    padding: 10,
    borderColor: '#ced5e0',
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.12,
    shadowRadius: 60,
    elevation: 3,
  },
});

export default MenuComplaintTypeItem;
