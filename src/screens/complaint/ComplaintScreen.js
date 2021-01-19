/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
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
import moment from 'moment';
import momentLocale from 'moment/locale/id';
import {ToggleHeader} from '../../components';
import Colors from '../../utils/Colors';
import Api from '../../utils/Api';

moment.locale('id', momentLocale);

function ComplaintScreen(props) {
  const [state, setState] = useState({
    errors: null,
    search: '',
    page: 1,
    total: 0,
    loading: false,
    complaints: [],
  });

  const fetchComplaints = async () => {
    console.log('Search', state.search);
    try {
      const {data, status} = await Api.get(
        `/complaints?page=${state.page}&search=${state.search}`,
      );

      if (status === 200) {
        if (data.data.length > 0) {
          setState({
            ...state,
            complaints:
              state.page > 1 ? [...state.complaints, ...data.data] : data.data,
            loading: false,
          });
        }
      }
    } catch (err) {
      setState({
        ...state,
        errors: err.response,
        loading: false,
      });
    }
  };

  useEffect(() => {
    setState({...state, loading: true});
    fetchComplaints();
    return () => {};
  }, [state.page, state.search]);

  const loadMore = () => {
    setState({
      ...state,
      page: state.page + 1,
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
    if (state.total <= 0) {
      return null;
    }

    if (state.loading) {
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
        {state.total >= state.complaints.length ? null : (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={loadMore}
            style={styles.buttonLoad}>
            <Text style={styles.buttonLoadText}>Selanjutnya</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const onChangeTextHandle = (text) => {
    setState({...state, search: text});
  };

  const onSearchHandle = () => {};

  return (
    <SafeAreaView style={styles.cover}>
      <View style={styles.container}>
        <View style={styles.firstContainer}>
          <View style={{width: '100%', flexDirection: 'row'}}>
            <View style={{width: '80%', marginLeft: 10}}>
              <TextInput
                autoCorrect={true}
                autoCapitalize="none"
                style={styles.textInputSearch}
                placeholder="Cari data pengaduan"
                onChangeText={(value) => onChangeTextHandle(value)}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={{width: '20%', padding: 10}}>
              <TouchableOpacity onPress={onSearchHandle}>
                <Icon name="search1" size={25} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.coverFlat}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                List Data Pengaduan
              </Text>
            </View>

            <FlatList
              style={styles.cover}
              data={state.complaints}
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
            <View style={styles.coverButtonAdd}>
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
              Total Row Data {state.total}
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
  coverButtonAdd: {
    width: '15%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const optionComplaint = (navdata) => {
  return {
    headerTitle: 'List Pengaduan',
    headerLeft: () => {
      return (
        <ToggleHeader
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

export default ComplaintScreen;
