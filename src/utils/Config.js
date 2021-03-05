// const API_HOST = '125.213.155.94';
// const API_PORT = '8888';

// const SOCKET_HOST = '125.213.155.94';
// const SOCKET_PORT = '4433';

const API_HOST = '192.168.43.168';
const API_PORT = '8000';

const SOCKET_HOST = '192.168.43.168';
const SOCKET_PORT = '8005';

export const REACT_NATIVE_API_URL =
  'http://' + API_HOST + ':' + API_PORT + '/api';
export const SOCKET_IO_URL = 'http://' + SOCKET_HOST + ':' + SOCKET_PORT;

// export const REACT_NATIVE_API_URL = 'http://192.168.1.15:8000/api'; //Host BOBO
// export const SOCKET_IO_URL = 'http://192.168.1.15:8005'; //Socket Bobo

export const STATIC_EVENT_CHANNEL = () => ({
  complaintEventChannel: {
    channelName: 'complaint-channel',
    eventName: 'ComplaintEvent',
  },
  assignedComplaintEventChannel: {
    channelName: 'assign-complaint-channel',
    eventName: 'AssignedComplaintEvent',
  },
  startWorkingComplaintEventChannel: {
    channelName: 'start-work-complaint-channel',
    eventName: 'StartWorkComplaintEvent',
  },
  finishedWorkingComplaintEventChannel: {
    channelName: 'finished-work-complaint-channel',
    eventName: 'FinishWorkComplaintEvent',
  },
  notificationEventChannel: {
    channelName: 'notification-channel',
    eventName: 'NotificationEvent',
  },
});
