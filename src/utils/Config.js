const API_HOST = '192.168.43.168';
const API_PORT = '8000';
const SOCKET_HOST = '192.168.43.168';
const SOCKET_PORT = '9099';

// const API_HOST = '110.232.86.214';
// const API_PORT = '80';
// const SOCKET_HOST = '110.232.86.214';
// const SOCKET_PORT = '9099';

export const APP_NAME = 'My Sukamulia';

export const REACT_NATIVE_API_URL =
  'http://' + API_HOST + ':' + API_PORT + '/api';
export const SOCKET_IO_URL = 'http://' + SOCKET_HOST + ':' + SOCKET_PORT;

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
