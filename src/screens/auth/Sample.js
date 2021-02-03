/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useTheme} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import Colors from '../../utils/Colors';
import styles from './styles';
import {Input} from '../../components';
import {LoginPNG} from '../../assets';
import {useSelector, useDispatch} from 'react-redux';
import {loginAction} from '../../actions';

function LoginScreen(props) {
  const {colors} = useTheme();

  //Redux
  const {userInfo, errors} = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  //State
  const [form, setForm] = useState({
    username: '',
    password: '',
    secureTextEntry: false,
  });

  const updateSecureTextEntry = () => {
    setForm({
      ...form,
      secureTextEntry: !form.secureTextEntry,
    });
  };

  const onChangeHandle = (key, value) => {
    setForm({...form, [key]: value});
  };

  const onSubmitLogin = () => {
    console.log('VALUE OF FORM ', form);
    dispatch(loginAction(form));
  };

  const checkAuth = () => {
    if (userInfo && userInfo !== null) {
      props.navigation.navigate('DashboardDrawer');
    }

    if (errors && errors !== null) {
      const errData = errors.data;
      console.log('ERROR RESPONSE', errData);
      Alert.alert('LOGIN FAILED', errData.message);
    }
  };

  useEffect(() => {
    checkAuth();
    return () => {};
  }, [userInfo, errors]);

  return (
    <View style={styles.loginContainer}>
      <StatusBar
        backgroundColor={Colors.SecondBackground}
        barStyle="light-content"
      />
      <ScrollView
        style={styles.horizonMargin(10)}
        showsVerticalScrollIndicator={false}>
        <Image source={LoginPNG} style={styles.loginImage} />
        <Animatable.View
          animation="fadeInUpBig"
          style={[
            styles.footer,
            {
              backgroundColor: colors.background,
            },
          ]}>
          <Text style={styles.loginTitle}>Login</Text>
          <Text style={styles.loginSubtitle}>
            Silahkan Login Dengan Akun Anda
          </Text>

          <View style={styles.horizonMargin(10)}>
            <Text
              style={[
                styles.loginTextLabel,
                {
                  color: colors.text,
                },
              ]}>
              Username
            </Text>

            <View style={styles.loginFormGroup}>
              <FontAwesome name="user-o" color={colors.text} size={20} />
              <Input
                placeholder="Masukkan Username"
                autoCapitalize="none"
                value={form.username}
                onChangeText={(val) => onChangeHandle('username', val)}
              />
            </View>

            {/* PASSWORD */}
            <Text
              style={[
                styles.loginTextLabel,
                {
                  color: colors.text,
                },
              ]}>
              Password
            </Text>
            <View style={styles.loginFormGroup}>
              <FontAwesome name="lock" color={colors.text} size={20} />
              <Input
                placeholder="Masukkan Password"
                placeholderTextColor="#666666"
                secureTextEntry={form.secureTextEntry ? true : false}
                autoCapitalize="none"
                onChangeText={(val) => onChangeHandle('password', val)}
              />
              <TouchableOpacity onPress={updateSecureTextEntry}>
                {form.secureTextEntry ? (
                  <Feather name="eye-off" color="grey" size={20} />
                ) : (
                  <Feather name="eye" color="grey" size={20} />
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot password?</Text>
            </TouchableOpacity>

            <View style={styles.loginCoverButton}>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={onSubmitLogin}>
                <LinearGradient
                  colors={[Colors.Cyan, Colors.DarkCyan]}
                  style={styles.loginButton}>
                  <Text
                    style={[
                      styles.loginButtonText,
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

export default LoginScreen;
