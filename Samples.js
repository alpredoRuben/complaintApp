/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

import PushNotification from 'react-native-push-notification';

export default function Samples(props) {
  const [sources, setSources] = React.useState({
    avatar: null,
    photo: null,
  });

  const getPictures = () => {
    const options = {
      title: 'Select Avatar',
      customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response from Image Picker Show Image', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = {uri: response.uri};

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        setSources({
          avatar: source,
          photo: response.data,
        });
      }
    });
  };

  const showToast = () => {
    console.log('Click Toast');
    PushNotification.localNotificationSchedule({
      message: 'My Notification Message', // (required)
      date: new Date(Date.now() + 60), // in 60 secs
      allowWhileIdle: false,
    });
  };

  React.useEffect(() => {
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);
      },

      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
    });

    return () => {};
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Konsep Koding Upload Gambar</Text>

      <Image
        source={sources.avatar}
        style={{width: '100%', height: 300, margin: 10}}
      />

      <TouchableOpacity
        style={{margin: 10, padding: 10, backgroundColor: 'cyan'}}
        onPress={showToast}>
        <Text style={{color: 'red'}}>Click Toast</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{backgroundColor: 'orange', margin: 10, padding: 10}}
        onPress={getPictures}>
        <Text style={{color: '#fff'}}>Pilih Image</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
