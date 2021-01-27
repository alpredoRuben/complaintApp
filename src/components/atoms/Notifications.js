import PushNotification from 'react-native-push-notification';
import {NotificationPNG} from '../../assets';

const showNotification = (title, message) => {
  PushNotification.localNotification({
    title,
    message,
    bigLargeIconUrl: NotificationPNG,
  });
};

const showNotificationWithDate = (title, message) => {
  PushNotification.localNotificationSchedule({
    title,
    message,
    bigLargeIconUrl: NotificationPNG,
    date: new Date(Date.now() + 1000),
  });
};

const cancelNotification = () => {
  PushNotification.cancelNotification();
};

const cancelAllNotification = () => {
  PushNotification.cancelAllLocalNotifications();
};

export {
  showNotification,
  showNotificationWithDate,
  cancelAllNotification,
  cancelNotification,
};
