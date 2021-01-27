/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import io from 'socket.io-client';
import DrawerContent from './partials/DrawerContent';
import {useSelector} from 'react-redux';
import {userRoutes, adminRoutes} from './drawerRoutes';
import {showNotification, showNotificationWithDate} from '../components';
import {SOCKET_IO_URL, STATIC_EVENT_CHANNEL} from '../utils/Config';

const CHN = STATIC_EVENT_CHANNEL();

const Drawer = createDrawerNavigator();

export default function MainNavigation({navigation}) {
  const {userInfo} = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    if (!userInfo) {
      console.log('COMPONENT DID MOUNT USER INFO');
      navigation.navigate('SplashScreen');
    }

    showNotification('Hello', 'This is Notification');

    const socket = io(SOCKET_IO_URL);

    //Complaint
    socket.on(
      `${CHN.complaint.channelName}:${CHN.complaint.eventName}`,
      (message) => {
        console.log('Message', message);
        const {messageNotif, receiverId} = message;
        if (userInfo.user.id === receiverId) {
          showNotificationWithDate('Pengaduan Baru', messageNotif);
        }
      },
    );

    //Assigned Complaint
    socket.on(
      `${CHN.assignedComplaint.channelName}:${CHN.assignedComplaint.eventName}`,
      (message) => {
        console.log('Message', message);
        const {assigned, receiveAssigned, messageNotif} = message;

        if (userInfo.user.id === receiveAssigned) {
          showNotificationWithDate('Pengaduan Disetujui', messageNotif);
        }
      },
    );

    //Start Working
    socket.on(
      `${CHN.assignedWorkingComplaint.channelName}:${CHN.assignedWorkingComplaint.eventName}`,
      (message) => {
        console.log('Message', message);
        const {data, receiveData, messageNotif} = message;
        const filters = receiveData.filter((item) => item == userInfo.user.id);
        if (filters.length > 0) {
          showNotificationWithDate('Pengaduan Dikerjakan', messageNotif);
        }
      },
    );

    return () => {};
  }, []);

  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
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
