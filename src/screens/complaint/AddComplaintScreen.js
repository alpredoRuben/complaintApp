/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {ToggleHeader} from '../../components';
import Api from '../../utils/Api';
import Colors from '../../utils/Colors';
import {useSelector} from 'react-redux';
import Authorization from '../../utils/Authorization';

export default function AddComplaintScreen(props) {
  const {userInfo} = useSelector((state) => state.AuthReducer);
  const [roles, setRoles] = useState([]);
  const [complaint, setComplaint] = useState({
    title: '',
    messages: '',
    is_urgent: false,
    type_id: null,
  });

  const fetchRoles = async () => {
    try {
      const {data, status} = await Api.get(
        '/operational/roles',
        Authorization(userInfo.token),
      );

      if (status === 200) {
        let r = [];
        for (let i = 0; i < data.length; i++) {
          const element = {
            label: data[i].name,
            value: data[i].id,
          };
          r.push(element);
        }

        setRoles(r);
      }
    } catch (err) {}
  };

  const onChangeRoles = (item) => {
    setComplaint({...complaint, type_id: item.value});
  };

  const complaintChangeHandler = (key, value) => {
    setComplaint({...complaint, [key]: value});
  };

  const sendComplaint = async () => {
    try {
      const {data, status} = await Api.post(
        '/complaints',
        complaint,
        Authorization(userInfo.token),
      );

      if (status === 200) {
        Alert.alert('BERHASIL', data.message, [
          {
            text: 'OK',
            onPress: () => {
              props.navigation.replace('ComplaintScreen');
            },
          },
        ]);
      }
    } catch (err) {
      Alert.alert(
        'GAGAL',
        err.response.data.message,
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    }
  };

  const submitComplaintHandler = () => {
    sendComplaint();
  };

  useEffect(() => {
    fetchRoles();
    return () => {};
  }, [props.navigation]);

  return (
    <SafeAreaView style={styles.cover}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.titleText}>Kirim Pengaduan Baru</Text>

          {/* Field Tujuan */}
          <View style={styles.separator}>
            <Text style={styles.headingText}>Tujuan</Text>
            <SelectBoxItem
              sources={roles}
              onChangeItem={(item) => onChangeRoles(item)}
              placeholder="Tujuan Pengaduan"
            />
          </View>

          {/* Judul Pengaduan */}
          <View style={styles.separator}>
            <Text style={styles.headingText}>Judul</Text>
            <TextInput
              style={styles.textDefault}
              onChangeText={(val) => complaintChangeHandler('title', val)}
              value={complaint.title}
              textAlignVertical="top"
            />
          </View>

          {/* Pesan */}
          <View style={styles.separator}>
            <Text style={styles.headingText}>Pesan</Text>
            <TextInput
              multiline={true}
              style={styles.textMultiline}
              onChangeText={(val) => complaintChangeHandler('messages', val)}
              value={complaint.messages}
              textAlignVertical="top"
            />
          </View>

          {/* Urgently */}
          <View style={styles.separator}>
            <View style={styles.switchContainer}>
              <Text>
                {complaint.is_urgent
                  ? 'Pengaduan Bersifat Penting'
                  : 'Biasa (Normal)'}
              </Text>
              <Switch
                trackColor={{false: '#919191', true: '#07a641'}}
                thumbColor={complaint.is_urgent ? '#0460c9' : '#d4d4d4'}
                onValueChange={() =>
                  complaintChangeHandler('is_urgent', !complaint.is_urgent)
                }
                value={complaint.is_urgent}
              />
            </View>
          </View>

          {/* Submit */}
          <View style={styles.separator}>
            <TouchableOpacity
              style={styles.coverButtonSubmit}
              onPress={submitComplaintHandler}>
              <Text style={styles.textButtonSubmit}>Kirim</Text>
            </TouchableOpacity>
          </View>

          {/* Back To */}
          <View style={styles.separator}>
            <TouchableOpacity
              style={styles.coverBackTo}
              onPress={() => {
                props.navigation.replace('ComplaintScreen');
              }}>
              <Text style={styles.textButtonSubmit}>Batal & Kembali</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export const optionAddComplaint = (props) => {
  return {
    headerTitle: 'Form Pengaduan',
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

const SelectBoxItem = ({sources, onChangeHandler, ...rest}) => {
  return (
    <DropDownPicker
      items={sources}
      containerStyle={styles.searchableContainer}
      itemStyle={styles.searchableItem}
      style={{backgroundColor: Colors.White}}
      placeholderStyle={{color: Colors.LightGray}}
      searchable={true}
      searchablePlaceholderTextColor={Colors.PrimaryBackground}
      searchableError={() => <Text>Tidak Ditemukan</Text>}
      onChangeItem={onChangeHandler}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  cover: {flex: 1},
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  titleText: {
    padding: 10,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  headingText: {
    padding: 5,
    color: Colors.HeadingText,
  },
  separator: {
    marginVertical: 2,
  },
  textMultiline: {
    height: 100,
    justifyContent: 'flex-start',
    backgroundColor: Colors.White,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 15,
    lineHeight: 23,
  },
  textDefault: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 15,
    backgroundColor: Colors.White,
    fontSize: 12,
  },
  coverButtonSubmit: {
    marginTop: 10,
    backgroundColor: Colors.SecondBackground,
    borderRadius: 5,
    paddingVertical: 13,
  },

  coverBackTo: {
    marginTop: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    paddingVertical: 13,
  },

  textButtonSubmit: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  switchContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  searchableContainer: {
    height: 40,
  },
  searchableItem: {
    justifyContent: 'flex-start',
  },
  searchableItemText: {
    color: Colors.DarkGray,
  },
  searchableItemContainer: {
    maxHeight: '80%',
  },
});
