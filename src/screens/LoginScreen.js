/* eslint-disable no-alert */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useTheme} from 'react-native-paper';

import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import {ImagePNG} from '../assets';
import LoginStyle from './styles/LoginStyle';
import Colors from '../utils/Colors';
import {Input} from '../components';

import {loginAction} from '../store/actions/AuthAction';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_STORAGE_KEY} from '../utils/Config';

const styles = LoginStyle;

export default function LoginScreen(props) {
  const {colors} = useTheme();
  const {user_info, errors} = useSelector((state) => state.userSignIn);

  const dispatch = useDispatch();

  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const [validator, setValidator] = useState({
    boolTextInput: false,
    secureTextEntry: false,
    isValidUsername: true,
    isValidPassword: true,
  });

  const onChangeHandle = (key, value) => {
    setForm({...form, [key]: value});
    if (key === 'password') {
      setValidator({
        ...validator,
        boolTextInput: value.length > 5 ? true : false,
        isValidPassword: value.length > 5 ? true : false,
      });
    } else {
      setValidator({
        ...validator,
        boolTextInput: value.trim().length > 0 ? true : false,
        isValidUsername: value.trim().length > 0 ? true : false,
      });
    }
  };

  const checkAsync = async () => {
    try {
      const storages = await AsyncStorage.getItem(USER_STORAGE_KEY);
      if (storages) {
        //Navigation To
      }
    } catch (err) {}
  };

  useEffect(() => {
    checkAsync();
  });

  useEffect(() => {
    if (user_info) {
      alert('User Info Ready');
      //props.navigation.navigate('homeContainer');
    }

    if (errors) {
      if (errors.status === 422) {
        const errData = errors.data;
        setValidator({
          ...validator,
          isValidUsername: errData.errors.username ? false : true,
          isValidPassword: errData.errors.password ? false : true,
        });
      } else {
        alert(errors.data.message);
      }
    }

    return () => {
      //
    };
  }, [user_info, errors]);

  const onValidUsernameHandle = (value) => {
    setValidator({
      ...validator,
      isValidUsername: value.trim().length > 0 ? true : false,
    });
  };

  const updateSecureTextEntry = () => {
    setValidator({
      ...validator,
      secureTextEntry: !validator.secureTextEntry,
    });
  };

  const onSubmitLogin = (e) => {
    e.preventDefault();
    dispatch(loginAction(form));
  };

  return (
    <View style={[styles.wrapper, styles.container]}>
      <StatusBar
        backgroundColor={Colors.SecondBackground}
        barStyle="light-content"
      />
      <ScrollView
        style={{marginHorizontal: 10}}
        showsVerticalScrollIndicator={false}>
        <Image source={ImagePNG.Login} style={styles.imageLogin} />
        <Animatable.View
          animation="fadeInUpBig"
          style={[
            styles.footer,
            {
              backgroundColor: colors.background,
            },
          ]}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>Silahkan Login Dengan Akun Anda</Text>

          <View style={styles.simetrisRL}>
            {/* USERNAME */}
            <Text
              style={[
                styles.textLable,
                {
                  color: colors.text,
                },
              ]}>
              Username
            </Text>

            <View style={styles.action}>
              <FontAwesome name="user-o" color={colors.text} size={20} />
              <Input
                placeholder="Masukkan Username"
                autoCapitalize="none"
                value={form.username}
                onChangeText={(val) => onChangeHandle('username', val)}
                onEndEditing={(e) => onValidUsernameHandle(e.nativeEvent.text)}
              />
              {validator.boolTextInput ? (
                <Animatable.View animation="bounceIn">
                  <Feather name="check-circle" color="green" size={20} />
                </Animatable.View>
              ) : null}
            </View>

            {validator.isValidUsername ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>
                  {errors.data.errors.username[0]}
                </Text>
              </Animatable.View>
            )}

            {/* PASSWORD */}
            <Text
              style={[
                styles.textLable,
                {
                  color: colors.text,
                },
              ]}>
              Password
            </Text>
            <View style={styles.action}>
              <FontAwesome name="lock" color={colors.text} size={20} />
              <TextInput
                placeholder="Masukkan Password"
                placeholderTextColor="#666666"
                secureTextEntry={validator.secureTextEntry ? true : false}
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
                autoCapitalize="none"
                onChangeText={(val) => onChangeHandle('password', val)}
              />
              <TouchableOpacity onPress={updateSecureTextEntry}>
                {validator.secureTextEntry ? (
                  <Feather name="eye-off" color="grey" size={20} />
                ) : (
                  <Feather name="eye" color="grey" size={20} />
                )}
              </TouchableOpacity>
            </View>

            {validator.isValidPassword ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>
                  {errors.data.errors.password[0]}
                </Text>
              </Animatable.View>
            )}

            <TouchableOpacity>
              <Text style={{color: '#009387', marginTop: 15}}>
                Forgot password?
              </Text>
            </TouchableOpacity>

            <View style={styles.button}>
              <TouchableOpacity style={styles.signIn} onPress={onSubmitLogin}>
                <LinearGradient
                  colors={[Colors.Cyan, Colors.DarkCyan]}
                  style={styles.signIn}>
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: Colors.White,
                      },
                    ]}>
                    Login
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </Animatable.View>
      </ScrollView>
    </View>
  );
}
