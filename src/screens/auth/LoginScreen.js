/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useTheme, Snackbar} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import Colors from '../../utils/Colors';
import {LoginPNG} from '../../assets';
import {Input} from '../../components';
import Api from '../../utils/Api';
import {useSelector, useDispatch} from 'react-redux';
import {
  successLoginAction,
  failedLoginAction,
  logoutAction,
} from '../../actions';

function LoginScreen(props) {
  const {userInfo, errors} = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const [form, setForm] = useState({
    username: '',
    password: '',
    securedEyes: true,
  });
  const [visible, setVisible] = useState(false);

  const updateSecuredEyes = () => {
    setForm({...form, securedEyes: !form.securedEyes});
  };

  const changeHandler = (key, value) => {
    setForm({...form, [key]: value});
  };

  const loginPost = async (user) => {
    try {
      const {data, status} = await Api.post('/login', form);
      if (status === 200) {
        dispatch(successLoginAction(data));
      }
    } catch (err) {
      console.log('ini error', err.response);
      const {data, status} = err.response;

      if (status === 422) {
        dispatch(failedLoginAction({data, status}));
      }

      if (status === 400) {
        dispatch(failedLoginAction({data, status}));
      }

      setVisible(true);
    }
  };

  const submitLoginHandler = () => {
    loginPost(form);
  };

  const onDismissSnackBar = () => {
    setVisible(false);
  };

  useEffect(() => {
    dispatch(logoutAction());
    return () => {};
  }, []);

  return (
    <SafeAreaView style={styles.flexOne}>
      <StatusBar
        backgroundColor={Colors.PrimaryBackground}
        barStyle="light-content"
      />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.flexOne}>
        <View style={styles.setMargin(10)}>
          <View style={styles.coverImage}>
            <Image source={LoginPNG} style={styles.image} />
          </View>

          <View style={styles.flexOne}>
            <Animatable.View
              animation="fadeInUpBig"
              style={styles.setMarginTop(5)}>
              <Text style={styles.textHeader}>Login</Text>
              <Text style={styles.textSubHeader}>
                Silahkan Login Dengan Akun Anda
              </Text>
            </Animatable.View>

            {/* USERNAME */}
            <View style={styles.formGroup}>
              <View style={styles.formCoverIcon('10%')}>
                <FontAwesome name="user-o" color={colors.text} size={20} />
              </View>
              <View style={styles.setWidth('90%')}>
                <Input
                  placeholder="Masukkan Username"
                  autoCapitalize="none"
                  value={form.username}
                  onChangeText={(val) => changeHandler('username', val)}
                />
              </View>
            </View>

            {errors !== null &&
              errors.status === 422 &&
              errors.data.errors.username && (
                <Animatable.View
                  animation="fadeInLeft"
                  duration={500}
                  style={{marginTop: 3, marginLeft: 3}}>
                  <Text style={styles.errorMessage}>
                    {errors.data.errors.username[0]}
                  </Text>
                </Animatable.View>
              )}

            {/* PASSWORD */}
            <View style={styles.formGroup}>
              <View style={styles.formCoverIcon('10%')}>
                <FontAwesome name="lock" color={colors.text} size={20} />
              </View>
              <View style={styles.setWidth('80%')}>
                <Input
                  placeholder="Masukkan Password"
                  placeholderTextColor="#666666"
                  secureTextEntry={form.securedEyes}
                  autoCapitalize="none"
                  onChangeText={(val) => changeHandler('password', val)}
                />
              </View>
              <View style={styles.formCoverIcon('10%')}>
                <TouchableOpacity onPress={updateSecuredEyes}>
                  {form.securedEyes ? (
                    <Feather name="eye-off" color="grey" size={20} />
                  ) : (
                    <Feather name="eye" color="grey" size={20} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            {errors !== null &&
              errors.status === 422 &&
              errors.data.errors.password && (
                <Animatable.View
                  animation="fadeInLeft"
                  duration={500}
                  style={{marginTop: 3, marginLeft: 3}}>
                  <Text style={styles.errorMessage}>
                    {errors.data.errors.password[0]}
                  </Text>
                </Animatable.View>
              )}

            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Lupa Sandi (Password) ?</Text>
            </TouchableOpacity>

            <View style={styles.formGroup}>
              <TouchableOpacity
                style={styles.coverButton}
                onPress={() => submitLoginHandler()}>
                <LinearGradient
                  colors={[Colors.Cyan, Colors.DarkCyan]}
                  style={styles.coverButton}>
                  <Text
                    style={[
                      styles.textButton,
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
        </View>
      </ScrollView>
      {errors !== null && (
        <Snackbar
          visible={visible}
          style={{backgroundColor: 'red'}}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'Tutup',
            onPress: () => {
              onDismissSnackBar();
            },
          }}>
          {errors.data.message}
        </Snackbar>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },

  setMargin: (n) => ({margin: n}),
  setMarginTop: (n) => ({marginTop: n}),
  setWidth: (w) => ({width: w}),

  coverImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },

  image: {height: 250, width: '100%'},

  textHeader: {
    fontSize: 28,
    fontFamily: 'bold',
    alignSelf: 'center',
  },
  textSubHeader: {
    fontFamily: 'SemiBold',
    marginHorizontal: 40,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
    opacity: 0.5,
  },

  formGroup: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },

  formCoverIcon: (w) => ({
    width: w,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }),

  forgotPassword: {color: '#009387', marginTop: 15},

  coverButton: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  textButton: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  errorMessage: {
    color: '#73050a',
    fontSize: 10,
    fontStyle: 'italic',
  },
});

export default LoginScreen;
