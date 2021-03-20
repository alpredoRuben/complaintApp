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
import {Button, RadioButton, FAB} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

import Colors from '../../utils/Colors';
import Api from '../../utils/Api';
import Authorization from '../../utils/Authorization';
import {useSelector} from 'react-redux';

const elements = (slug) => {
  if (slug == 'admin' || slug == 'customer') {
    return [
      {
        key: 'not_assigned',
        title: 'Menunggu Disetujui',
      },
      {
        key: 'assigned_accepted',
        title: 'Distujui & Dikerjakan',
      },
      {
        key: 'finished',
        title: 'Sudah Selesai',
      },
    ];
  }

  return [
    {
      key: 'assigned_accepted',
      title: 'Distujui & Dikerjakan',
    },
    {
      key: 'finished',
      title: 'Sudah Selesai',
    },
  ];
};

function ComplaintScreen(props) {
  const {userInfo} = useSelector((state) => state.AuthReducer);
  const [filters, setFilters] = useState({
    dates: moment().format('YYYY-MM-DD'),
    category:
      userInfo.user.roles[0].slug === 'admin' ||
      userInfo.user.roles[0].slug === 'customer'
        ? 'not_assigned'
        : 'assigned_accepted',
    refresh: false,
  });

  const [dataSource, setDataSource] = useState({
    errors: null,
    page: 1,
    total: 0,
    loading: false,
    complaints: [],
  });

  const fetchComplaints = async () => {
    try {
      const results = await Api.get(
        `/complaints?page=${dataSource.page}&dates=${filters.dates}&sentences=${filters.category}`,
        Authorization(userInfo.token),
      );

      console.log('Records Complaint', results);

      if (results.status == 200) {
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
    } catch (error) {
      setDataSource({
        ...dataSource,
        errors: error.response.data,
        loading: false,
      });
    }

    setFilters({...filters, refresh: false});
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      console.log('Running Event Screen Focus');
      setDataSource({
        ...dataSource,
        products: [],
        page: 1,
        total: 0,
        loading: true,
      });
      setFilters({
        ...filters,
        dates: moment().format('YYYY-MM-DD'),
        category:
          userInfo.user.roles[0].slug === 'admin' ||
          userInfo.user.roles[0].slug === 'customer'
            ? 'not_assigned'
            : 'assigned_accepted',
        refresh: true,
      });
    });

    console.log('Filters', filters);
    fetchComplaints();

    return () => {
      unsubscribe;
    };
  }, [dataSource.page, filters.refresh]);

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

  const generateMoreString = (str) => {
    if (str.length >= 100) {
      return str.substring(0, 100) + '...(lainnya)';
    }
    return str;
  };

  /** RENDER ITEM */
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => showDetailComplaint(item)}>
        <View
          style={[
            styles.rowItemContainer,
            {
              shadowColor: '#082f69',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            },
          ]}>
          <View style={styles.rowItemLeft}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: '#a65e08',
                marginTop: 10,
              }}>
              Uraian Pengaduan
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
                <Text style={{fontSize: 11}}>
                  {item.executor.name + ' (' + item.types.name + ')'}
                </Text>
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

            {item.types && item.types !== null && (
              <Text style={styles.rowItemInfo('#70035c')}>
                {`TUJUAN ${item.types.name.toUpperCase()}`}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  /** RENDER FOOTER */
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

  /** ON SUBMIT FILTER */
  const onSubmitFilterHandler = () => {
    setDataSource({
      ...dataSource,
      loading: true,
    });

    console.log('Filters', filters);

    fetchComplaints();
  };

  /** ON SUBMIT REFRESH */
  const onSubmitRefreshHandler = () => {
    setFilters({
      ...filters,
      dates: moment().format('YYYY-MM-DD'),
      category:
        userInfo.user.roles[0].slug === 'admin' ||
        userInfo.user.roles[0].slug === 'customer'
          ? 'not_assigned'
          : 'assigned_accepted',
      refresh: true,
    });
  };

  return (
    <SafeAreaView style={{flex: 1, margin: 0}}>
      <View style={{flex: 1, flexDirection: 'column', margin: 0}}>
        {/* FILTER */}
        <View
          style={{
            flex: 2,
            padding: 5,
            borderBottomRightRadius: 50,
            backgroundColor: '#f7f7f7',
            shadowColor: '#e8eaed',
            elevation: 12,
          }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{flex: 1, padding: 5, justifyContent: 'flex-start'}}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                  Filter Pengaduan
                </Text>
              </View>
              <View style={{flexDirection: 'column'}}>
                <View style={{marginVertical: 5}}>
                  <Text style={{fontSize: 11, paddingVertical: 5}}>
                    Tanggal Pengaduan
                  </Text>
                  <DatePicker
                    style={{width: '100%'}}
                    date={filters.dates}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="1945-08-17"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0,
                      },
                      dateInput: {
                        borderColor: '#85a6a6',
                      },
                    }}
                    onDateChange={(date) => {
                      setFilters({...filters, dates: date});
                    }}
                  />
                </View>

                <View style={{marginVertical: 5}}>
                  <Text style={{fontSize: 11, paddingVertical: 5}}>
                    Kategori Pengaduan
                  </Text>
                  <RadioButton.Group
                    onValueChange={(newValue) =>
                      setFilters({...filters, category: newValue})
                    }
                    value={filters.category}>
                    {elements(userInfo.user.roles[0].slug).map((item) => (
                      <View style={{flexDirection: 'row'}} key={item.key}>
                        <View
                          style={{
                            width: '10%',
                            justifyContent: 'center',
                          }}>
                          <RadioButton value={item.key} />
                        </View>
                        <View
                          style={{
                            width: '90%',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                          }}>
                          <Text>{item.title}</Text>
                        </View>
                      </View>
                    ))}
                  </RadioButton.Group>
                </View>

                <View style={{marginVertical: 5}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Button
                      icon="filter"
                      style={{
                        height: 30,
                        width: 120,
                        marginHorizontal: 2,
                        backgroundColor: '#0a348a',
                        borderRadius: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      mode="contained"
                      onPress={onSubmitFilterHandler}>
                      FILTER
                    </Button>

                    <Button
                      icon="refresh"
                      style={{
                        height: 30,
                        width: 120,
                        marginHorizontal: 2,
                        backgroundColor: '#048f81',
                        borderRadius: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      mode="contained"
                      onPress={onSubmitRefreshHandler}>
                      REFRESH
                    </Button>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* FLATLIST */}
        <View
          style={{
            flex: 6,
          }}>
          <View style={{flex: 1, padding: 5}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold', marginVertical: 10}}>
                Data Pengaduan
              </Text>
            </View>
            {dataSource.complaints.length > 0 ? (
              <FlatList
                style={{flex: 1}}
                data={dataSource.complaints}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                enableEmptySections={true}
                ListFooterComponent={renderFooter}
              />
            ) : (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 14, color: '#916306'}}>
                  DATA PENGADUAN KOSONG
                </Text>
              </View>
            )}
          </View>
        </View>

        <View
          style={{
            height: '10%',
            backgroundColor: '#f2f7fa',
          }}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 13,
                  color: Colors.PrimaryBackground,
                  fontWeight: 'bold',
                }}>
                Total Data Row
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: Colors.PrimaryBackground,
                  fontWeight: 'bold',
                }}>
                {dataSource.total}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {userInfo.user.roles[0].slug === 'customer' && (
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
    backgroundColor: '#d5e0eb',
    flexDirection: 'row',
    borderColor: '#bfd0e0',
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
