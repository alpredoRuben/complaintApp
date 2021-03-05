/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import io from 'socket.io-client';
import DrawerContent from './partials/DrawerContent';
import {useSelector, useDispatch} from 'react-redux';
import drawerRoutes from './drawerRoutes';
import {SOCKET_IO_URL, STATIC_EVENT_CHANNEL} from '../utils/Config';
import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';
import Authorization from '../utils/Authorization';
import {setTotalNotif} from '../actions';
import Api from '../utils/Api';

const CHN = STATIC_EVENT_CHANNEL();
const Drawer = createDrawerNavigator();

export default function MainNavigation() {
  const {userInfo} = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  let navigators;

  const fetchNotification = async () => {
    try {
      const {data, status} = await Api.get(
        'mobile_notifications/count/unread',
        Authorization(userInfo.token),
      );

      if (status === 200) {
        const total = data.total;
        dispatch(setTotalNotif(total));
      }
    } catch (err) {
      //dispatch(resetTotalNotif());
    }
  };

  const onShowNotification = (option) => {
    fetchNotification();
    PushNotification.localNotification(option);
    PushNotification.cancelLocalNotifications({id: option.id});
  };

  React.useEffect(() => {
    if (!userInfo) {
      navigators.navigation.navigate('SplashScreen');
    }

    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);

        navigators.navigation.navigate('NotifStackScreen', {
          screen: 'DetailNotificationScreen',
          params: {
            id: notification.id,
          },
        });
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

    const socket = io(SOCKET_IO_URL);

    /** COMPLAINT EVENT CHANNEL */
    socket.on(
      `${CHN.complaintEventChannel.channelName}:${CHN.complaintEventChannel.eventName}`,
      (message) => {
        console.log(
          `EVENT CHANNEL ${CHN.complaintEventChannel.channelName}`,
          message,
        );

        if (userInfo.user.id == message.receiveData) {
          onShowNotification({
            id: message.mobileNotif.id,
            title: 'Info Pengaduan Baru',
            message: message.mobileNotif.messages,
            date: new Date(Date.now() + 10),
          });
        }
      },
    );

    /** ASSIGNED EVENT CHANNEL */
    socket.on(
      `${CHN.assignedComplaintEventChannel.channelName}:${CHN.assignedComplaintEventChannel.eventName}`,
      (message) => {
        console.log(
          `EVENT CHANNEL ${CHN.assignedComplaintEventChannel.channelName}`,
          message,
        );

        if (userInfo.user.id == message.receiveData) {
          onShowNotification({
            id: message.mobileNotif.id,
            title: 'Konfirmasi dan Penugasan Pengaduan',
            message: message.mobileNotif.messages,
            date: new Date(Date.now() + 10),
          });
        }
      },
    );

    /** START WORKING EVENT CHANNEL */
    socket.on(
      `${CHN.startWorkingComplaintEventChannel.channelName}:${CHN.startWorkingComplaintEventChannel.eventName}`,
      (message) => {
        console.log(
          `EVENT CHANNEL ${CHN.startWorkingComplaintEventChannel.channelName}`,
          message,
        );

        const filters = message.receiveData.filter(
          (item) => item == userInfo.user.id,
        );

        if (filters.length > 0 && filters[0] == userInfo.user.id) {
          onShowNotification({
            id: message.mobileNotif.id,
            title: 'Pengaduan Diterima dan Dikerjakan',
            message: message.mobileNotif.messages,
            date: new Date(Date.now() + 10),
          });
        }
      },
    );

    /** START WORKING EVENT CHANNEL */
    socket.on(
      `${CHN.finishedWorkingComplaintEventChannel.channelName}:${CHN.finishedWorkingComplaintEventChannel.eventName}`,
      (message) => {
        console.log(
          `EVENT CHANNEL ${CHN.finishedWorkingComplaintEventChannel.channelName}`,
          message,
        );

        const filters = message.receiveData.filter(
          (item) => item == userInfo.user.id,
        );

        if (filters.length > 0 && filters[0] == userInfo.user.id) {
          onShowNotification({
            id: message.mobileNotif.id,
            title: 'Pekerjaan selesai dan sudah dilapor',
            message: message.mobileNotif.messages,
            date: new Date(Date.now() + 10),
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
      {drawerRoutes.map((item, index) => {
        return item.notUser &&
          item.notUser == userInfo.user.roles[0].slug.toLowerCase() ? null : (
          <Drawer.Screen
            key={`DR-${index}`}
            name={item.name}
            component={item.component}
          />
        );
      })}
    </Drawer.Navigator>
  );
}
