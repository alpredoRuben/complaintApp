/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import Api from '../../utils/Api';
import Colors from '../../utils/Colors';
import {ToggleHeader, TypeItem} from '../../components';

const {width} = Dimensions.get('screen');

function TypeComplaintScreen(props) {
  const [dataRoles, setDataRoles] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [roleId, setRoleId] = useState(3);
  const [isChange, setIsChange] = useState(false);
  const [total, setTotal] = useState(0);

  const fetchRoles = async () => {
    const result = await Api.get('/roles/type/complaint');
    setDataRoles(result.data);
  };

  const fetchTypeComplaint = async () => {
    const result = await Api.get(
      `/complaint_types?page=${pageCurrent}&roleId=${roleId}`,
    );
    setTotal(result.data.total);
    if (isChange === true) {
      setDataSource(result.data.data);
      setIsChange(false);
    } else {
      const mergeData = [...dataSource, ...result.data.data];
      setDataSource(mergeData);
    }
  };

  const reqComplaintType = (id) => {
    console.log('Choose Component');
    setIsChange(true);
    setRoleId(id);
    setPageCurrent(1);
  };

  const loadMore = () => {
    console.log('Component Load More');
    setPageCurrent(pageCurrent + 1);
    fetchTypeComplaint(roleId);
  };

  useEffect(() => {
    console.log('Component Did Mount');
    fetchRoles();
    fetchTypeComplaint();
    return () => {};
  }, []);

  useEffect(() => {
    console.log('Component Did Update Page Or Role');
    fetchTypeComplaint();
    return () => {};
  }, [pageCurrent, roleId]);

  //Render Item
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.flatRowItem}>
        <Text style={styles.flatRowItemText}>
          {index + 1}. {item.title} [{item.role_id}]
        </Text>
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View style={styles.flatFooter}>
        {dataSource.length < total ? (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={loadMore}
            style={styles.flatButtonLoad}>
            <Text style={styles.flatTextLoad}>Load More</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.flatFinished}>
            <Text style={styles.flatTextLoad}>End Of Data</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.cover}>
      <View style={styles.container}>
        <View style={styles.topRow}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.coverColumn}>
              {dataRoles.map((item) => {
                return (
                  <TypeItem
                    key={`menu_${item.slug}_${item.id}`}
                    title={item.name}
                    onPressHandler={() => reqComplaintType(item.id)}
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>

        <View style={styles.buttomRow}>
          <SafeAreaView style={styles.flatCoverArea}>
            <View style={styles.flatContainer}>
              <FlatList
                style={styles.flatList}
                data={dataSource}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                enableEmptySections={true}
                ItemSeparatorComponent={() => (
                  <View style={styles.flatSeparator} />
                )}
                ListFooterComponent={renderFooter}
              />
            </View>
          </SafeAreaView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cover: {flex: 1},
  container: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  topRow: {height: 50},
  buttomRow: {height: '100%'},
  containerRow: {width: width, backgroundColor: 'green'},
  coverColumn: {flex: 1, flexDirection: 'row'},
  loadingData: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  textInfo: {fontSize: 18, fontWeight: 'bold'},
  emptyContainer: {
    marginVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  //FlatListStyle
  flatCoverArea: {flex: 1},
  flatContainer: {justifyContent: 'center', alignItems: 'center', padding: 10},
  flatList: {width: '100%', marginBottom: 10},
  flatRowItem: {
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
  flatRowItemText: {fontSize: 16, marginHorizontal: 15, marginVertical: 5},
  flatSeparator: {
    height: 0.5,
    backgroundColor: Colors.DarkCyan,
    marginHorizontal: 10,
  },
  flatFooter: {
    padding: 5,
    marginHorizontal: 10,
    marginBottom: 40,
  },
  flatButtonLoad: {
    padding: 10,
    backgroundColor: Colors.PrimaryBackground,
  },
  flatFinished: {
    padding: 10,
    backgroundColor: Colors.LightGray,
  },
  flatTextLoad: {
    color: Colors.White,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  flatIndicator: {marginLeft: 20},
});

export const optionTypeComplaint = (navdata) => {
  return {
    headerTitle: 'Jenis Pengaduan',
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

export default TypeComplaintScreen;
