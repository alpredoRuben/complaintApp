/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {CustomMenuButton} from '../components';
import Api from '../utils/Api';
import Colors from '../utils/Colors';
import {ComplaintTypeStyle} from './styles/ComplaintStyle';

const styles = ComplaintTypeStyle;

export default function ComplaintTypeScreen(props) {
  const [pageCurrent, setPageCurrent] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const getData = async () => {
    try {
      const {data} = await Api.get(`/complaint_types?page=${pageCurrent}`);
      setDataSource([...dataSource, ...data.data]);
      setIsLoading(false);
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    console.log('Run UseEffect');
    console.log('useEffect PageCurrent', pageCurrent);
    setIsLoading(true);
    getData();
    return () => {};
  }, [pageCurrent]);

  //On Handle Load More
  const onLoadMoreHandle = () => {
    console.log('You take load more handle');
    setPageCurrent(pageCurrent + 1);
    setIsLoading(true);
    getData();
  };

  //Render Item
  const renderItem = ({item}) => {
    return (
      <View style={styles.itemRowCover}>
        <Text style={styles.itemTextTitle}>
          {item.id}. {item.title}
        </Text>
      </View>
    );
  };

  //Render Footer
  const renderFooter = () => {
    return (
      <View style={styles.footerLoadCover}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onLoadMoreHandle}
          style={styles.buttonLoad}>
          <Text style={styles.buttonLoadText}>SELANJUTNYA</Text>
          {isLoading ? (
            <ActivityIndicator
              color={Colors.White}
              style={styles.activityIndicator}
            />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.coverArea}>
      <View style={styles.container}>
        <FlatList
          style={styles.flatList}
          data={dataSource}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          enableEmptySections={true}
          ListFooterComponent={renderFooter}
        />
      </View>
    </SafeAreaView>
  );
}

export const ComplaintTypeScreenOptions = (navdata) => {
  return {
    headerTitle: 'Jenis Pengaduan',
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
