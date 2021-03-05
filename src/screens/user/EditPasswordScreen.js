/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import {Button, ActivityIndicator, Colors, Checkbox} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {ToggleHeader} from '../../components';
import Api from '../../utils/Api';
import Authorization from '../../utils/Authorization';
import {logoutAction} from '../../actions';

export default function EditPasswordScreen(props) {
  const {userInfo} = useSelector((state) => state.AuthReducer);
  const [user, setUser] = React.useState({
    password: '',
    password_confirmation: '',
  });
  const [secureText, setSecureText] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();

  const onChangeTextInputHandler = (key, value) => {
    setUser({
      ...user,
      [key]: value,
    });
  };

  const onChangeSecureTextHandler = () => {
    setSecureText(!secureText);
  };

  const apiChangePassword = async () => {
    try {
      const {data, status} = await Api.post(
        'users/change/password',
        user,
        Authorization(userInfo.token),
      );

      console.log('Change Password Response', data);
      if (status === 200) {
        Alert.alert('Berhasil', data.message, [
          {
            text: 'OK',
            onPress: () => dispatch(logoutAction()),
          },
        ]);
      }
    } catch (err) {
      console.log(err.response);
      const errors = err.response;
      if (errors.status === 422) {
        Alert.alert(
          'OPPSS.. GAGAL',
          errors.data.message + '. Please check value of others field',
          [
            {
              text: 'OK',
              onPress: () => console.log('PRESS OK'),
            },
          ],
        );
      }
    }
  };

  const onSubmitHandler = () => {
    console.log('SecurText', secureText);
    console.log('User data', user);
    apiChangePassword();
  };

  React.useEffect(() => {
    setLoading(false);
    return () => {};
  }, [loading]);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator animating={true} color={Colors.red800} />
      </View>
    );
  }

  return (
    <View style={{flex: 1, marginHorizontal: 10, marginVertical: 10}}>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        {/* NEW PASSWORD */}
        <View style={styles.formGroup}>
          <Text style={styles.textLabel}>Password Baru Anda</Text>
          <TextInput
            style={styles.textInput}
            value={user.password}
            secureTextEntry={secureText}
            onChangeText={(text) => onChangeTextInputHandler('password', text)}
          />
        </View>

        {/* CONFIRM PASSWORD */}
        <View style={styles.formGroup}>
          <Text style={styles.textLabel}>Konfirmasi Password Baru Anda</Text>
          <TextInput
            style={styles.textInput}
            value={user.password_confirmation}
            secureTextEntry={secureText}
            onChangeText={(text) =>
              onChangeTextInputHandler('password_confirmation', text)
            }
          />
        </View>

        {/* CHECKBOX SHOW PASSWORD TEXT */}
        <View style={styles.formGroup}>
          <View style={{flexDirection: 'row'}}>
            <Checkbox
              status={secureText ? 'unchecked' : 'checked'}
              onPress={onChangeSecureTextHandler}
            />
            <Text style={{marginTop: 10}}>Lihat Password</Text>
          </View>
        </View>

        {/* BUTTON SUBMIT */}
        <View style={styles.formGroup}>
          <Button
            style={styles.buttonSave}
            mode="contained"
            onPress={onSubmitHandler}>
            Ubah dan Simpan
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

export const optionEditPassword = (props) => ({
  headerTitle: 'Form Ubah Password',
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
    color: '#0b46a3',
  },
  textInput: {
    height: 40,
    borderColor: '#c1cad6',
    borderWidth: 1,
    paddingHorizontal: 15,
    fontSize: 12,
  },
  buttonSave: {
    justifyContent: 'center',
    backgroundColor: '#0718ad',
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
  },
});
