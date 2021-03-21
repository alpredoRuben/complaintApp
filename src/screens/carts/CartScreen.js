/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import {useSelector} from 'react-redux';

export default function CartScreen(props) {
  const {userInfo} = useSelector((state) => state.AuthReducer);
  const {carts} = useSelector((state) => state.CartReducer);

  if (carts.length > 0) {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View>
          <Text>Cart Screen</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
          DAFTAR PESANAN ANDA KOSONG
        </Text>
      </View>
    </SafeAreaView>
  );
}
