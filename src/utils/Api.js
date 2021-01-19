import axios from 'axios';
import {REACT_NATIVE_API_URL} from '../utils/Config';

const fetchHeader = () => {
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  return headers;
};

const Api = axios.create({
  baseURL: REACT_NATIVE_API_URL,
  timeout: 31000,
  headers: fetchHeader(),
});

export default Api;
