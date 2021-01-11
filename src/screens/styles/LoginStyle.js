import React from 'react';
import {StyleSheet, Platform} from 'react-native';
import Colors from '../../utils/Colors';

const LoginStyle = StyleSheet.create({
  wrapper: {padding: 5},
  container: {backgroundColor: Colors.White, height: '100%'},
  imageLogin: {width: 300, height: 250, marginHorizontal: 10},
  title: {
    fontSize: 28,
    fontFamily: 'bold',
    alignSelf: 'center',
  },
  subtitle: {
    fontFamily: 'SemiBold',
    marginHorizontal: 40,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 10,
    opacity: 0.4,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  textLable: {
    color: '#05375a',
    fontSize: 18,
  },

  simetrisRL: {marginHorizontal: 10},
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },

  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },

  button: {
    alignItems: 'center',
    marginTop: 20,
  },

  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginStyle;
