import axios from 'axios';
import {REACT_NATIVE_API_URL} from '../utils/Config';

const Api = axios.create({
  baseURL: REACT_NATIVE_API_URL,
  timeout: 31000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default Api;
