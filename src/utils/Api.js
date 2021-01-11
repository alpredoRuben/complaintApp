import axios from 'axios';
import {REACT_NATIVE_API_URL, USER_STORAGE_KEY} from './Config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const fetchHeader = async () => {
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  let storages = await AsyncStorage.getItem(USER_STORAGE_KEY);

  if (storages) {
    const token = JSON.parse(storages).token;
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

const Api = axios.create({
  baseURL: REACT_NATIVE_API_URL,
  timeout: 31000,
  headers: fetchHeader(),
});

export default Api;
