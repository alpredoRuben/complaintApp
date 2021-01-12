import React from 'react';
import {
  ComplaintTypeStackScreen,
  NotifStackScreen,
  ComplaintStackScreen,
} from './Stackers';

const Routes = [
  {
    name: 'ComplaintTypeScreen',
    component: ComplaintTypeStackScreen,
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
