/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Icon, withBadge} from 'react-native-elements';
import {useSelector} from 'react-redux';

const Carts = (props) => {
  const {carts} = useSelector((state) => state.CartReducer);

  const CartBadge = withBadge(carts.length)(Icon);

  const onCartPressHandle = () => {
    console.log('Props Cart', props);
  };

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
