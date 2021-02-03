import React from 'react';
import {StyleSheet, Dimensions, Platform} from 'react-native';
import Colors from '../../utils/Colors';

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  //Login Screen
  flexOne: {
    flex: 1,
  },

  setMargin: (n) => ({margin: n}),

  coverImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },

  splashContainer: {
    flex: 1,
    backgroundColor: Colors.PrimaryBackground,
  },
  splashLogoCover: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashLogo: {
    width: height_logo,
    height: height_logo,
  },
  splashTitleCover: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },

  splashTitle: {
    color: '#05375a',
    fontSize: 24,
    fontWeight: 'bold',
  },
  splashText: {
    color: 'grey',
    marginTop: 5,
  },
  splashButtonCover: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  splashLogin: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  splashLoginText: {
    color: 'white',
    fontWeight: 'bold',
  },

  //Login
  horizonMargin: (n) => ({
    marginHorizontal: n,
  }),

  loginContainer: {backgroundColor: Colors.White, height: '100%', padding: 5},
  loginImage: {width: 300, height: 250, marginHorizontal: 10},

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

  loginTextLabel: {
    color: '#05375a',
    fontSize: 18,
  },
  loginFormGroup: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },

  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  loginErrorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },

  loginCoverButton: {
    alignItems: 'center',
    marginTop: 20,
  },

  loginButton: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  forgotPassword: {color: '#009387', marginTop: 15},
});

export default styles;
