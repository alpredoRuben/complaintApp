/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
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
import {useSelector} from 'react-redux';

function DetailNotificationScreen(props) {
  const {userInfo} = useSelector((state) => state.AuthReducer);
  const [notifId, setNotifId] = useState(props.route.params.id);
  const [notifications, setNotifications] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const readNotification = async (id) => {
    try {
      const {data, status} = await Api.get(
        `mobile_notifications/get/read/${id}`,
        Authorization(userInfo.token),
      );
      console.log(data);
      if (status === 200) {
        setNotifications(data.notifs);
      } else {
        setNotifications(null);
      }
    } catch (err) {
      console.log(err.response);
      setNotifications(null);
    }
  };

  useEffect(() => {
    if (userInfo && notifId) {
      console.log('Detail Notification Data Params', notifId);
      readNotification(notifId);
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
  } else {
    if (notifications !== null) {
      const resData = JSON.parse(notifications.data);
      return (
        <SafeAreaView style={styles.container}>
          <ScrollView
            alwaysBounceVertical={true}
            style={styles.dynamicBackground('#ccc')}>
            <View style={styles.cover}>
              <View style={styles.header}>
                <Text style={styles.textHeader}>Pesan Notifikasi</Text>
                <Text style={styles.textInfoHeader}>{resData.message}</Text>
              </View>

              {notifications.type === 'CREATE_COMPLAINT' && (
                <>
                  <View style={styles.dividerHorizonTop(10, 5)}>
                    <Text style={styles.textLabel}>Pesan Pengaduan</Text>
                    <Text style={styles.textMessage}>
                      {resData.data.messages}
                    </Text>
                  </View>

                  <View style={styles.dividerHorizonTop(10, 15)}>
                    <Text style={styles.textLabel}>Sifat Pengaduan</Text>
                    <View
                      style={styles.coverDynamic(
                        resData.data.urgent ? 'red' : 'blue',
                        55,
                      )}>
                      <Text style={styles.textWhiteDynamic}>
                        {resData.data.urgent ? 'Penting' : 'Normal'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.dividerHorizonTop(10, 15)}>
                    <Text style={styles.textLabel}>Waktu Pengiriman Pesan</Text>
                    <Text style={styles.textMessage}>
                      {moment(resData.data.created_at).format(
                        'DD MM YYYY, HH:mm:ss',
                      )}
                    </Text>
                  </View>

                  <View style={styles.dividerHorizonTop(10, 15)}>
                    <Text style={styles.textLabel}>
                      Waktu Menerima dan Membaca Pesan
                    </Text>
                    <Text style={styles.textMessage}>
                      {moment(notifications.read_at).format(
                        'DD MM YYYY, HH:mm:ss',
                      )}
                    </Text>
                  </View>

                  <View style={styles.dividerHorizonVertical(10, 15)}>
                    <Text style={styles.textLabel}>Status Pengaduan</Text>
                    <View style={styles.coverDynamic('#c7bd00', 200)}>
                      <Text style={styles.textWhiteDynamic}>
                        Menunggu Ditugaskan (Assigned)
                      </Text>
                    </View>
                  </View>
                </>
              )}

              {notifications.type === 'ASSIGNED_COMPLAINT' && (
                <>
                  <View style={styles.dividerHorizonTop(10, 5)}>
                    <Text style={styles.textLabel}>Pesan Pengaduan</Text>
                    <Text style={styles.textMessage}>
                      {notifications.assigned.complaint.messages}
                    </Text>
                  </View>

                  <View style={styles.dividerHorizonTop(10, 15)}>
                    <Text style={styles.textLabel}>Track Status</Text>
                    <View
                      style={styles.coverDynamic(
                        '#515e5d',
                        notifications.assigned.status.name.length + 20,
                      )}>
                      <Text style={styles.textWhiteDynamic}>
                        {notifications.assigned.status.name}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.dividerHorizonTop(10, 15)}>
                    <Text style={styles.textLabel}>
                      Status Konfirmasi Pengaduan
                    </Text>
                    <View
                      style={styles.coverDynamic(
                        notifications.assigned.complaint.on_assigned
                          ? '#0274a8'
                          : '#d68802',
                        200,
                      )}>
                      <Text style={styles.textWhiteDynamic}>
                        {notifications.assigned.complaint.on_assigned
                          ? 'Telah Ditugaskan'
                          : 'Menunggu Konfirmasi'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.dividerHorizonTop(10, 15)}>
                    <Text style={styles.textLabel}>
                      Pengaduan Di Konfirmasi Pada Waktu
                    </Text>
                    <Text style={styles.textMessage}>
                      {moment(notifications.assigned.created_at).format(
                        'DD MM YYYY, HH:mm:ss',
                      )}
                    </Text>
                  </View>

                  <View style={styles.dividerHorizonTop(10, 15)}>
                    <Text style={styles.textLabel}>
                      Waktu Menerima dan Membaca Pesan
                    </Text>
                    <Text style={styles.textMessage}>
                      {moment(notifications.read_at).format(
                        'DD MM YYYY, HH:mm:ss',
                      )}
                    </Text>
                  </View>
                </>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={styles.container}>
          <ScrollView alwaysBounceVertical={true}>
            <View style={styles.cover}>
              <Text style={{fontSize: 18, color: 'red'}}>
                Pesan Notifikasi Tidak Ditemukan
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    }
  }
}

export const optionDetailNotification = (props) => ({
  headerTitle: 'Notifikasi',
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
});

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