import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Avatar, Title, Caption, Drawer} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import defineRoute from './defineRoute';
import Colors from '../../utils/Colors';

export default function DrawerContent(props) {
  const signOut = () => {
    defineRoute.map((item, index) => {
      console.log({icon: item.icon, name: item.name});
    });
  };

  return (
    <View style={styles.drawerContent}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={styles.avatarCover}>
              <Avatar.Image
                source={{
                  uri: 'https://api.adorable.io/avatars/50/abott@adorable.png',
                }}
                size={50}
              />
              <View style={styles.avatarTitle}>
                <Title style={styles.title}>Razor XDo</Title>
                <Caption style={styles.caption}>Pegawai</Caption>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            {defineRoute.map((item, index) => {
              return (
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
              );
            })}
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>

      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="ios-trail-sign-outline" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => signOut()}
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
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
