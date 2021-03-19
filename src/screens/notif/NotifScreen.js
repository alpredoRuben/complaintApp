/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {ActivityIndicator, Colors, Button} from 'react-native-paper';
import {StackActions} from '@react-navigation/native';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {ToggleHeader} from '../../components';
import Api from '../../utils/Api';
import Authorization from '../../utils/Authorization';

const elements = [
  {
    key: 'not_read',
    message: 'Notifikasi Yang Belum Dibaca',
    title: 'Belum Dibaca',
  },
  {
    key: 'read',
    message: 'Notifikasi Yang Sudah Dibaca',
    title: 'Sudah Dibaca',
  },
];

function NotifScreen(props) {
  const {userInfo} = useSelector((state) => state.AuthReducer);
  const [notifications, setNotifications] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [query, setQuery] = React.useState({
    is_read: false,
    page: 1,
    message: elements[0].message,
    is_active: 0,
  });

  const fetchNotifications = async () => {
    try {
      const response = await Api.get(
        `mobile_notifications/show/all?page=${query.page}&is_read=${query.is_read}`,
        Authorization(userInfo.token),
      );
      console.log('Fetch Notifications', response);
      if (response.status === 200) {
        if (query.page === 1) {
          setNotifications(response.data.data);
        } else {
          let data_ = [...notifications, response.data.data];
          setNotifications(data_);
        }

        setTotal(response.data.total);
      }
    } catch (err) {
      console.log('Error Fetch Notifications ', err.response);
    }

    setLoading(false);
  };

  React.useEffect(() => {
    fetchNotifications();
    return () => {};
  }, [query.page, query.is_read, query.message, query.is_active]);

  const onTopButtonPressHandler = (key, index) => {
    setLoading(true);
    setQuery({
      ...query,
      is_read: key === 'read' ? true : false,
      message: elements[index].message,
      is_active: index,
      page: 1,
    });
  };

  const loadMore = (p) => {
    setLoading(true);
    setQuery({
      ...query,
      page: p,
    });

    fetchNotifications();
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        key={`notif-${index}-${item.id}`}
        onPress={() => {
          console.log('ID: ', item.id);
          props.navigation.dispatch(
            StackActions.replace('DetailNotificationScreen', {id: item.id}),
          );
        }}
        style={{backgroundColor: '#ddd', padding: 10, marginVertical: 10}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View
            style={{
              width: '10%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: 'blue'}}>
              {index + 1}
            </Text>
          </View>
          <View style={{width: '80%'}}>
            <Text style={{fontSize: 14, fontWeight: 'bold'}}>Messages</Text>
            <Text style={{fontSize: 12, fontStyle: 'italic'}}>
              {item.messages}
            </Text>

            <Text style={{fontSize: 14, fontWeight: 'bold', marginTop: 10}}>
              Created At
            </Text>
            <Text style={{fontSize: 12, fontStyle: 'italic'}}>
              {moment(item.created_at).format('DD MMM YYYY, HH:mm:ss')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderFooter = () => {
    if (total <= 0) {
      return null;
    }

    return (
      <View style={{padding: 5, marginHorizontal: 10}}>
        {total >= notifications.length ? null : (
          <TouchableOpacity
            onPress={loadMore(query.page + 1)}
            activeOpacity={0.9}
            style={{
              padding: 10,
              backgroundColor: '#417cd1',
              borderRadius: 5,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Selanjutnya
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator animating={true} color={Colors.red800} />
      </View>
    );
  }

  return (
    <View style={{flex: 1, padding: 10}}>
      {/* TOP BUTTON */}
      <View style={{width: '100%', height: 50}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {elements.map((item, index) => (
            <View style={{margin: 5}} key={`element-${item.key}-${index}`}>
              <Button
                key={`TOPBUTTON-${item.key}-${index}`}
                style={{
                  backgroundColor:
                    query.is_active === index ? '#850391' : '#58616e',
                  borderRadius: 5,
                }}
                onPress={() => onTopButtonPressHandler(item.key, index)}>
                <Text style={{color: 'white'}}>{item.title}</Text>
              </Button>
            </View>
          ))}
        </View>
      </View>

      {/* TOP TITLE */}
      <View style={{width: '100%', height: 25}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 16}}>{query.message}</Text>
        </View>
      </View>

      {/* MIDDLE DATATABLE */}
      <View
        style={{
          width: '100%',
          height: 500,
          marginTop: 10,
        }}>
        <View style={{flex: 1}}>
          <FlatList
            style={{flex: 1}}
            data={notifications}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            enableEmptySections={true}
            ListFooterComponent={renderFooter}
          />
        </View>
      </View>
    </View>
  );
}

export default NotifScreen;
