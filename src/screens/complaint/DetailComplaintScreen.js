/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {ToggleHeader} from '../../components';
import Api from '../../utils/Api';
import Authorization from '../../utils/Authorization';

export default function DetailComplaintScreen(props) {
  const {userInfo} = useSelector((state) => state.AuthReducer);
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);

  const fetchComplaint = async () => {
    try {
      const {data, status} = await Api.get(
        `complaints/${props.route.params.id}`,
        Authorization(userInfo.token),
      );

      if (status === 200) {
        console.log(data);
        setComplaint(data.result);

        if (data.result.assigned === null) {
          setReady(false);
        } else {
          if (data.result.assigned.is_accepted == false) {
            setReady(false);
          } else {
            setReady(true);
          }
        }
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    fetchComplaint();
    setLoading(false);
    return () => {};
  }, [ready]);

  if (loading) {
    return (
      <View style={[styles.loadingContainer, styles.loadingHorizontal]}>
        <ActivityIndicator size="large" />
        <ActivityIndicator size="small" color="#0000ff" />
        <ActivityIndicator size="large" color="#00ff00" />
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  const startWorkComplaint = async () => {
    try {
      const {data, status} = await Api.get(
        `accept/assigned/${complaint.assigned.id}/complaints`,
        Authorization(userInfo.token),
      );

      if (status === 200) {
        Alert.alert('KONFIRMASI BERHASIL', data.message, [
          {
            text: 'OK',
            onPress: () => {
              console.log('Pressed OK');
            },
          },
        ]);
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  const confirmComplaintHandler = () => {
    console.log('Complaint', complaint);
    startWorkComplaint();
    setReady(true);
  };

  const assignedComplaint = () => {};

  const submitFinishedWork = () => {
    console.log('Complaint', complaint);
    props.navigation.navigate('ComplaintStackScreen', {
      screen: 'FinishComplaintScreen',
      params: {
        id: complaint.id,
      },
    });
  };

  const renderButton = () => {
    const slug = userInfo.user.roles[0].slug;
    if (slug !== 'admin' && slug !== 'pegawai') {
      if (
        complaint.is_finished == false &&
        complaint.assigned != null &&
        complaint.assigned.is_accepted == false
      ) {
        return (
          <View style={styles.dividerHorizonTop(10, 15)}>
            <TouchableOpacity
              style={{
                backgroundColor: '#068a9e',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={confirmComplaintHandler}>
              <View style={{margin: 10}}>
                <Text style={{fontSize: 16, color: 'white'}}>
                  Konfirmasi & Ambil Pekerjaan
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      }

      if (
        complaint.is_finished == false &&
        complaint.assigned != null &&
        complaint.assigned.is_accepted == true
      ) {
        return (
          <View style={styles.dividerHorizonTop(10, 15)}>
            <TouchableOpacity
              style={{
                backgroundColor: '#128c37',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={submitFinishedWork}>
              <View style={{margin: 10}}>
                <Text style={{fontSize: 16, color: 'white'}}>
                  Pekerjaan Selesai
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      }
    }
    return null;
  };

  if (complaint === null) {
    return null;
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.cover}>
          <View style={styles.header}>
            <Text style={styles.textHeader}>Judul Pengaduan</Text>
            <Text style={styles.textInfoHeader}>{complaint.title}</Text>
          </View>

          <View style={styles.dividerHorizonTop(10, 15)}>
            <Text style={styles.textLabel}>Pesan Pengaduan</Text>
            <Text style={styles.textMessage}>{complaint.messages}</Text>
          </View>

          <View style={styles.dividerHorizonTop(10, 15)}>
            <Text style={styles.textLabel}>Waktu Pengiriman Pesan</Text>
            <Text style={styles.textMessage}>
              {moment(complaint.created_at).format('DD MMM YYYY, HH:mm:ss')}
            </Text>
          </View>

          {complaint.assigned !== null &&
            complaint.assigned.start_work !== null && (
              <View style={styles.dividerHorizonTop(10, 15)}>
                <Text style={styles.textLabel}>Waktu Memulai Pekerjaan</Text>
                <Text style={styles.textMessage}>
                  {moment(complaint.assigned.start_work).format(
                    'DD MMM YYYY, HH:mm:ss',
                  )}
                </Text>
              </View>
            )}

          {complaint.assigned !== null && complaint.assigned.end_work !== null && (
            <View style={styles.dividerHorizonTop(10, 15)}>
              <Text style={styles.textLabel}>
                Waktu Menyelesaikan Pekerjaan
              </Text>
              <Text style={styles.textMessage}>
                {moment(complaint.end_work).format('DD MMM YYYY, HH:mm:ss')}
              </Text>
            </View>
          )}

          {userInfo.user.roles[0].slug === 'admin' && (
            <View style={styles.dividerHorizonTop(10, 15)}>
              <Text style={styles.textLabel}>Pengirim Pesan Pengaduan</Text>
              <Text style={styles.textMessage}>{complaint.sender.name}</Text>
            </View>
          )}

          {complaint.executor && complaint.executor != null && (
            <View style={styles.dividerHorizonTop(10, 15)}>
              <Text style={styles.textLabel}>Pelaksana Pengaduan</Text>
              <Text style={[styles.textMessage, {fontWeight: 'bold'}]}>
                {complaint.executor.name + ' (' + complaint.types.name + ')'}
              </Text>
            </View>
          )}

          <View style={styles.dividerHorizonTop(10, 15)}>
            <Text style={styles.textLabel}>Sifat Pengaduan</Text>
            <View
              style={styles.coverDynamic(
                complaint.is_urgent ? '#0fa811' : '#777',
                '100%',
              )}>
              <Text style={styles.textWhiteDynamic}>
                {complaint.is_urgent ? 'Berita Penting' : 'Berita Biasa'}
              </Text>
            </View>
          </View>

          <View style={styles.dividerHorizonTop(10, 15)}>
            <Text style={styles.textLabel}>Status Pekerjaan</Text>
            <View
              style={styles.coverDynamic(
                complaint.is_finished ? '#038c05' : '#b9cc0a',
                '100%',
              )}>
              <Text style={styles.textWhiteDynamic}>
                {complaint.is_finished ? 'Selesai' : 'Belum Selesai'}
              </Text>
            </View>
          </View>

          {userInfo.user.roles[0].slug !== 'pegawai' && (
            <View style={styles.dividerHorizonTop(10, 15)}>
              <Text style={styles.textLabel}>Status Penugasan</Text>
              <View
                style={styles.coverDynamic(
                  complaint.is_assigned ? '#0253ab' : '#7b428a',
                  '100%',
                )}>
                <Text style={styles.textWhiteDynamic}>
                  {complaint.is_assigned
                    ? 'Telah Ditugaskan'
                    : 'Menunggu Ditugaskan'}
                </Text>
              </View>
            </View>
          )}

          {userInfo.user.roles[0].slug !== 'pegawai' &&
            complaint.assigned !== null && (
              <View style={styles.dividerHorizonTop(10, 15)}>
                <Text style={styles.textLabel}>
                  Status Konfirmasi Penugasan
                </Text>
                <View
                  style={styles.coverDynamic(
                    complaint.assigned.is_accepted ? '#800675' : '#c97602',
                    '100%',
                  )}>
                  <Text style={styles.textWhiteDynamic}>
                    {complaint.assigned.is_accepted
                      ? 'Telah Dikonfirmasi'
                      : 'Menunggu Konfirmasi'}
                  </Text>
                </View>
              </View>
            )}

          {/* ASSIGNED */}
          {userInfo.user.roles[0].slug === 'admin' && (
            <View style={styles.dividerHorizonTop(10, 15)}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#b34c07',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={assignedComplaint}>
                <View style={{margin: 10}}>
                  <Text style={{fontSize: 16, color: 'white'}}>
                    Penugasan Pengaduan
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}

          {/* BUTTON TO USER OPERATIONAL */}
          {renderButton()}

          {userInfo.user.roles[0].slug !== 'admin' &&
            userInfo.user.roles[0].slug !== 'pegawai' &&
            complaint.is_finished === false &&
            complaint.is}

          <View style={styles.dividerHorizonVertical(10, 15)}>
            <TouchableOpacity
              style={{
                backgroundColor: '#637876',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => props.navigation.replace('ComplaintScreen')}>
              <View style={{margin: 10}}>
                <Text style={{fontSize: 16, color: 'white'}}>Kembali</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export const optionDetailComplaint = (props) => {
  return {
    headerTitle: 'Detail Pengaduan',
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
