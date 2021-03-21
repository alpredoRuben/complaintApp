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
import {setTotalNotif, getUserCart} from '../actions';
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
    } else {
      if (
        userInfo.user.roles[0].slug != 'admin' &&
        userInfo.user.roles[0].slug != 'customer'
      ) {
        dispatch(getUserCart());
      }
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
        const {roleName, mobileNotif: notifs} = message;

        if (userInfo.user.roles[0].slug == roleName) {
          const filterNotif = notifs.filter(
            (item) => item.receiver_id == userInfo.user.id,
            [],
          );

          if (filterNotif.length > 0) {
            onShowNotification({
              id: filterNotif[0].id,
              title: 'Entry Pengaduan Baru',
              message: filterNotif[0].messages,
              date: new Date(Date.now() + 10),
            });
          }
        }
      },
    );

    /** ASSIGNED EVENT CHANNEL */
    socket.on(
      `${CHN.assignedComplaintEventChannel.channelName}:${CHN.assignedComplaintEventChannel.eventName}`,
      (message) => {
        const {receiveData: receivers, mobileNotif: notifs} = message;
        const filters = receivers.filter(
          (item) => item == userInfo.user.id,
          [],
        );

        if (filters.length > 0) {
          const filterNotif = notifs.filter(
            (item) => item.receiver_id == userInfo.user.id,
            [],
          );
          onShowNotification({
            id: filterNotif[0].id,
            title: 'KONFIRMASI PENGADUAN',
            message: filterNotif[0].messages,
            date: new Date(Date.now() + 10),
          });
        }
      },
    );

    /** START WORKING EVENT CHANNEL */
    socket.on(
      `${CHN.startWorkingComplaintEventChannel.channelName}:${CHN.startWorkingComplaintEventChannel.eventName}`,
      (message) => {
        const {messageNotif: notifs} = message;
        const filterNotif = notifs.filter(
          (item) => item.receiver_id == userInfo.user.id,
          [],
        );

        if (filterNotif.length > 0 && filterNotif[0].id == userInfo.user.id) {
          onShowNotification({
            id: filterNotif[0].id,
            title: 'Pengaduan Diterima dan Dikerjakan',
            message: filterNotif[0].messages,
            date: new Date(Date.now() + 10),
          });
        }
      },
    );

    /** FINISH COMPLAINT EVENT CHANNEL */
    socket.on(
      `${CHN.finishedWorkingComplaintEventChannel.channelName}:${CHN.finishedWorkingComplaintEventChannel.eventName}`,
      (message) => {
        const {receiveData: receivers, mobileNotif: notifs} = message;
        const filters = receivers.filter((item) => item == userInfo.user.id);

        if (filters.length > 0) {
          const filterNotif = notifs.filter(
            (item) => item.receiver_id == userInfo.user.id,
            [],
          );

          if (filterNotif.length > 0) {
            onShowNotification({
              id: filterNotif[0].id,
              title: 'PEKERJAAN SELESAI DAN SUDAH DILAPOR',
              message: filterNotif[0].messages,
              date: new Date(Date.now() + 10),
            });
          }
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
