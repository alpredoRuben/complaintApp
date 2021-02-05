/* eslint-disable no-unused-vars */
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
import Api from '../utils/Api';
import {setTotalNotif, resetTotalNotif} from '../actions';
import {StackActions} from '@react-navigation/native';

const CHN = STATIC_EVENT_CHANNEL();
const Drawer = createDrawerNavigator();

export default function MainNavigation() {
  const {userInfo} = useSelector((state) => state.AuthReducer);
  const [isable, setIsable] = React.useState(true);
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

    setIsable(false);
  };

  const onShowNotification = (option) => {
    PushNotification.localNotification(option);
    PushNotification.cancelLocalNotifications({id: option.id});
    setIsable(true);
  };

  React.useEffect(() => {
    if (!userInfo) {
      navigators.navigation.navigate('SplashScreen');
    }

    if (isable === true) {
      fetchNotification();
    }

    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        setIsable(true);
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

    //Complaint
    socket.on(
      `${CHN.complaint.channelName}:${CHN.complaint.eventName}`,
      (message) => {
        if (userInfo.user.id == message.receiveData) {
          const mobileNotif = message.mobileNotif;

          onShowNotification({
            id: mobileNotif.id,
            title: 'Info Pengaduan Baru',
            message: mobileNotif.messages,
            date: new Date(Date.now() + 10),
          });
        }
      },
    );

    //Assigned Complaint
    socket.on(
      `${CHN.assignedComplaint.channelName}:${CHN.assignedComplaint.eventName}`,
      (message) => {
        if (userInfo.user.id == message.receiveData) {
          console.log(`CHANNEL ${CHN.assignedComplaint.channelName}`, message);
          const mobileNotif = message.mobileNotif;

          onShowNotification({
            id: mobileNotif.id,
            title: 'Konfirmasi dan Penugasan Pengaduan',
            message: mobileNotif.messages,
            date: new Date(Date.now() + 10),
          });
        }
      },
    );

    //Start Working
    socket.on(
      `${CHN.assignedWorkingComplaint.channelName}:${CHN.assignedWorkingComplaint.eventName}`,
      (message) => {
        console.log('Start Working', message);
        const filters = message.receiveData.filter(
          (item) => item == userInfo.user.id,
        );

        if (filters.length > 0 && filters[0] == userInfo.user.id) {
          const mobileNotif = message.mobileNotif;
          onShowNotification({
            id: mobileNotif.id,
            title: 'Pengaduan Diterima dan Dikerjakan',
            message: mobileNotif.messages,
            date: new Date(Date.now() + 10),
          });
        }
      },
    );

    //Read Notification
    socket.on(
      `${CHN.readNotification.channelName}:${CHN.readNotification.eventName}`,
      (message) => {
        console.log('Read Notification', message);
        if (userInfo.user.id == message.receiveData) {
          setIsable(true);
        }
      },
    );

    return () => {};
  }, [isable]);

  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        navigators = props;
        return <DrawerContent {...props} />;
      }}>
      {drawerRoutes.map((item, index) => (
        <Drawer.Screen
          key={`DR-${index}`}
          name={item.name}
          component={item.component}
        />
      ))}
    </Drawer.Navigator>
  );
}
