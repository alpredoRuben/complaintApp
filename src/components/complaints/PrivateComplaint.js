/* eslint-disable react-native/no-inline-styles */
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
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../../utils/Colors';
import Api from '../../utils/Api';
import Authorization from '../../utils/Authorization';
import {useSelector} from 'react-redux';
import {ButtonGroup} from 'react-native-elements';

const elements = [
  {
    element: () => <Text style={styles.elementsText}>Menunggu Disetujui</Text>,
    key: 'wait',
  },
  {
    element: () => <Text style={styles.elementsText}>Disetujui</Text>,
    key: 'assign',
  },
  {
    element: () => <Text style={styles.elementsText}>Dikerjakan</Text>,
    key: 'work',
  },
  {
    element: () => <Text style={styles.elementsText}>Selesai</Text>,
    key: 'finish',
  },
];

export default function PrivateComplaint(props) {
  const {userInfo} = useSelector((state) => state.AuthReducer);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [dataSource, setDataSource] = useState({
    errors: null,
    search: '',
    page: 1,
    total: 0,
    loading: false,
    complaints: [],
  });

  const fetchComplaints = async () => {
    try {
      const results = await Api.get(
        `/complaints?page=${dataSource.page}&search=${dataSource.search}&sentences=${elements[selectedIndex].key}`,
        Authorization(userInfo.token),
      );

      console.log('RESULTS', results);

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
    console.log('Now Data Source is', dataSource);
    console.log('Now Selected Index is', selectedIndex);
    fetchComplaints();
    return () => {};
  }, [dataSource.page, dataSource.search, selectedIndex]);

  const loadMore = (p) => {
    setDataSource({
      ...dataSource,
      page: p,
      loading: true,
    });
    fetchComplaints();
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.rowItemContainer}>
        <View style={styles.rowItemLeft}>
          <Text style={styles.rowItemTitle}>{item.type_complaint.title}</Text>
          <Text style={styles.rowItemMessage}>{item.messages}</Text>
          <Text style={styles.rowItemTime}>{item.created_at}</Text>
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
    if (dataSource.total <= 0) {
      return null;
    }

    if (dataSource.loading) {
      return (
        <View
          style={{
            paddingVertical: 20,
            borderTopWidth: 1,
            borderColor: '#CED0CE',
          }}>
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

  const onChangeTextHandle = (text) => {
    setDataSource({...dataSource, search: text});
  };

  const onSearchHandle = () => {
    console.log(dataSource.search);
  };

  const updateSelectedIndex = (s) => {
    setSelectedIndex(s);
    setDataSource({
      ...dataSource,
      page: 1,
      loading: true,
    });
  };

  return (
    <SafeAreaView style={styles.cover}>
      <View style={styles.container(2, 'column')}>
        <View
          style={{
            height: '10%',
            width: '100%',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,

            elevation: 9,
          }}>
          <ButtonGroup
            onPress={updateSelectedIndex}
            buttons={elements}
            selectedIndex={selectedIndex}
            containerStyle={{marginHorizontal: 5, marginTop: 10}}
            buttonStyle={{
              padding: 10,
              backgroundColor: '#029ea1',
              borderWidth: 1,
              borderColor: '#fff',
            }}
          />
        </View>

        <View style={styles.firstColumn}>
          <View style={styles.topContainerColumn}>
            <View style={styles.container(1, 'row')}>
              <View style={styles.topLeftColumn}>
                <TextInput
                  autoCorrect={true}
                  autoCapitalize="none"
                  style={styles.textInputSearch}
                  placeholder="Cari data pengaduan"
                  onChangeText={(value) => onChangeTextHandle(value)}
                  underlineColorAndroid="transparent"
                />
              </View>
              <View style={styles.topRightColumn}>
                <TouchableOpacity onPress={onSearchHandle}>
                  <Icon name="search1" size={25} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.buttomContainerColumn}>
            <View style={styles.container(2, 'column')}>
              <View style={styles.middleCoverTitle}>
                <Text style={styles.middleTitle}>List Data Pengaduan</Text>
              </View>

              <View style={styles.middleFlatList}>
                <FlatList
                  style={styles.cover}
                  data={dataSource.complaints}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                  enableEmptySections={true}
                  ListFooterComponent={renderFooter}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.secondColumn}>
          <View style={styles.container(1, 'row')}>
            <View style={styles.secondLeftCover}>
              <TouchableOpacity
                style={styles.coverButtonAdd}
                onPress={() => props.navigation.navigate('AddComplaintScreen')}>
                <View style={styles.coverIconButtonAdd}>
                  <Icon name="pluscircleo" size={23} color={Colors.White} />
                </View>
                <View style={styles.coverTextButtonAdd}>
                  <Text style={{fontSize: 20, color: Colors.White}}>
                    Buat Pengaduan
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.secondRightCover}>
              <Text style={styles.secondRightInfoText}>Total Data Row</Text>
              <Text style={styles.secondRightInfoText}>{dataSource.total}</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  elementsText: {
    color: 'white',
    fontSize: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  cover: {flex: 1},
  container: (number, direction) => ({flex: number, flexDirection: direction}),
  firstColumn: {
    width: '100%',
    height: '80%',
    justifyContent: 'center',
    position: 'relative',
    flex: 2,
    marginTop: 20,
    flexDirection: 'column',
    backgroundColor: '#f7f7f7',
  },

  topContainerColumn: {
    height: '10%',
    alignContent: 'center',
    alignItems: 'center',
    padding: '2%',
  },

  topLeftColumn: {width: '80%', marginLeft: 10},
  topRightColumn: {width: '20%', padding: 10},

  buttomContainerColumn: {height: '90%', padding: '2%'},

  middleCoverTitle: {
    width: '100%',
    height: '5%',
    justifyContent: 'center',
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
    width: '40%',
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
