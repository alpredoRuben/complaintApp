/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import momentLocale from 'moment/locale/id';

import {CustomMenuButton} from '../components';
import Colors from '../utils/Colors';
import Api from '../utils/Api';

moment.locale('id', momentLocale);

export default function ComplaintScreen(props) {
  const [complaints, setComplaints] = useState([]);
  const [isFetchAgain, setIsFetchAgain] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [total, setTotal] = useState(0);

  const fetchComplaints = async () => {
    try {
      const {data, status} = await Api.get(`/complaints?page=${page}`);
      if (status === 200) {
        if (data.data.length > 0) {
          if (isFetchAgain) {
            setComplaints([...complaints, data.data]);
            setIsFetchAgain(false);
          } else {
            setComplaints(data.data);
          }
        }
        setTotal(data.total);
      }
      setLoading(false);
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchComplaints();
    return () => {};
  }, [page]);

  const loadMore = () => {
    setPage(page + 1);
    setLoading(true);
    setIsFetchAgain(true);
    fetchComplaints();
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.rowItemContainer}>
        <View style={styles.rowItemLeft}>
          <Text style={styles.rowItemTitle}>{item.type_complaint.title}</Text>
          <Text style={styles.rowItemMessage}>{item.messages}</Text>
          <Text style={styles.rowItemTime}>
            {moment(item.created_at).format('DD MMM Y, h:mm')}
          </Text>
        </View>

        <View style={styles.rowItemRight}>
          <Text style={styles.rowItemInfo(item.urgent ? '#a60000' : '#0fa811')}>
            {item.urgent ? 'PENTING' : 'BIASA'}
          </Text>

          <Text
            style={styles.rowItemInfo(item.finished ? '#038c05' : '#b9cc0a')}>
            {item.finished ? 'SELESAI' : 'DI PROSES'}
          </Text>
        </View>
      </View>
    );
  };

  //Render Footer
  const renderFooter = () => {
    return (
      <View style={styles.footerLoadCover}>
        {total === complaints.length ? null : (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={loadMore}
            style={styles.buttonLoad}>
            <Text style={styles.buttonLoadText}>Selanjutnya</Text>
            {loading ? (
              <ActivityIndicator
                color={Colors.White}
                style={styles.activityIndicator}
              />
            ) : null}
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.cover}>
      <View style={styles.container}>
        <View style={styles.firstContainer}>
          <Text style={{alignItems: 'center', fontSize: 16}}>
            List Data Pengaduan
          </Text>
          <View style={styles.coverFlat}>
            <FlatList
              style={styles.cover}
              data={complaints}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              enableEmptySections={true}
              ListFooterComponent={renderFooter}
            />
          </View>
        </View>

        <View style={styles.secondContainer}>
          <TouchableOpacity
            style={styles.buttonCover}
            onPress={() => props.navigation.navigate('AddComplaintScreen')}>
            <View
              style={{
                width: '15%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="pluscircleo" size={25} color={Colors.White} />
            </View>
            <View style={{width: '85%', marginHorizontal: 10}}>
              <Text style={styles.buttonText}>Buat Pengaduan</Text>
            </View>
          </TouchableOpacity>

          <View
            style={{
              width: '35%',
              marginHorizontal: '5%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 13,
                color: Colors.PrimaryBackground,
                fontWeight: 'bold',
              }}>
              Total Row Data {total}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cover: {flex: 1},
  container: {flex: 2, flexDirection: 'column'},
  firstContainer: {
    width: '100%',
    height: '92%',
    backgroundColor: Colors.White,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  secondContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: '8%',
    padding: 5,
  },
  buttonCover: {
    width: '65%',
    backgroundColor: '#03a8a0',
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
  },
  buttonText: {fontSize: 18, color: Colors.White},
  coverFlat: {
    flex: 1,
    marginTop: 20,
  },

  /** Render Row Item */
  rowItemContainer: {
    flex: 1,
    margin: 5,
    backgroundColor: '#f2f2f2',
    flexDirection: 'row',
    borderColor: '#f2f2f2',
    borderRadius: 5,
    borderWidth: 1,
  },
  rowItemLeft: {width: '75%', paddingHorizontal: 10, paddingVertical: 5},
  rowItemTitle: {fontWeight: 'bold', fontSize: 14, color: '#2fc4ba'},
  rowItemMessage: {fontSize: 12, fontStyle: 'italic', textAlign: 'justify'},
  rowItemRight: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    alignItems: 'baseline',
    width: '25%',
  },
  rowItemInfo: (bgColor) => ({
    fontSize: 9,
    marginBottom: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
    fontWeight: 'bold',
    backgroundColor: bgColor,
    color: Colors.White,
  }),
  rowItemTime: {fontSize: 10, fontWeight: 'bold'},

  //All Item Flatlist
  itemRowCover: {
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 5,
    borderRadius: 5,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  itemTextTitle: {fontSize: 16, marginHorizontal: 15, marginVertical: 5},

  footerLoadCover: {
    padding: 5,
    marginHorizontal: 10,
  },
  buttonLoad: {
    padding: 10,
    backgroundColor: Colors.PrimaryBackground,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLoadText: {
    color: Colors.White,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  activityIndicator: {marginLeft: 20},
});

export const ComplaintScreenOptions = (navdata) => {
  return {
    headerTitle: 'List Pengaduan',
    headerLeft: () => {
      return (
        <CustomMenuButton
          name="ios-menu"
          onPress={() => navdata.navigation.openDrawer()}
        />
      );
    },
    headerTitleStyle: {
      alignSelf: 'center',
    },
  };
};
