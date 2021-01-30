/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import io from 'socket.io-client';
import DrawerContent from './partials/DrawerContent';
import {useSelector} from 'react-redux';
import {userRoutes, adminRoutes} from './drawerRoutes';
import {SOCKET_IO_URL, STATIC_EVENT_CHANNEL} from '../utils/Config';
import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';

const CHN = STATIC_EVENT_CHANNEL();
const Drawer = createDrawerNavigator();

export default function MainNavigation() {
  const {userInfo} = useSelector((state) => state.AuthReducer);
  let navigators;

  const onShowNotification = (option) => {
    console.log('push notification', option);
    PushNotification.localNotification(option);
  };

  const setupPushNotification = (cancelId) => {
    PushNotification.configure({
      onNotification: function (notification) {
        console.log('Notification', notification);
        navigators.navigation.navigate('NotifScreen', {
          screen: 'DetailNotificationScreen',
          params: {
            id: notification.id,
          },
        });
      },
      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
    });

    PushNotification.cancelLocalNotifications({id: cancelId});
  };

  useEffect(() => {
    if (!userInfo) {
      navigators.navigation.navigate('SplashScreen');
    }

    const socket = io(SOCKET_IO_URL);

    //Complaint
    socket.on(
      `${CHN.complaint.channelName}:${CHN.complaint.eventName}`,
      (message) => {
        if (userInfo.user.id == message.receiveData) {
          const mobileNotif = message.mobileNotif;

          setupPushNotification(mobileNotif.id);

          onShowNotification({
            id: mobileNotif.id,
            title: 'Info Pengaduan Baru',
            message: JSON.parse(mobileNotif.data).message,
            data: {type: mobileNotif.type, receiver: message.receiveData},
          });
        }
      },
    );

    //Assigned Complaint
    socket.on(
      `${CHN.assignedComplaint.channelName}:${CHN.assignedComplaint.eventName}`,
      (message) => {
        console.log('userinfo', userInfo.user.id);
        console.log('receive data', message.receiveData);

        if (userInfo.user.id == message.receiveData) {
          console.log(`CHANNEL ${CHN.assignedComplaint.channelName}`, message);
          const mobileNotif = message.mobileNotif;
          setupPushNotification(mobileNotif.id);

          onShowNotification({
            id: mobileNotif.id,
            title: 'Konfirmasi dan Penugasan Pengaduan',
            message: JSON.parse(mobileNotif.data).message,
            data: {type: mobileNotif.type, receiver: message.receiveData},
          });
        }
      },
    );

    //Start Working
    socket.on(
      `${CHN.assignedWorkingComplaint.channelName}:${CHN.assignedWorkingComplaint.eventName}`,
      (message) => {
        const filters = message.receiveData.filter(
          (item) => item == userInfo.user.id,
        );

        if (filters.length > 0 && filters[0] == userInfo.user.id) {
          const mobileNotif = message.mobileNotif;
          setupPushNotification(mobileNotif.id);
          onShowNotification({
            id: mobileNotif.id,
            title: 'Pengaduan Diterima dan Dikerjakan',
            message: JSON.parse(mobileNotif.data).message,
            data: {type: mobileNotif.type, receiver: message.receiveData},
          });
        }
      },
    );

    return () => {};
  }, []);

  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        navigators = props;
        return <DrawerContent {...props} />;
      }}>
      {userInfo.user.roles[0].slug.toLowerCase() === 'admin' &&
        adminRoutes.map((item, index) => (
          <Drawer.Screen
            key={`DR-${index}`}
            name={item.name}
            component={item.component}
          />
        ))}

      {userInfo.user.roles[0].slug.toLowerCase() !== 'admin' &&
        userRoutes.map((item, index) => (
          <Drawer.Screen
            key={`DR-${index}`}
            name={item.name}
            component={item.component}
          />
        ))}
    </Drawer.Navigator>
  );
}
