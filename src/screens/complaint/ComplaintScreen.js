/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Button, Searchbar, FAB} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import moment from 'moment';
import Colors from '../../utils/Colors';
import Api from '../../utils/Api';
import Authorization from '../../utils/Authorization';
import {ToggleHeader} from '../../components';
import {useSelector} from 'react-redux';

const elements = [
  {
    element: () => <Text style={styles.elementsText}>Menunggu Disetujui</Text>,
    key: 'not_assigned',
    title: 'Menunggu Disetujui',
  },
  {
    element: () => <Text style={styles.elementsText}>Disetujui</Text>,
    key: 'assigned_accepted',
    title: 'Distujui & Dikerjakan',
  },
  {
    element: () => <Text style={styles.elementsText}>Selesai</Text>,
    key: 'finished',
    title: 'Sudah Selesai',
  },
];

function ComplaintScreen(props) {
  const {userInfo} = useSelector((state) => state.AuthReducer);
  const [selectedIndex, setSelectedIndex] = useState(
    userInfo.user.roles[0].slug === 'admin' ||
      userInfo.user.roles[0].slug === 'pegawai'
      ? 0
      : 1,
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [dataSource, setDataSource] = useState({
    errors: null,
    page: 1,
    total: 0,
    loading: false,
    complaints: [],
  });

  const [subtitle, setSubtitle] = useState(elements[0].title);

  const fetchComplaints = async () => {
    try {
      const results = await Api.get(
        `/complaints?page=${dataSource.page}&search=${searchQuery}&sentences=${elements[selectedIndex].key}`,
        Authorization(userInfo.token),
      );
      console.log('Complaint Screen', results);
      if (results.status === 200) {
        if (dataSource.page === 1) {
          setDataSource({
            ...dataSource,
            complaints: results.data.data,
            loading: false,
            total: results.data.total,
          });
        } else {
          setDataSource({
            ...dataSource,
            complaints: [...dataSource.complaints, ...results.data.data],
            loading: false,
            total: results.data.total,
          });
        }
      }
    } catch (err) {
      setDataSource({
        ...dataSource,
        errors: err.response,
        loading: false,
      });
    }
  };

  useEffect(() => {
    fetchComplaints();
    return () => {};
  }, [dataSource.page, searchQuery, selectedIndex, subtitle]);

  const loadMore = (p) => {
    setDataSource({
      ...dataSource,
      page: p,
      loading: true,
    });
    fetchComplaints();
  };

  const showDetailComplaint = (item) => {
    props.navigation.navigate('ComplaintStackScreen', {
      screen: 'DetailComplaintScreen',
      params: {id: item.id},
    });
  };

  if (!userInfo) {
    return props.navigation.navigate('LoginScreen');
  }

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => showDetailComplaint(item)}>
        <View style={styles.rowItemContainer}>
          <View style={styles.rowItemLeft}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: '#03718a',
              }}>
              Judul Pengaduan
            </Text>
            <Text style={{fontSize: 11, color: 'black'}}>{item.title}</Text>

            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: '#03718a',
                marginTop: 10,
              }}>
              Pesan Pengaduan
            </Text>

            <Text style={{fontSize: 11, color: 'black'}}>
              {generateMoreString(item.messages)}
            </Text>
            {userInfo.user.roles[0].slug === 'admin' && item.sender && (
              <>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: '#03718a',
                    marginTop: 10,
                  }}>
                  Pengirim Pesan Pengaduan
                </Text>
                <Text style={{fontSize: 11}}>{item.sender.name}</Text>
              </>
            )}

            {item.executor && (
              <>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: '#03718a',
                    marginTop: 10,
                  }}>
                  Pelaksana Pengaduan
                </Text>
                <Text style={{fontSize: 11}}>{item.executor.name}</Text>
              </>
            )}
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: '#03718a',
                marginTop: 10,
              }}>
              Waktu Pengiriman Pesan
            </Text>
            <Text style={{fontSize: 11}}>
              {moment(item.created_at).format('DD MMM YYYY, HH:mm:ss')}
            </Text>
          </View>

          <View style={styles.rowItemRight}>
            <Text
              style={styles.rowItemInfo(item.is_urgent ? '#0fa811' : '#777')}>
              {item.is_urgent ? 'BERITA PENTING' : 'BERITA BIASA'}
            </Text>

            <Text
              style={styles.rowItemInfo(
                item.is_finished ? '#038c05' : '#b9cc0a',
              )}>
              {item.is_finished ? 'SELESAI' : 'BELUM SELESAI'}
            </Text>

            {userInfo.user.roles[0].slug !== 'pegawai' ? (
              <Text
                style={styles.rowItemInfo(
                  item.assigned != null && item.assigned.is_accepted
                    ? '#0f8009'
                    : '#c97602',
                )}>
                {item.assigned != null && item.assigned.is_accepted
                  ? 'TELAH DIKONFIRMASI'
                  : 'MENUNGGU KONFIRMASI'}
              </Text>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  //Render Footer
  const renderFooter = () => {
    if (dataSource.total <= 0) {
      return null;
    }

    if (dataSource.loading) {
      return (
        <View style={styles.FABS}>
          <ActivityIndicator animating size="large" />
        </View>
      );
    }

    return (
      <View style={styles.footerLoadCover}>
        {dataSource.total >= dataSource.complaints.length ? null : (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={loadMore(dataSource.page + 1)}
            style={styles.buttonLoad}>
            <Text style={styles.buttonLoadText}>Selanjutnya</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  const updateSelectedIndex = (s) => {
    setSelectedIndex(s);
    setSubtitle(elements[s].title);
    setDataSource({
      ...dataSource,
      page: 1,
      loading: true,
    });
  };

  const generateMoreString = (str) => {
    if (str.length >= 100) {
      return str.substring(0, 100) + '...(lainnya)';
    }
    return str;
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View
          style={{
            height: '8%',
            width: '100%',
            margin: 5,
          }}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}>
              {elements.map((item, index) => {
                if (item.key === 'not_assigned') {
                  if (
                    userInfo.user.roles[0].slug === 'admin' ||
                    userInfo.user.roles[0].slug === 'pegawai'
                  ) {
                    return (
                      <View
                        key={`BUTTON-${index}-${item.key}`}
                        style={{
                          flex: 1,
                          marginHorizontal: 10,
                          width: '50%',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Button
                          key={`${item.key}-${index}`}
                          mode="contained"
                          style={{
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            backgroundColor:
                              selectedIndex == index ? '#850391' : '#777',
                            borderRadius: 5,
                          }}
                          onPress={() => updateSelectedIndex(index)}>
                          <Text style={styles.elementsText}>{item.title}</Text>
                        </Button>
                      </View>
                    );
                  }
                  return null;
                } else {
                  return (
                    <View
                      key={`BUTTON-${index}-${item.key}`}
                      style={{
                        flex: 1,
                        marginHorizontal: 10,
                        width: '50%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Button
                        key={`${item.key}-${index}`}
                        mode="contained"
                        style={{
                          height: 50,
                          width: '100%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor:
                            selectedIndex == index ? '#850391' : '#777',
                          borderRadius: 5,
                        }}
                        onPress={() => updateSelectedIndex(index)}>
                        <Text style={styles.elementsText}>{item.title}</Text>
                      </Button>
                    </View>
                  );
                }
              })}
            </ScrollView>
          </View>
        </View>

        <View
          style={{
            height: '5%',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <View style={styles.middleCoverTitle}>
            <Text style={styles.middleTitle}>{subtitle}</Text>
          </View>
        </View>

        <View
          style={{
            height: '10%',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 5,
          }}>
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
        </View>

        <View style={{height: '65%', padding: 10}}>
          <FlatList
            style={styles.cover}
            data={dataSource.complaints}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            enableEmptySections={true}
            ListFooterComponent={renderFooter}
          />
        </View>

        <View style={styles.secondColumn}>
          <View style={styles.container(1, 'row')}>
            <View style={styles.secondRightCover}>
              <Text style={styles.secondRightInfoText}>Total Data Row</Text>
              <Text style={styles.secondRightInfoText}>{dataSource.total}</Text>
            </View>
          </View>
        </View>
      </View>
      {userInfo.user.roles[0].slug === 'pegawai' && (
        <FAB
          style={styles.FABS}
          icon="plus"
          small
          onPress={() =>
            props.navigation.navigate('ComplaintStackScreen', {
              screen: 'AddComplaintScreen',
            })
          }
        />
      )}
    </SafeAreaView>
  );
}

export const optionComplaint = (props) => {
  return {
    headerTitle: 'List Pengaduan',
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
  elementsText: {
    color: 'white',
    fontSize: 9,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  cover: {flex: 1},
  container: (number, direction) => ({flex: number, flexDirection: direction}),
  firstColumn: {
    height: '80%',
    justifyContent: 'center',
    flex: 1,
    marginTop: 20,
    flexDirection: 'column',
    backgroundColor: '#f7f7f7',
  },

  topContainerColumn: {
    height: '5%',
  },

  topLeftColumn: {width: '80%', marginLeft: 10},
  topRightColumn: {width: '20%', padding: 10},

  buttomContainerColumn: {height: '90%', padding: '2%'},

  middleCoverTitle: {
    height: '5%',
    alignItems: 'center',
    marginBottom: 20,
  },
  middleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  middleFlatList: {width: '100%', height: '90%'},

  secondColumn: {width: '100%', height: '10%'},

  secondLeftCover: {width: '60%'},

  coverButtonAdd: {
    backgroundColor: '#03a8a0',
    marginVertical: '5%',
    marginHorizontal: '2%',
    flex: 1,
    padding: '2%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
  },

  coverIconButtonAdd: {
    width: '15%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  coverTextButtonAdd: {width: '85%', marginLeft: 10},

  secondRightCover: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  fullRightCover: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  secondRightInfoText: {
    fontSize: 13,
    color: Colors.PrimaryBackground,
    fontWeight: 'bold',
  },

  textInputSearch: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    borderColor: '#009688',
    backgroundColor: Colors.White,
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
  rowItemTime: {fontSize: 10, fontWeight: 'bold', marginTop: 10},

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
  FABS: {
    position: 'absolute',
    margin: 12,
    right: 0,
    bottom: 0,
  },
});

export default ComplaintScreen;
