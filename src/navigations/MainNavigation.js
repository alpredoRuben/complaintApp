import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from './partials/DrawerContent';
import {useSelector} from 'react-redux';
import {userRoutes, adminRoutes} from './drawerRoutes';

const Drawer = createDrawerNavigator();

export default function MainNavigation() {
  const {userInfo} = useSelector((state) => state.AuthReducer);
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
