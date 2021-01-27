/* eslint-disable react-native/no-inline-styles */
// import React from 'react';
// import {useSelector} from 'react-redux';
// import {AuthNavigation, MainNavigation} from './navigations';

// function Mains(props) {
//   const {userInfo} = useSelector((state) => state.AuthReducer);

//   console.log(userInfo);
//   return userInfo && userInfo !== null ? (
//     <MainNavigation />
//   ) : (
//     <AuthNavigation />
//   );
// }

// export default Mains;

import React from 'react';
import {View, Text, Button} from 'react-native';
import PushNotification from 'react-native-push-notification';

export default function Main() {
  const showNotif = () => {
    console.log('Click to show notification');
    PushNotification.localNotification({
      title: 'First Notification',
      message: 'This is a first notification',
    });
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Hello</Text>
      <Button title="Click Me" onPress={showNotif} />
    </View>
  );
}
