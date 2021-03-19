/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import {ToggleHeader} from '../../components';
import {ActivityIndicator} from 'react-native-paper';

//Utils
import Api from '../../utils/Api';
import Authorization from '../../utils/Authorization';
import {useSelector, useDispatch} from 'react-redux';
import {addCartAction} from '../../actions';

const {width: screenWidth} = Dimensions.get('window');

/** PRODUCT SCREEN */
export default function DetailCartScreen(props) {
  const {userInfo} = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  const [dataSource, setDataSource] = useState({
    product: {},
    error: null,
  });

  const [cartOrder, setCartOrder] = useState({
    quantity: '',
    complaintId: undefined,
    productId: undefined,
  });

  const [loading, setLoading] = useState(false);

  const carouselRef = useRef(null);

  const fetchProduct = async () => {
    const url = `/products/${props.route.params.productId}`;
    try {
      const result = await Api.get(url, Authorization(userInfo.token));
      if (result.status === 200) {
        setDataSource({
          ...dataSource,
          product: result.data.product,
          error: null,
        });
      }

      setLoading(false);
    } catch (error) {
      setDataSource({...dataSource, error: error.response.data, product: {}});
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      setCartOrder({
        ...cartOrder,
        complaintId: props.route.params.complaintId,
        productId: props.route.params.productId,
      });
    });

    setCartOrder({
      ...cartOrder,
      complaintId: props.route.params.complaintId,
      productId: props.route.params.productId,
    });

    setLoading(true);
    fetchProduct();
    return () => {
      unsubscribe;
    };
  }, []);

  const renderCarouselItem = ({item, index}, parallaxProps) => {
    console.log('Item Carousel', item);
    return (
      <View
        style={{
          width: screenWidth - 30,
          height: screenWidth - 100,
        }}>
        <ParallaxImage
          source={{uri: item.filepath}}
          parallaxFactor={0.4}
          containerStyle={{
            flex: 1,
            marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
            backgroundColor: 'white',
          }}
          style={{
            ...StyleSheet.absoluteFillObject,
            resizeMode: 'center',
          }}
          {...parallaxProps}
        />
      </View>
    );
  };

  const onAddCartHandler = async () => {
    console.log('Cart Order', cartOrder);
    try {
      const {data, status} = await Api.post(
        'orders',
        cartOrder,
        Authorization(userInfo.token),
      );

      if (status === 200) {
        dispatch(addCartAction(data.order));

        Alert.alert('BERHASIL', data.message, [
          {
            text: 'OK',
            onPress: () => {
              props.navigation.navigate('InventoryStackScreen', {
                screen: 'ProductScreen',
                params: {
                  complaintId: props.route.params.complaintId,
                },
              });
            },
          },
        ]);
      }
    } catch (error) {
      const {data, status} = error.response;

      if (status === 422) {
        Alert.alert('GAGAL MEMESAN', 'Silahkan isi data dengan benar', [
          {
            text: 'TUTUP',
            onPress: () => {
              console.log('Press Close');
            },
          },
        ]);
      } else {
        Alert.alert('ERROR', data.message, [
          {
            text: 'TUTUP',
            onPress: () => {
              console.log('Press Close');
            },
          },
        ]);
      }

      console.log(data);
    }
  };

  if (loading === true) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator animating={true} color="#106bb5" />
      </View>
    );
  }

  return (
    <View style={{flex: 1, padding: 10}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'column', justifyContent: 'flex-start'}}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              {dataSource.product.product_name}
            </Text>
            <Text style={{fontSize: 12, color: '#2a4f87'}}>
              ({dataSource.product.spesification})
            </Text>
          </View>
        </View>

        <View
          style={{
            width: '100%',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          {dataSource.product ? (
            <Carousel
              ref={carouselRef}
              sliderWidth={screenWidth}
              itemWidth={screenWidth - 30}
              data={dataSource.product ? dataSource.product.file_images : []}
              renderItem={renderCarouselItem}
              hasParallaxImages={true}
              slideStyle={{flex: 1}}
            />
          ) : (
            <Text style={{fontSize: 14, fontWeight: 'bold'}}>
              GAMBAR BARANG KOSONG
            </Text>
          )}
        </View>

        <View
          style={{
            width: '100%',
            marginBottom: 10,
          }}>
          <View
            style={{
              backgroundColor: '#f0f6ff',
              paddingVertical: 5,
              paddingLeft: 5,
            }}>
            <Text style={{fontSize: 14, fontWeight: 'bold'}}>
              Stok Yang Tersedia : {dataSource.product.stock}{' '}
              {dataSource.product.satuan}
            </Text>
          </View>

          <View style={{marginTop: 10}}>
            <TextInput
              placeholder="Jumlah Pesanan"
              style={{
                height: 45,
                borderWidth: 1,
                paddingHorizontal: 10,
                borderColor: '#bec6d1',
                color: '#cc7006',
                fontWeight: 'bold',
              }}
              value={cartOrder.quantity}
              onChangeText={(text) =>
                setCartOrder({...cartOrder, quantity: text})
              }
            />
          </View>

          <View style={{marginTop: 10}}>
            <Button
              icon="plus"
              mode="contained"
              contentStyle={{backgroundColor: '#2a4bb8'}}
              onPress={onAddCartHandler}>
              TAMBAH KERANJANG
            </Button>
          </View>

          <View style={{marginTop: 10}}>
            <Button
              icon="cart"
              mode="contained"
              contentStyle={{backgroundColor: '#027060'}}
              onPress={() => console.log('Pressed')}>
              Keranjang Pemesanan
            </Button>
          </View>

          <View style={{marginTop: 10}}>
            <Button
              icon={({size, color}) => (
                <Icon
                  name="chevron-back-circle-outline"
                  size={size + 5}
                  color={color}
                />
              )}
              mode="contained"
              contentStyle={{backgroundColor: 'gray'}}
              onPress={() =>
                props.navigation.navigate('InventoryStackScreen', {
                  screen: 'ProductScreen',
                  params: {
                    complaintId: cartOrder.complaintId,
                  },
                })
              }>
              KEMBALI
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
