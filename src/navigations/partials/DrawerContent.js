/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Avatar, Title, Caption, Drawer} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import {adminRoutes, defaultRoutes} from '../routes';
import Colors from '../../utils/Colors';
import {UserAvatarPNG} from '../../assets';
import {useSelector, useDispatch} from 'react-redux';
import {} from '../../actions';
import {logout} from '../../actions/AuthAction';

function DrawerContent(props) {
  const {userInfo} = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  return (
    <View style={styles.drawerContent}>
      <DrawerContentScrollView>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={styles.avatarCover}>
              <Avatar.Image source={UserAvatarPNG} size={50} />
              <View style={styles.avatarTitle}>
                <Title style={styles.title}>
                  {userInfo ? userInfo.user.name : 'No Name'}
                </Title>
                <Caption style={styles.caption}>
                  {userInfo ? userInfo.user.roles[0].name : 'No Position'}
                </Caption>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            {userInfo.user.roles[0].slug.toLowerCase() === 'admin' &&
              adminRoutes.map((item, index) => (
                <DrawerItem
                  key={`DI-${index}`}
                  activeTintColor={Colors.PrimaryTransparancy}
                  label={({color}) => (
                    <Text style={{color}}>{item.drawerLabel}</Text>
                  )}
                  icon={({color, size}) => (
                    <Icon name={item.drawerIcon} size={size} color={color} />
                  )}
                  onPress={() => {
                    props.navigation.navigate(item.routeName);
                  }}
                />
              ))}

            {userInfo.user.roles[0].slug.toLowerCase() !== 'admin' &&
              defaultRoutes.map((item, index) => (
                <DrawerItem
                  key={`DI-${index}`}
                  activeTintColor={Colors.PrimaryTransparancy}
                  label={({color}) => (
                    <Text style={{color}}>{item.drawerLabel}</Text>
                  )}
                  icon={({color, size}) => (
                    <Icon name={item.drawerIcon} size={size} color={color} />
                  )}
                  onPress={() => {
                    props.navigation.navigate(item.routeName);
                  }}
                />
              ))}
          </Drawer.Section>
        </View>
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="ios-trail-sign-outline" color="white" size={size} />
            )}
            label="Logout"
            labelStyle={{color: 'white', fontWeight: 'bold'}}
            onPress={() => {
              dispatch(logout());
              props.navigation.navigate('SplashScreen');
            }}
          />
        </Drawer.Section>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  avatarCover: {flexDirection: 'row', marginTop: 15},
  avatarTitle: {marginLeft: 15, flexDirection: 'column'},
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
    backgroundColor: 'red',
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default DrawerContent;
