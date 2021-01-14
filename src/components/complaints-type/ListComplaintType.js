import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Api from '../../utils/Api';
import Colors from '../../utils/Colors';

const ListComplaintType = (props) => {
  const [dataSource, setDataSource] = useState(props.dataList.data);
  const [pageCurrent, setPageCurrent] = useState(props.dataList.current_page);
  const total = props.dataList.total;

  const getData = async () => {
    try {
      const {data} = await Api.get(
        `/complaint_types?page=${pageCurrent}&roleId=${props.selectMenu.id}`,
      );
      setDataSource([...dataSource, ...data.data]);
    } catch (err) {
      console.log(err.response);
    }
  };

  const loadMoreData = () => {
    if (dataSource.length !== total) {
      setPageCurrent(pageCurrent + 1);
      getData();
    }
  };

  //Render Item
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.itemRowCover}>
        <Text style={styles.itemTextTitle}>
          {index + 1}. {item.title} [{item.role_id}]
        </Text>
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View style={styles.footerLoadCover}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={loadMoreData}
          style={styles.buttonLoad}>
          <Text style={styles.buttonLoadText}>
            {total === dataSource.length ? 'Complete' : 'Load More'}
          </Text>
          {/* {total === dataSource.length ? null : (
            <ActivityIndicator
              color={Colors.White}
              style={styles.activityIndicator}
            />
          )} */}
        </TouchableOpacity>
      </View>
    );
  };

  console.log(dataSource);

  return (
    <SafeAreaView style={styles.coverArea}>
      <View style={styles.container}>
        <View>
          <Text style={styles.titleFlat}>
            Jenis Pengaduan Bagian {props.selectMenu.name}
          </Text>
        </View>

        <View style={styles.coverFlat}>
          <FlatList
            style={styles.flatList}
            keyExtractor={(item, index) => item.id + '-' + index}
            data={dataSource}
            renderItem={renderItem}
            onEndReachedThreshold={0.1}
            onEndReached={loadMoreData}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListFooterComponent={renderFooter}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  coverArea: {flex: 1},
  container: {justifyContent: 'center', alignItems: 'center', padding: 10},
  titleFlat: {fontSize: 16, fontWeight: 'bold'},
  coverFlat: {marginTop: 2},
  flatList: {width: '100%', marginBottom: 10},

  loadingIndicator: {alignItems: 'center', justifyContent: 'center'},
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
  separator: {
    height: 0.5,
    backgroundColor: Colors.DarkCyan,
    marginHorizontal: 10,
  },

  footerLoadCover: {
    padding: 5,
    marginHorizontal: 10,
    marginBottom: 40,
  },
  buttonLoad: {
    padding: 10,
    backgroundColor: Colors.PrimaryBackground,
  },
  buttonLoadText: {
    color: Colors.White,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  activityIndicator: {marginLeft: 20},
});

export default ListComplaintType;
