import axios from 'axios';
import {AsyncStorage} from 'react-native';

const fetchHeader = async () => {
  let token;
  let headers = {Accept: 'application/json'};

  try {
    token = await AsyncStorage.getItem('userToken');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    console.log(e);
  }

  return headers;
};

const Api = axios.create({
  baseURL: REACT_NATIVE_API_URL,
  timeout: 31000,
  headers: fetchHeader(),
});

export default Api