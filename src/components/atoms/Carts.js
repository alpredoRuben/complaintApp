/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Icon, withBadge} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import io from 'socket.io-client';

import {SOCKET_IO_URL, STATIC_EVENT_CHANNEL} from '../../utils/Config';
import {getUserCart, deleteCartAction} from '../../actions';

const CHN = STATIC_EVENT_CHANNEL();

const Carts = (props) => {
  const {userInfo} = useSelector((state) => state.AuthReducer);
  const {carts} = useSelector((state) => state.CartReducer);
  const dispatch = useDispatch();
  const CartBadge = withBadge(carts.length)(Icon);

  const onCartPressHandle = () => {
    console.log('Props Cart', props);
    props.navigation.navigate('CartStackScreen', {
      screen: 'CartScreen',
    });
  };

  React.useEffect(() => {
    const socket = io(SOCKET_IO_URL);

    /** DISAGREE ORDER EVENT CHANNEL */
    socket.on(
      `${CHN.orderEventChannel.channelName.disagree}:${CHN.orderEventChannel.eventName}`,
      (message) => {
        console.log('DISAGREE ORDER', message);
        const {data, receivers, type} = message;
        if (type == 'DISAGREE_ORDER' && receivers == userInfo.user.id) {
          const foundOrder = carts.find((item) => item.id == data.id);
          if (foundOrder) {
            dispatch(deleteCartAction(data));
          } else {
            dispatch(getUserCart());
          }
        }
      },
    );
    return () => {};
  }, []);

  return (
    <TouchableOpacity
      style={{
        marginRight: 15,
        width: 50,
        padding: 5,
        borderRadius: 50,
      }}
      onPress={onCartPressHandle}>
      {carts.length > 0 ? (
        <CartBadge type="ionicon" name="cart-outline" color="white" />
      ) : (
        <Icon type="ionicon" name="cart-outline" color="white" />
      )}
    </TouchableOpacity>
  );
};

export default Carts;
