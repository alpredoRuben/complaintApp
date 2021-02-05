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
  complaint: {
    channelName: 'complaint-channel',
    eventName: 'App\\Events\\ComplaintsEvent',
  },
  assignedComplaint: {
    channelName: 'assign-complaint',
    eventName: 'App\\Events\\AssignedComplaintEvent',
  },
  assignedWorkingComplaint: {
    channelName: 'assign-working-complaint',
    eventName: 'App\\Events\\AssignedWorkingComplaintEvent',
  },
  readNotification: {
    channelName: 'read-notification-channel',
    eventName: 'App\\Events\\ReadNotificationEvent',
  },
});
