/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {ActivityIndicator, Button} from 'react-native-paper';
import moment from 'moment';
// import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';

import Api from '../../utils/Api';
import Authorization from '../../utils/Authorization';
import {setUserCartAction, setErrorCartAction} from '../../actions';

export default function CartScreen(props) {
  const {userInfo} = useSelector((state) => state.AuthReducer);
  const {carts} = useSelector((state) => state.CartReducer);
  const dispatch = useDispatch();

  const [pickersDate, setPickersDate] = useState({
    date: new Date(),
    show: false,
  });

  const [todayDate, setTodayDate] = useState(moment().format('D MMM Y'));
  const [isFilter, setIsFilter] = useState(false);

  const findUserCartByDate = async () => {
    const strDate = moment(pickersDate.date).format('YYYY-MM-DD');
    try {
      const {data, status} = await Api.get(
        `find/orders?orderDate=${strDate}`,
        Authorization(userInfo.token),
      );

      console.log('Get User Cart', data);

      if (status === 200) {
        dispatch(setUserCartAction(data.orders));
      }
    } catch (error) {
      console.log('Error Cart Screen', error.response);
      dispatch(setErrorCartAction(error.response.data));
    }

    setIsFilter(false);
  };

  useEffect(() => {
    if (isFilter) {
      findUserCartByDate();
    }
    return () => {};
  }, [isFilter]);

  const separatorFlat = () => {
    return (
      <View style={{height: 0.5, width: '100%', backgroundColor: '#c8c8c8'}} />
    );
  };

  const FlatListHeader = (title) => {
    return (
      <View
        style={{
          height: 30,
          width: '100%',
          marginTop: 10,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 16,
          },
          shadowOpacity: 1,
          shadowRadius: 11,
        }}>
        <Text
          style={{
            textShadowColor: '#aaa',
            textShadowOffset: {width: 1, height: 3},
            textShadowRadius: 10,
            fontSize: 20,
            fontWeight: 'bold',
            flex: 1,
            alignSelf: 'center',
            color: '#854b00',
          }}>
          {title}
        </Text>
      </View>
    );
  };

  const onCartItemPressHandler = (id) => {
    console.log('Item Press Id', id);
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => onCartItemPressHandler(item.id)}>
        <View
          style={{
            flex: 1,
            marginTop: 5,
            backgroundColor: '#edfbfc',
          }}>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: '75%', padding: 10}}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{color: '#0693a1', fontSize: 13, fontWeight: 'bold'}}>
                  {item.product.product_name}
                </Text>
                <Text style={{color: '#b0afae', fontSize: 11}}>
                  {item.product.spesification}
                </Text>
              </View>
            </View>

            <View
              style={{width: '25%', backgroundColor: '#a8dfe3', padding: 5}}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{color: '#222', fontSize: 10, textAlign: 'center'}}>
                  Total Pesanan
                </Text>
                <Text
                  style={{color: '#a37105', fontSize: 20, fontWeight: 'bold'}}>
                  {item.quantity}
                </Text>
                <Text style={{color: '#222', fontSize: 11}}>
                  {item.product.satuan}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const onChangeDate = (event, date) => {
    const currentDate = date || pickersDate.date;
    console.log('Current Date', currentDate);
    setPickersDate({
      ...pickersDate,
      date: currentDate,
      show: false,
    });

    setTodayDate(moment(currentDate).format('D MMM Y'));
    setIsFilter(true);
  };

  const showingDate = () => {
    setPickersDate({...pickersDate, show: true});
  };

  if (isFilter === true) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator animating={true} color="#106bb5" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{flex: 10}}>
          <View
            style={{
              flex: 1,
              margin: 15,
            }}>
            {carts && carts.length > 0 ? (
              <FlatList
                style={{flex: 1}}
                data={carts}
                ListHeaderComponent={FlatListHeader('Daftar Pemesanan')}
                ItemSeparatorComponent={separatorFlat}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${item.id}_${index.toString()}`}
                enableEmptySections={true}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: 'red'}}>
                  Daftar Pemesanan Kosong
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={{flex: 2}}>
          <View
            style={{
              flex: 1,
              padding: 5,
              backgroundColor: '#03858c',
              shadowColor: '#e8eaed',
              elevation: 12,
            }}>
            <View style={{marginVertical: 5}}>
              <Text style={{fontSize: 11, paddingVertical: 5, color: '#fff'}}>
                Tanggal Pemesanan
              </Text>

              <Button
                icon="calendar"
                mode="contained"
                color="#0fb1b8"
                labelStyle={{color: 'white'}}
                onPress={showingDate}>
                {todayDate}
              </Button>

              {pickersDate.show && (
                <DateTimePicker
                  style={{width: '100%'}}
                  mode="date"
                  value={pickersDate.date}
                  display="spinner"
                  is24Hour={true}
                  minimumDate={new Date(1945, 0, 1)}
                  maximumDate={new Date(2300, 10, 20)}
                  onChange={onChangeDate}
                />
              )}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
