/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Image,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {Button, ActivityIndicator, Colors} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {setUserAction} from '../../actions/AuthAction';
import {ToggleHeader} from '../../components';
import Api from '../../utils/Api';

export default function EditProfileScreen(props) {
  const {userInfo} = useSelector((state) => state.AuthReducer);
  const [userProfile, setUserProfile] = React.useState({
    name: '',
    username: '',
    phone: '',
    email: '',
    identity: '',
    thumbnail: null,
    uriImage: null,
    isChangeThumbnail: false,
  });

  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(true);

  const fetchUserProfile = () => {
    const {user} = userInfo;
    console.log('User from user info', user);
    setUserProfile({
      ...userProfile,
      name: user.name,
      username: user.username,
      phone: user.profile != null && user.profile.phone,
      email: user.profile != null && user.profile.email,
      identity: user.profile != null && user.profile.identity,
    });
    setLoading(false);
  };

  React.useEffect(() => {
    fetchUserProfile();
    return () => {};
  }, []);

  const onChangeTextInputHandler = (key, value) => {
    setUserProfile({
      ...userProfile,
      [key]: value,
    });
  };

  const uploadPhotoHandler = () => {
    setUserProfile({
      ...userProfile,
      isChangeThumbnail: true,
    });

    ImagePicker.showImagePicker(
      {
        title: 'Edit Foto Profile',
        mediaType: 'photo',
        allowsEditing: true,
        maxWidth: 400,
        maxHeight: 300,
        quality: 0.5,
      },
      (response) => {
        console.log('Response from Image Picker Show Image', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          console.log('Response', response);
          setUserProfile({
            ...userProfile,
            thumbnail: {
              name: response.fileName,
              type: response.type,
              uri:
                Platform.OS === 'android'
                  ? response.uri
                  : response.uri.replace('file://', ''),
            },
            isChangeThumbnail: true,
            uriImage: {uri: response.uri},
          });
        }
      },
    );
  };

  const upgradeProfile = async (form_data) => {
    try {
      const {data, status} = await Api.post('profile/user', form_data, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (status === 200) {
        dispatch(setUserAction());
        Alert.alert('Berhasil', data.message, [
          {
            text: 'OK',
            onPress: () =>
              props.navigation.navigate('ProfileStackScreen', {
                screen: 'ProfileScreen',
              }),
          },
        ]);
      }
    } catch (err) {
      console.log(err.response);
      const errors = err.response;
      if (errors.status === 422) {
        Alert.alert(
          'OPPSS.. GAGAL',
          errors.data.message +
            '. Please check value of field username or name',
          [
            {
              text: 'OK',
              onPress: () =>
                props.navigation.navigate('ProfileStackScreen', {
                  screen: 'ProfileScreen',
                }),
            },
          ],
        );
      }
    }
  };

  const saveUserProfile = () => {
    var fdata = new FormData();
    fdata.append('name', userProfile.name);
    fdata.append('email', userProfile.email || null);
    fdata.append('identity', userProfile.identity || null);
    fdata.append('phone', userProfile.phone || null);
    fdata.append('thumbnail', userProfile.thumbnail);
    fdata.append('username', userProfile.username);
    fdata.append('isChangeThumbnail', userProfile.isChangeThumbnail);
    upgradeProfile(fdata);
  };

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator animating={true} color={Colors.red800} />
      </View>
    );
  }

  return (
    <View style={{flex: 1, marginHorizontal: 10, marginVertical: 10}}>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        {/* NIP/NIK/No. Identitas */}
        <View style={styles.formGroup}>
          <Text style={styles.textLabel}>NIP/NIK/No. Identitas</Text>
          <TextInput
            style={styles.textInput}
            value={
              userProfile.identity == '' ? '' : userProfile.identity.toString()
            }
            onChangeText={(text) => onChangeTextInputHandler('identity', text)}
          />
        </View>

        {/* NAMA LENGKAP */}
        <View style={styles.formGroup}>
          <Text style={styles.textLabel}>Nama Lengkap</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(val) => onChangeTextInputHandler('name', val)}
            value={userProfile.name == '' ? '' : userProfile.name.toString()}
          />
        </View>

        {/* USERNAME  */}
        <View style={styles.formGroup}>
          <Text style={styles.textLabel}>Username (Unique User Login)</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(val) => onChangeTextInputHandler('username', val)}
            value={
              userProfile.username == '' ? '' : userProfile.username.toString()
            }
          />
        </View>

        {/* EMAIL */}
        <View style={styles.formGroup}>
          <Text style={styles.textLabel}>Email</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(val) => onChangeTextInputHandler('email', val)}
            value={userProfile.email == '' ? '' : userProfile.email.toString()}
          />
        </View>

        {/* PHONE */}
        <View style={styles.formGroup}>
          <Text style={styles.textLabel}>No. HP/WA/Telepon</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(val) => onChangeTextInputHandler('phone', val)}
            value={userProfile.phone == '' ? '' : userProfile.phone.toString()}
          />
        </View>

        {/* RESULT FOTO */}
        {userProfile.uriImage != null && (
          <View
            style={{
              paddingVertical: 5,
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Image
              resizeMode="cover"
              source={userProfile.uriImage}
              style={{
                width: '100%',
                height: undefined,
                aspectRatio: 1,
              }}
            />
          </View>
        )}

        <View style={styles.formGroup}>
          <Button
            style={styles.buttonUpload}
            mode="contained"
            onPress={uploadPhotoHandler}>
            Browse File
          </Button>
        </View>

        <View style={styles.formGroup}>
          <Button
            style={styles.buttonSave}
            mode="contained"
            onPress={saveUserProfile}>
            Ubah dan Simpan
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

export const optionEditProfile = (props) => ({
  headerTitle: 'Edit Profil Pengguna',
  headerLeft: () => {
    return (
      <ToggleHeader
        name="ios-menu"
        onPress={() => props.navigation.openDrawer()}
      />
    );
  },
  headerTitleStyle: {
    alignSelf: 'center',
  },
});

const styles = StyleSheet.create({
  formGroup: {
    marginVertical: 5,
  },
  textLabel: {
    padding: 5,
    color: Colors.HeadingText,
  },

  textInput: {
    height: 40,
    borderColor: '#c1cad6',
    borderWidth: 1,
    paddingHorizontal: 15,
    fontSize: 12,
  },

  buttonUpload: {
    justifyContent: 'center',
    backgroundColor: '#23c26d',
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
  },

  buttonSave: {
    justifyContent: 'center',
    backgroundColor: '#0718ad',
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
  },
});
