/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Avatar, Title, Caption, Drawer} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../utils/Colors';
import {UserAvatarPNG} from '../../assets';
import {useSelector, useDispatch} from 'react-redux';
import {logoutAction, resetTotalNotif} from '../../actions';
import {CommonActions} from '@react-navigation/native';

function DrawerContent(props) {
  const {userInfo} = useSelector((state) => state.AuthReducer);
  const {total} = useSelector((state) => state.SetTotalNotification);
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(resetTotalNotif());
    dispatch(logoutAction());
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <View style={styles.drawerContent}>
      <DrawerContentScrollView>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={styles.avatarCover}>
              {userInfo.user.profile != null &&
              userInfo.user.profile.thumbnail != null ? (
                <Avatar.Image
                  source={{uri: userInfo.user.profile.thumbnail}}
                  size={60}
                />
              ) : (
                <Avatar.Image source={UserAvatarPNG} size={60} />
              )}

              <View style={styles.avatarTitle}>
                <Title style={styles.title(userInfo.user.name.length)}>
                  {userInfo ? userInfo.user.name : 'No Name'}
                </Title>
                <Caption style={styles.caption}>
                  {userInfo
                    ? capitalizeFirstLetter(userInfo.user.roles[0].alias)
                    : 'No Position'}
                  {userInfo.user.roles[0].slug !== 'admin' &&
                    userInfo.user.roles[0].slug !== 'customer' &&
                    ' - ' + capitalizeFirstLetter(userInfo.user.roles[0].name)}
                </Caption>
              </View>
            </View>
          </View>
          <Drawer.Section style={[styles.drawerSection, {margin: 0}]}>
            {/* Item Menu Dashboard */}
            <DrawerItem
              activeTintColor={Colors.PrimaryTransparancy}
              label={({color}) => <Text style={{color}}>Dashboard</Text>}
              icon={({color, size}) => (
                <Icon name="home-outline" size={size} color={color} />
              )}
              onPress={() => props.navigation.navigate('DashboardScreen')}
            />

            {/* Item Menu Pengaduan */}
            <DrawerItem
              activeTintColor={Colors.PrimaryTransparancy}
              label={({color}) => <Text style={{color}}>Pengaduan</Text>}
              icon={({color, size}) => (
                <Icon name="clipboard-outline" size={size} color={color} />
              )}
              onPress={() =>
                props.navigation.navigate('ComplaintStackScreen', {
                  screen: 'ComplaintScreen',
                })
              }
            />

            {/* Menu Inventory */}
            {userInfo.user.roles[0].slug.toLowerCase() !== 'pegawai' && (
              <DrawerItem
                activeTintColor={Colors.PrimaryTransparancy}
                label={({color}) => <Text style={{color}}>Inventaris</Text>}
                icon={({color, size}) => (
                  <Icon name="list-circle-outline" size={size} color={color} />
                )}
                onPress={() =>
                  props.navigation.navigate('InventoryStackScreen', {
                    screen: 'ProductScreen',
                    params: {
                      complaintId: undefined,
                    },
                  })
                }
              />
            )}

            {/* Item Menu Notification */}
            <DrawerItem
              activeTintColor={Colors.PrimaryTransparancy}
              label={({color}) =>
                total > 0 ? (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      padding: 10,
                    }}>
                    <View style={{width: '85%'}}>
                      <Text style={{color}}>Notifikasi</Text>
                    </View>
                    <View
                      style={{
                        width: '10%',
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: total > 0 ? 'red' : 'white',
                        paddingHorizontal: 2,
                        borderRadius: 10,
                      }}>
                      <Text style={{color: 'white'}}>{total}</Text>
                    </View>
                  </View>
                ) : (
                  <Text style={{color}}>Notifikasi</Text>
                )
              }
              icon={({color, size}) => (
                <Icon name="notifications" size={size} color={color} />
              )}
              onPress={() =>
                props.navigation.dispatch(
                  CommonActions.navigate('NotifStackScreen', {
                    screen: 'NotifScreen',
                  }),
                )
              }
            />

            {/* Item Menu Pengaturan */}
            {userInfo.user.roles[0].slug.toLowerCase() === 'admin' && (
              <DrawerItem
                activeTintColor={Colors.PrimaryTransparancy}
                label={({color}) => <Text style={{color}}>Pengaturan</Text>}
                icon={({color, size}) => (
                  <Icon name="settings-outline" size={size} color={color} />
                )}
                onPress={() =>
                  props.navigation.navigate('SettingStackScreen', {
                    screen: 'SettingScreen',
                  })
                }
              />
            )}
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="ios-trail-sign-outline" color="white" size={size} />
          )}
          label="Logout"
          labelStyle={{color: 'white', fontWeight: 'bold'}}
          onPress={() => {
            signOut();
          }}
        />
      </Drawer.Section>
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
  title: (len) => ({
    fontSize: len <= 12 ? 14 : 12,
    marginTop: 3,
    fontWeight: 'bold',
  }),
  caption: (len) => ({
    fontSize: len <= 12 ? 14 : 12,
    lineHeight: 10,
  }),
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
