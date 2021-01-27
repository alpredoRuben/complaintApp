/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {ToggleHeader, CardInfo} from '../../components';
import Api from '../../utils/Api';
import Authorization from '../../utils/Authorization';

function DashboardScreen(props) {
  const {userInfo} = useSelector((state) => state.AuthReducer);
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);

  const fetchInfo = async () => {
    try {
      const results = await Api.get(
        '/information/complaints',
        Authorization(userInfo.token),
      );
      console.log(results);
      if (results.status === 200) {
        setInfo(results.data.info);
      }
    } catch (err) {
      setError('Error Fetch Data');
    }
  };

  useEffect(() => {
    console.log(userInfo);
    fetchInfo();
    return () => {};
  }, []);

  if (info === null || error !== null) {
    return (
      <SafeAreaView style={styles.cover}>
        <ScrollView style={styles.horizonMargin(10)}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 18}}>{error}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.cover}>
      <ScrollView style={styles.horizonMargin(10)}>
        <View style={styles.cardCover}>
          <CardInfo
            title="Pengaduan"
            number={info.totalComplaint}
            type="font-awesome-5"
            iconName="envelope-open-text"
            arrayColors={['#78e60b', '#6b9e37', '#4d9406']}
          />

          <CardInfo
            title="Menunggu Disetujui"
            number={info.totalNotAssignedComplaint}
            type="font-awesome-5"
            iconName="pause-circle"
            arrayColors={['#f5c453', '#f2ab05', '#b37e04']}
          />

          <CardInfo
            title="Disetujui"
            number={info.totalAssignedComplaint}
            type="font-awesome-5"
            iconName="handshake"
            arrayColors={['#389bd9', '#0793eb', '#045d94']}
          />

          <CardInfo
            title="Sedang Dikerjakan"
            number={info.totalWorkingComplaint}
            type="font-awesome-5"
            iconName="sync-alt"
            arrayColors={['#07eb9f', '#3dba91', '#0d8c62']}
          />

          <CardInfo
            title="Selesai Dikerjakan"
            number={info.totalFinishedComplaint}
            type="font-awesome-5"
            iconName="check-circle"
            arrayColors={['#3845e0', '#1d2582', '#050f85']}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export const optionDashboard = (props) => ({
  headerTitle: 'Dashboard',
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
});

const styles = StyleSheet.create({
  cover: {flex: 1, paddingVertical: '1%'},
  horizonMargin: (n) => ({marginHorizontal: n}),
  centerWidth: (w) => ({
    width: w,
    alignItems: 'center',
  }),
  cardCover: {
    flex: 1,
    flexDirection: 'column',
  },

  linearGradient: {
    height: 50,
    marginVertical: 10,
  },

  rowDirection: {flex: 1, flexDirection: 'row'},
  iconCover: {width: '15%', padding: 5, alignItems: 'center'},
  cardTitle: {
    marginVertical: 15,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f7f7f7',
  },

  cardInfo: {
    marginVertical: 15,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f7f7f7',
  },
});

export default DashboardScreen;
