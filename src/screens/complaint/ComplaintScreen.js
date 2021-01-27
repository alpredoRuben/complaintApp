import React from 'react';
import {
  PrivateComplaint,
  PublicComplaint,
  ToggleHeader,
} from '../../components';
import {useSelector} from 'react-redux';
function ComplaintScreen(props) {
  const {userInfo} = useSelector((state) => state.AuthReducer);

  if (!userInfo) {
    return props.navigation.navigate('LoginScreen');
  }

  if (userInfo.user.roles[0].slug === 'pegawai') {
    return <PrivateComplaint {...props} />;
  }
  return <PublicComplaint {...props} />;
}

export const optionComplaint = (props) => {
  return {
    headerTitle: 'List Pengaduan',
    headerLeft: () => {
      return (
        <ToggleHeader
          name="ios-menu"
          onPress={() => props.navigation.openDrawer()}
        />
      );
    },
    headerTitleStyle: {
      alignSelf: 'center',
    },
  };
};

export default ComplaintScreen;
