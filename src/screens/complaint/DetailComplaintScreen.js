/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
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
  const [isConfirm, setIsConfirm] = useState(false);

  const fetchComplaint = async () => {
    try {
      const {data, status} = await Api.get(
        `complaints/${props.route.params.id}`,
        Authorization(userInfo.token),
      );

      if (status === 200) {
        console.log(data);
        setComplaint(data.result);
      }
    } catch (err) {
      console.log(err.response);
    }
    setIsConfirm(false);
  };

  useEffect(() => {
    fetchComplaint();
    setLoading(false);
    return () => {};
  }, [isConfirm]);

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
    setIsConfirm(true);
  };

  const submitFinishedWork = () => {
    console.log('Complaint', complaint);
    props.navigation.navigate('ComplaintStackScreen', {
      screen: 'FinishComplaintScreen',
      params: {
        id: complaint.id,
      },
    });
  };

  const submitOrderProduct = () => {
    props.navigation.navigate('InventoryStackScreen', {
      screen: 'ProductScreen',
      params: {
        complaintId: complaint.id,
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
          <View style={styles.dividerHorizonTop(0, 15)}>
            <TouchableOpacity
              style={{
                backgroundColor: '#068a9e',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
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
          <>
            <View style={styles.dividerHorizonTop(0, 15)}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#811991',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                }}
                onPress={submitOrderProduct}>
                <View style={{margin: 10}}>
                  <Text style={{fontSize: 16, color: 'white'}}>
                    Pesan & Ambil Barang
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.dividerHorizonTop(0, 15)}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#128c37',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                }}
                onPress={submitFinishedWork}>
                <View style={{margin: 10}}>
                  <Text style={{fontSize: 16, color: 'white'}}>
                    Lapor Pekerjaan Selesai
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        );
      }
    }
    return null;
  };

  if (complaint === null) {
    return null;
  }

  return (
    <View style={{flex: 1, padding: 10, flexDirection: 'column'}}>
      <ScrollView
        style={{flex: 1, padding: 2}}
        showsVerticalScrollIndicator={false}>
        {/* JUDUL */}
        <View
          style={{
            alignItems: 'center',
            marginTop: 5,
            marginBottom: 15,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              textAlign: 'left',
              textDecorationLine: 'underline',
              color: '#0e868a',
            }}>
            Judul
          </Text>
          <Text
            style={{
              fontSize: 13,
              textAlign: 'center',
              color: '#2e3945',
            }}>
            {complaint.title}
          </Text>
        </View>

        {/* PESAN */}
        <View style={styles.coverRows}>
          <Text style={styles.textSubtitle}>Pesan Pengaduan</Text>
          <Text style={styles.textInfoSubtitle}>{complaint.messages}</Text>
        </View>

        {/* STATUS PENGADUAN */}
        <View style={styles.coverRows}>
          <Text style={styles.textSubtitle}>Sifat Pengaduan</Text>
          <Text style={styles.textInfoSubtitle}>
            {complaint.is_urgent ? 'Perihal Penting' : 'Perihal Biasa'}
          </Text>
        </View>

        {/* WAKTU PENGIRIMAN PESAN */}
        <View style={styles.coverRows}>
          <Text style={styles.textSubtitle}>Waktu Pengiriman</Text>
          <Text style={styles.textInfoSubtitle}>
            {moment(complaint.created_at).format('DD MMM YYYY, HH:mm:ss')}
          </Text>
        </View>

        {/* PENGIRIM PESAN PENGADUAN */}
        {userInfo.user.roles[0].slug === 'admin' && (
          <View style={styles.coverRows}>
            <Text style={styles.textSubtitle}>Pengirim Pesan Pengaduan</Text>
            <Text style={styles.textInfoSubtitle}>{complaint.sender.name}</Text>
          </View>
        )}

        {/* PELAKSANA PEKERJAAN PENGADUAN */}
        {complaint.executor && complaint.executor != null && (
          <View style={styles.coverRows}>
            <Text style={styles.textSubtitle}>Pelaksana Pekerjaan</Text>
            <Text style={[styles.textInfoSubtitle, {fontWeight: 'bold'}]}>
              {complaint.executor.name + ' (' + complaint.types.name + ')'}
            </Text>
          </View>
        )}

        {/* STATUS PENUGASAN */}
        {userInfo.user.roles[0].slug !== 'pegawai' && (
          <View style={styles.coverRows}>
            <Text style={styles.textSubtitle}>Penugasan Pekerjaan</Text>
            <Text style={styles.textInfoSubtitle}>
              {complaint.is_assigned
                ? 'Telah Ditugaskan'
                : 'Menunggu Ditugaskan'}
            </Text>
          </View>
        )}

        {/* STATUS KONFIRMASI PENUGASAN */}
        {userInfo.user.roles[0].slug !== 'pegawai' &&
          complaint.assigned !== null && (
            <View style={styles.coverRows}>
              <Text style={styles.textSubtitle}>Konfirmasi Penugasan</Text>
              <Text style={styles.textInfoSubtitle}>
                {complaint.assigned.is_accepted
                  ? 'Telah Dikonfirmasi'
                  : 'Menunggu Konfirmasi'}
              </Text>
            </View>
          )}

        {/* STATUS PEKERJAAN */}
        <View style={styles.coverRows}>
          <Text style={styles.textSubtitle}>Status Pekerjaan</Text>
          <Text
            style={[
              styles.textInfoSubtitle,
              {
                color: complaint.is_finished ? 'green' : 'white',
                fontWeight: 'bold',
              },
            ]}>
            {complaint.is_finished ? 'Selesai' : 'Belum Selesai'}
          </Text>
        </View>

        {/* WAKTU MEMULAI PEKERJAAN */}
        {complaint.assigned !== null && complaint.assigned.start_work !== null && (
          <View style={styles.coverRows}>
            <Text style={styles.textSubtitle}>Waktu Memulai Pekerjaan</Text>
            <Text style={styles.textInfoSubtitle}>
              {moment(complaint.assigned.start_work).format(
                'DD MMM YYYY, HH:mm:ss',
              )}
            </Text>
          </View>
        )}

        {/* WAKTU MENYELESAIKAN PEKERJAAN */}
        {complaint.assigned !== null && complaint.assigned.end_work !== null && (
          <View style={styles.coverRows}>
            <Text style={styles.textSubtitle}>
              Waktu Menyelesaikan Pekerjaan
            </Text>
            <Text style={styles.textInfoSubtitle}>
              {moment(complaint.end_work).format('DD MMM YYYY, HH:mm:ss')}
            </Text>
          </View>
        )}

        {/* LAPORAN KETERANGAN PEKERJAAN SELESAI */}
        {complaint.is_finished == true && (
          <>
            <View
              style={{
                marginTop: 15,
                color: 'green',
                fontSize: 14,
                fontWeight: 'bold',
              }}>
              <Text style={{fontSize: 14, color: 'green'}}>
                Laporan Hasil Pekerjaan
              </Text>
            </View>

            <View style={styles.coverRows}>
              <Text style={styles.textSubtitle}>Keterangan</Text>
              <Text style={styles.textInfoSubtitle}>
                {complaint.assigned.description != ''
                  ? complaint.assigned.description
                  : 'Tidak ada keterangan tertulis'}
              </Text>
            </View>

            <View style={styles.coverImage}>
              {complaint.assigned.filepath != null ? (
                <Image
                  source={{uri: complaint.assigned.filepath}}
                  style={{
                    width: '50%',
                    height: '50%',
                    margin: 0,
                    backgroundColor: '#f7f7f7',
                  }}
                />
              ) : (
                <Text style={{fontSize: 18, textAlign: 'center', color: 'red'}}>
                  No Image Found
                </Text>
              )}
            </View>
          </>
        )}

        {/* BUTTON */}
        {renderButton()}

        <View style={styles.dividerHorizonVertical(0, 15)}>
          <TouchableOpacity
            style={{
              backgroundColor: '#637876',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}
            onPress={() => props.navigation.replace('ComplaintScreen')}>
            <View style={{margin: 10}}>
              <Text style={{fontSize: 16, color: 'white'}}>Kembali</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
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
  // NEW STYLES
  textSubtitle: {
    fontSize: 12,
    fontWeight: 'bold',
    width: '40%',
    color: '#0e868a',
  },

  textInfoSubtitle: {
    fontSize: 12,
    color: '#2e3945',
    textAlign: 'justify',
    width: '60%',
  },

  coverRows: {
    marginTop: 15,
    padding: 5,
    borderRadius: 5,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },

  coverImage: {
    marginTop: 15,
    padding: 5,
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },

  // OLD STYLE
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
