/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {UserAvatarPNG} from '../../assets';

export default function ProfileScreen(props) {
  const {userInfo} = useSelector((state) => state.AuthReducer);

  const editUserProfileHandler = () => {
    props.navigation.push('EditProfileScreen');
  };

  const editPasswordUserHandler = () => {
    props.navigation.push('EditPasswordScreen');
  };

  return (
    <View style={styles.flexOne}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.flexOne}>
        {/* TOP */}
        <View style={styles.topCover}>
          <View style={styles.topImageCover}>
            {userInfo.user.profile != null &&
            userInfo.user.profile.thumbnail != null ? (
              <Image
                style={styles.imageAvatar}
                source={{uri: userInfo.user.profile.thumbnail}}
              />
            ) : (
              <Image style={styles.imageAvatar} source={UserAvatarPNG} />
            )}

            <View style={styles.topCoverText}>
              <Text style={styles.textTitle}>{userInfo.user.name}</Text>
              <View style={styles.marginLeftRight(40, 40)}>
                <Text style={styles.textSubtitle}>
                  {userInfo.user.roles[0].name}
                </Text>
              </View>
            </View>

            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={styles.coverButtonEdit}
                onPress={editUserProfileHandler}>
                <Icon
                  name="user-edit"
                  type="font-awesome-5"
                  color="white"
                  size={15}
                />
                <Text style={styles.textButtonEdit}>Edit Profil</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.coverButtonEdit}
                onPress={editPasswordUserHandler}>
                <Icon
                  name="key"
                  type="font-awesome-5"
                  color="white"
                  size={15}
                />
                <Text style={styles.textButtonEdit}>Edit Password</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* MIDDLE, BOTTOM */}
        <View style={{padding: 5}}>
          {userInfo.user.profile != null && (
            <>
              {/* USERNAME toggle-on */}
              {userInfo.user.username != '' &&
              userInfo.user.username != null ? (
                <View style={styles.coverDetail}>
                  <View style={styles.widthly('10%')}>
                    <Icon
                      name="user"
                      type="font-awesome-5"
                      color="#006ead"
                      size={18}
                    />
                  </View>
                  <View style={styles.widthly('80%')}>
                    <Text style={styles.textDetail}>
                      {userInfo.user.username}
                    </Text>
                  </View>
                </View>
              ) : null}

              {/* IDENTITY */}
              {userInfo.user.profile.identity != '' &&
              userInfo.user.profile.identity != null ? (
                <View style={styles.coverDetail}>
                  <View style={styles.widthly('10%')}>
                    <Icon
                      name="id-card-alt"
                      type="font-awesome-5"
                      color="#006ead"
                      size={18}
                    />
                  </View>
                  <View style={styles.widthly('80%')}>
                    <Text style={styles.textDetail}>
                      {userInfo.user.profile.identity}
                    </Text>
                  </View>
                </View>
              ) : null}

              {/* EMAIL */}
              {userInfo.user.profile.email != '' &&
              userInfo.user.profile.email != null ? (
                <View style={styles.coverDetail}>
                  <View style={styles.widthly('10%')}>
                    <Icon
                      name="envelope"
                      type="font-awesome-5"
                      color="#006ead"
                      size={18}
                    />
                  </View>
                  <View style={styles.widthly('80%')}>
                    <Text style={styles.textDetail}>
                      {userInfo.user.profile.email}
                    </Text>
                  </View>
                </View>
              ) : null}

              {/* PHONE */}
              {userInfo.user.profile.phone != '' &&
              userInfo.user.profile.phone != null ? (
                <View style={styles.coverDetail}>
                  <View style={styles.widthly('10%')}>
                    <Icon
                      name="phone"
                      type="font-awesome-5"
                      color="#006ead"
                      size={18}
                    />
                  </View>
                  <View style={styles.widthly('80%')}>
                    <Text style={styles.textDetail}>
                      {userInfo.user.profile.phone}
                    </Text>
                  </View>
                </View>
              ) : null}
            </>
          )}

          {/* STATUS USER */}
          <View style={styles.coverDetail}>
            <View style={styles.widthly('10%')}>
              <Icon
                name="toggle-on"
                type="font-awesome-5"
                color="#006ead"
                size={18}
              />
            </View>
            <View style={styles.widthly('80%')}>
              <Text style={styles.textDetail}>Sedang Aktif</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  flexOne: {flex: 1},
  marginLeftRight: (left, right) => ({
    marginLeft: left,
    marginRight: right,
  }),
  topCover: {
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
    marginTop: 15,
  },

  topImageCover: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 12,
  },

  imageAvatar: {
    borderRadius: 80,
    height: 140,
    marginBottom: 10,
    width: 140,
  },

  topCoverText: {
    marginBottom: 10,
  },

  textTitle: {
    color: '#5B5A5A',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  textSubtitle: {
    color: 'gray',
    fontSize: 13.5,
    textAlign: 'center',
  },

  coverButtonEdit: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: '#4f6f7d',
    borderColor: '#648491',
    borderRadius: 10,
    borderWidth: 1,
  },

  textButtonEdit: {color: 'white', marginLeft: 5},

  coverDetail: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginVertical: 10,
  },

  textDetail: {fontSize: 15, color: '#415f70'},
  widthly: (n) => ({width: n, alignItem: 'center'}),
});
