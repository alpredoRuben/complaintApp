import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

export default function SplashScreen(props) {
  return (
    <View style={styles.container}>
      <Text>Splash Screen</Text>
      <Button
        title="Go To Login"
        onPress={() => props.navigation.navigate('Login')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
