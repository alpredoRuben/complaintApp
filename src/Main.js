import React from 'react';
import {useSelector} from 'react-redux';
import {AuthNavigation, MainNavigation} from './navigations';

function Mains(props) {
  const {userInfo} = useSelector((state) => state.AuthReducer);

  console.log(userInfo);
  return userInfo === null ? <AuthNavigation /> : <MainNavigation />;
}

export default Mains;
