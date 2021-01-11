import React from 'react';
import {
  ComplaintTypeStackScreen,
  OperationalTypeStackScreen,
  NotifStackScreen,
  ComplaintStackScreen,
} from './Stackers';

const Routes = [
  {
    name: 'ComplaintTypeScreen',
    component: ComplaintTypeStackScreen,
  },
  {
    name: 'OperationalTypeScreen',
    component: OperationalTypeStackScreen,
  },
  {
    name: 'NorigScreen',
    component: NotifStackScreen,
  },
  {
    name: 'ComplaintScreen',
    component: ComplaintStackScreen,
  },
];

export default Routes;
