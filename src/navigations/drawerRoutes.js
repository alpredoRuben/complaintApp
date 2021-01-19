import BottomTabNavigator from './partials/BottomTabNavigator';
import {
  TypeComplaintStackScreen,
  ComplaintStackScreen,
  NotifStackScreen,
} from './partials/StackScreenComponents';

export const adminRoutes = [
  {
    name: 'DashboardDrawer',
    component: BottomTabNavigator,
    roles: 'all',
  },
  {
    name: 'TypeComplaintScreen',
    component: TypeComplaintStackScreen,
    roles: 'admin',
  },
  {
    name: 'ComplaintScreen',
    component: ComplaintStackScreen,
    roles: 'all',
  },
  {
    name: 'NotifScreen',
    component: NotifStackScreen,
    roles: 'all',
  },
];

export const userRoutes = [
  {
    name: 'DashboardDrawer',
    component: BottomTabNavigator,
    roles: 'all',
  },
  {
    name: 'ComplaintScreen',
    component: ComplaintStackScreen,
    roles: 'all',
  },
  {
    name: 'NotifScreen',
    component: NotifStackScreen,
    roles: 'all',
  },
];
