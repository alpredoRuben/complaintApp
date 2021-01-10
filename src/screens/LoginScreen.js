import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

export default function LoginScreen(props) {
  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <Button
        title="Go To Dashboard"
        onPress={() => props.navigation.navigate('container')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
