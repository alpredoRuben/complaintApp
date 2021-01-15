import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import {CustomMenuButton} from '../components';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Api from '../utils/Api';
import DropDownPicker from 'react-native-dropdown-picker';
import Colors from '../utils/Colors';

const SelectBoxItem = ({dataSource, onChangeHandler, ...rest}) => {
  return (
    <DropDownPicker
      items={dataSource}
      containerStyle={styles.searchableContainer}
      itemStyle={styles.searchableItem}
      style={{backgroundColor: Colors.White}}
      placeholderStyle={{color: Colors.LightGray}}
      onChangeItem={onChangeHandler}
      {...rest}
    />
  );
};

export default function AddComplaintScreen(props) {
  const [roles, setRoles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [complaints, setComplaints] = useState({
    complaint_type_id: null,
    messages: '',
    urgent: false,
    user_complaint_id: 2,
  });

  const fetchRoles = async () => {
    const {data} = await Api.get('/roles/type/complaint');
    let r = [];
    for (let i = 0; i < data.length; i++) {
      const element = {
        label: data[i].name,
        value: data[i].id,
      };
      r.push(element);
    }
    setRoles(r);
  };

  const onChangeRoles = async (item) => {
    const {data} = await Api.get(`/complaint_types/find/${item.value}`);
    let c = [];
    for (let i = 0; i < data.length; i++) {
      const element = {
        label: data[i].title,
        value: data[i].id,
      };
      c.push(element);
    }
    setCategories(c);
  };

  const onSaveComplaint = async () => {
    try {
      const result = await Api.post('/complaints/store', complaints);
      console.log('Save Data', result.data);
      if (result.status === 200) {
        Alert.alert('Success', result.data.message, [
          {
            text: 'OK',
            onPress: () => {
              console.log('Pressed Ok');
              props.navigation.navigate('ComplaintScreen');
            },
          },
        ]);
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    console.log('Component Did Mount');
    fetchRoles();
    return () => {};
  }, []);

  useEffect(() => {
    console.log('Component Update');
  }, [categories]);

  const onChangeComplaintHandler = (key, value) => {
    setComplaints({
      ...complaints,
      [key]: value,
    });
  };

  const onSubmitComplaintHandler = (e) => {
    console.log('Complaints', complaints);
    onSaveComplaint();
  };

  return (
    <SafeAreaView style={styles.cover}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.titleText}>Form Buat Pengaduan Baru</Text>

          {/* Tujuan */}
          <View style={styles.separator}>
            <Text style={styles.headingText}>Tujuan</Text>
            <SelectBoxItem
              dataSource={roles}
              onChangeItem={(item) => onChangeRoles(item)}
              placeholder="Pilih tujuan pengaduan"
            />
          </View>

          {/* Kategori */}
          <View style={styles.separator}>
            <Text style={styles.headingText}>Kategori</Text>
            <SelectBoxItem
              dataSource={categories}
              onChangeItem={(item) =>
                onChangeComplaintHandler('complaint_type_id', item.value)
              }
              placeholder="Pilih kategori pengaduan"
              searchable={true}
              searchablePlaceholder="Cari kategori pengaduan"
              searchablePlaceholderTextColor={Colors.PrimaryBackground}
              searchableError={() => <Text>Tidak Ditemukan</Text>}
            />
          </View>

          {/* Pesan */}
          <View style={styles.separator}>
            <Text style={styles.headingText}>Pesan</Text>
            <TextInput
              multiline={true}
              style={styles.textMultiline}
              onChangeText={(val) => onChangeComplaintHandler('messages', val)}
              value={complaints.value}
              textAlignVertical="top"
            />
          </View>

          {/* Urgently */}
          <View style={styles.separator}>
            <View style={styles.switchContainer}>
              <Text>
                {complaints.urgent
                  ? 'Pengaduan Bersifat Penting'
                  : 'Biasa (Normal)'}
              </Text>
              <Switch
                trackColor={{false: '#919191', true: '#07a641'}}
                thumbColor={complaints.urgent ? '#0460c9' : '#d4d4d4'}
                onValueChange={() =>
                  setComplaints({...complaints, urgent: !complaints.urgent})
                }
                value={complaints.urgent}
              />
            </View>
          </View>

          {/* Submit */}
          <View style={styles.separator}>
            <TouchableOpacity
              style={styles.coverButtonSubmit}
              onPress={onSubmitComplaintHandler}>
              <Text style={styles.textButtonSubmit}>Simpan & Tambahkan</Text>
            </TouchableOpacity>
          </View>

          {/* Go To Complaint Screen */}
          <View style={styles.separator}>
            <TouchableOpacity
              style={styles.coverBackTo}
              onPress={() => props.navigation.navigate('ComplaintScreen')}>
              <Text style={styles.textButtonSubmit}>List Pengaduan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export const AddComplaintScreenOptions = (navdata) => {
  return {
    headerTitle: 'Form Pengaduan',
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
  coverButtonSubmit: {
    marginTop: 10,
    backgroundColor: Colors.SecondBackground,
    borderRadius: 5,
    paddingVertical: 13,
  },

  coverBackTo: {
    marginTop: 10,
    backgroundColor: Colors.Back,
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
