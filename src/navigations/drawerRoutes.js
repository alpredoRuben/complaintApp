import BottomTabNavigator from './partials/BottomTabNavigator';
import {
  ComplaintStackScreen,
  SettingStackScreen,
  InfoStackScreen,
  NotifStackScreen,
  InventoryStackScreen,
} from './partials/StackScreenComponents';

const drawerRoutes = [
  {
    name: 'DashboardScreen',
    component: BottomTabNavigator,
    roles: 'all',
  },
  {
    name: 'ComplaintStackScreen',
    component: ComplaintStackScreen,
    roles: 'all',
  },
  {
    name: 'SettingStackScreen',
    component: SettingStackScreen,
    roles: 'all',
  },
  {
    name: 'InfoStackScreen',
    component: InfoStackScreen,
    roles: 'all',
  },
  {
    name: 'NotifStackScreen',
    component: NotifStackScreen,
    roles: 'all',
  },
  {
    name: 'InventoryStackScreen',
    component: InventoryStackScreen,
    roles: 'all',
    notUser: 'customer',
  },
];

export default drawerRoutes;
