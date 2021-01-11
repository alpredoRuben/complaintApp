import Api from '../../utils/Api';
import {USER_LOGIN} from '../Constanta';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_STORAGE_KEY} from '../../utils/Config';

const storeData = async (data) => {
  try {
    const str = JSON.stringify(data);
    await AsyncStorage.setItem(USER_STORAGE_KEY, str);
  } catch (err) {
    console.log(err);
  }
};

export const loginAction = (form) => async (dispatch) => {
  try {
    const {data, status} = await Api.post('/login', form);

    if (data.token && status === 200) {
      storeData({token: data.token});
      dispatch({type: USER_LOGIN.SUCCESS, payload: data});
    } else {
      dispatch({type: USER_LOGIN.FAILED, payload: {status, data}});
    }
  } catch (err) {
    console.log(err.response);
    const {data, status} = err.response;
    if (status === 422) {
      dispatch({type: USER_LOGIN.FAILED, payload: {status, data}});
    }
  }
};
