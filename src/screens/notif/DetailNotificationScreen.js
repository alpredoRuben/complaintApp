/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
} from 'react-native';
import moment from 'moment';
import {ToggleHeader} from '../../components';
import Api from '../../utils/Api';
import Authorization from '../../utils/Authorization';
import {useSelector, useDispatch} from 'react-redux';
import {setTotalNotif, resetTotalNotif} from '../../actions';

function DetailNotificationScreen(props) {
  const {userInfo} = useSelector((state) => state.AuthReducer);
  const [notifId, setNotifId] = useState(props.route.params.id);
  const [notifications, setNotifications] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const readNotification = async (id) => {
    try {
      const {data, status} = await Api.get(
        `mobile_notifications/read/${id}`,
        Authorization(userInfo.token),
      );
      console.log('Detail Notification', data);
      if (status === 200) {
        setNotifications(data.result);
      } else {
        setNotifications(null);
      }
    } catch (err) {
      setNotifications(null);
    }
  };

  const fetchNotification = async () => {
    try {
      const {data, status} = await Api.get(
        'mobile_notifications/count/unread',
        Authorization(userInfo.token),
      );

      if (status === 200) {
        const total = data.total;
        dispatch(setTotalNotif(total));
      }
    } catch (err) {
      //dispatch(resetTotalNotif());
    }
  };

  useEffect(() => {
    if (userInfo && notifId) {
      readNotification(notifId);
      fetchNotification();
    }
    setIsLoading(false);
    return () => {};
  }, []);

  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, styles.loadingHorizontal]}>
        <ActivityIndicator size="large" />
        <ActivityIndicator size="small" color="#0000ff" />
        <ActivityIndicator size="large" color="#00ff00" />
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  if (notifications === null) {
    return null;
  }

  const resData = JSON.parse(notifications.data);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        alwaysBounceVertical={true}
        style={styles.dynamicBackground('#ccc')}>
        <View style={styles.cover}>
          <View style={styles.header}>
            <Text style={styles.textHeader}>Pesan Notifikasi</Text>
            <Text style={styles.textInfoHeader}>{notifications.messages}</Text>
          </View>

          <View style={styles.dividerHorizonTop(10, 5)}>
            <Text style={styles.textLabel}>Judul Pengaduan</Text>
            <Text style={styles.textMessage}>{resData.title}</Text>
          </View>

          <View style={styles.dividerHorizonTop(10, 5)}>
            <Text style={styles.textLabel}>Pesan Pengaduan</Text>
            <Text style={styles.textMessage}>{resData.messages}</Text>
          </View>

          <View style={styles.dividerHorizonTop(10, 15)}>
            <Text style={styles.textLabel}>Sifat Pengaduan</Text>
            <View
              style={styles.coverDynamic(
                resData.is_urgent ? 'red' : 'blue',
                '100%',
              )}>
              <Text style={styles.textWhiteDynamic}>
                {resData.is_urgent ? 'Penting' : 'Normal'}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  dynamicBackground: (color) => ({backgroundColor: color}),
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  loadingHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },

  cover: {
    justifyContent: 'center',
    alignItems: 'stretch',
    margin: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
    backgroundColor: '#fff',
  },

  header: {
    alignItems: 'center',
    marginVertical: 10,
  },

  textHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    textDecorationLine: 'underline',
    color: '#064591',
  },

  textInfoHeader: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#494c4f',
  },

  textLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#064591',
  },

  textMessage: {
    fontSize: 12,
    textAlign: 'justify',
    fontStyle: 'italic',
    color: '#494c4f',
  },

  coverDynamic: (color, width) => ({
    backgroundColor: color,
    paddingHorizontal: 5,
    paddingVertical: 2,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  }),

  textWhiteDynamic: {
    fontSize: 12,
    textAlign: 'justify',
    color: 'white',
  },

  dividerHorizonTop: (mH, mT) => ({marginHorizontal: mH, marginTop: mT}),
  dividerHorizonVertical: (mH, mV) => ({
    marginHorizontal: mH,
    marginVertical: mV,
  }),
});

export default DetailNotificationScreen;
