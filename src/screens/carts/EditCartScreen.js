/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import NumericInput from 'react-native-numeric-input';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {ActivityIndicator} from 'react-native-paper';

//Utils
import Api from '../../utils/Api';
import Authorization from '../../utils/Authorization';
import {useSelector} from 'react-redux';
import {NoImage} from '../../assets';

const {width: screenWidth} = Dimensions.get('window');

/** PRODUCT SCREEN */
export default function EditCartScreen(props) {
  const {userInfo} = useSelector((state) => state.AuthReducer);

  const [dataSource, setDataSource] = useState({
    order: null,
    quantity: 0,
  });
  const [loading, setLoading] = useState(false);
  const carouselRef = useRef(null);

  const fetchOrder = async () => {
    setLoading(false);
    try {
      const {data, status} = await Api.get(
        `/orders/${props.route.params.cartId}`,
        Authorization(userInfo.token),
      );

      if (status === 200) {
        setDataSource({
          ...dataSource,
          order: data.order,
          quantity: data.order.quantity,
        });
      }
    } catch (error) {
      console.log('Error Edit Cart', error.response);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchOrder();
    return () => {};
  }, []);

  const renderCarouselItem = ({item, index}, parallaxProps) => {
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

  const updateCartOrder = () => {
    const qty = dataSource.quantity;
    if (qty > 0 && qty <= dataSource.order.product.stock) {
    } else {
      Alert.alert(
        'PERINGATAN',
        'Jumlah pesanan yang anda isi lebih atau kurang dari stok barang yang tersedia',
        [
          {
            text: 'OK',
            onPress: () => console.log('Press Ok'),
          },
        ],
      );
    }
  };

  if (loading === true) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator animating={true} color="#106bb5" />
      </View>
    );
  } else {
    if (dataSource.order != null) {
      return (
        <SafeAreaView style={{flex: 1, padding: 10}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{flexDirection: 'column', justifyContent: 'flex-start'}}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  {dataSource.order.product.product_name}
                </Text>
                <Text style={{fontSize: 12, color: '#2a4f87'}}>
                  ({dataSource.order.product.spesification})
                </Text>
              </View>

              <View
                style={{width: '100%', alignItems: 'center', marginBottom: 10}}>
                {dataSource.order.product_files.length > 0 ? (
                  <Carousel
                    ref={carouselRef}
                    sliderWidth={screenWidth}
                    itemWidth={screenWidth - 30}
                    data={
                      dataSource.order.product_files instanceof Array
                        ? dataSource.order.product_files
                        : []
                    }
                    renderItem={renderCarouselItem}
                    hasParallaxImages={true}
                    slideStyle={{flex: 1}}
                  />
                ) : (
                  <Image
                    source={NoImage}
                    style={{width: screenWidth - 30, height: screenWidth - 100}}
                  />
                )}
              </View>

              <View
                style={{
                  width: '100%',
                  marginBottom: 10,
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                  Stok Yang Tersedia : {dataSource.order.product.stock}{' '}
                  {dataSource.order.product.satuan}
                </Text>
              </View>

              <View style={{marginTop: 10, alignItems: 'center'}}>
                <Text>Jumlah Pesan</Text>
                <NumericInput
                  type="plus-minus"
                  minValue={1}
                  maxValue={dataSource.order.product.stock + 1}
                  valueType="integer"
                  borderColor="#035f73"
                  value={dataSource.quantity}
                  onChange={(value) =>
                    setDataSource({...dataSource, quantity: value})
                  }
                  onLimitReached={(isMax, msg) => {
                    if (isMax) {
                      Alert.alert(
                        'PERINGATAN',
                        'Jumlah pesanan anda melebihi stok barang yang tersedia',
                        [
                          {
                            text: 'OK',
                            onPress: () => console.log('Press Ok'),
                          },
                        ],
                      );

                      setDataSource({
                        ...dataSource,
                        quantity: dataSource.order.quantity,
                      });
                    }
                  }}
                  totalWidth={240}
                  totalHeight={40}
                  step={1}
                  iconSize={25}
                  textColor="#B0228C"
                  iconStyle={{color: 'white'}}
                  rightButtonBackgroundColor="#035f73"
                  leftButtonBackgroundColor="#035f73"
                />
              </View>

              <View style={{marginTop: 10}}>
                <Button
                  icon="pencil"
                  mode="contained"
                  contentStyle={{backgroundColor: '#2a4bb8'}}
                  onPress={updateCartOrder}>
                  UBAH PESANAN
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
                    props.navigation.navigate('CartStackScreen', {
                      screen: 'CartScreen',
                    })
                  }>
                  KEMBALI
                </Button>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    }

    return null;
  }
}
