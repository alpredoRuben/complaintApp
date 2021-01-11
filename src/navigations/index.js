import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthNavigation from './AuthNavigation';
import MainNavigation from './MainNavigation';
import {USER_STORAGE_KEY} from '../utils/Config';

export default function Navigations() {
  return <MainNavigation />;
  // const [isLogin, setIsLogin] = useState(false);

  // const checkAsync = async () => {
  //   try {
  //     const storages = await AsyncStorage.getItem(USER_STORAGE_KEY);
  //     if (storages) {
  //       setIsLogin(true);
  //     }
  //   } catch (err) {}
  // };

  // useEffect(() => {
  //   checkAsync();
  // });

  // return isLogin ? <MainNavigation /> : <AuthNavigation />;
}
