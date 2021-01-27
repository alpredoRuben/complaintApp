export const REACT_NATIVE_API_URL = 'http://192.168.43.168:8000/api';
export const SOCKET_IO_URL = 'http://192.168.43.168:8005';

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
});
