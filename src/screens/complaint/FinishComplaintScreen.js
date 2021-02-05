/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image, ScrollView, TextInput} from 'react-native';
import {ActivityIndicator, Colors, Button} from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import {ToggleHeader} from '../../components';
import Api from '../../utils/Api';
import Authorization from '../../utils/Authorization';

export default function FinishComplaintScreen(props) {
  const {userInfo} = useSelector((state) => state.AuthReducer);
  const [complaint, setComplaint] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [uploader, setUploader] = React.useState({
    sources: null,
    references: null,
    uri: null,
  });

  const fetchComplaint = async () => {
    try {
      const {data, status} = await Api.get(
        `/complaints/${props.route.params.id}`,
        Authorization(userInfo.token),
      );

      if (status === 200) {
        setComplaint(data.result);
      }
    } catch (err) {
      const responseError = err.response;
      console.log(responseError);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    fetchComplaint();
    return () => {};
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator animating={true} color={Colors.red800} />
      </View>
    );
  }

  if (!complaint) {
    return null;
  }

  const onUploadHandler = () => {
    const options = {
      title: 'Upload File Gambar',
      customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response from Image Picker Show Image', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setUploader({
          ...uploader,
          sources: {uri: response.uri},
          references: response.data,
          uri: response.uri,
        });
      }
    });
  };

  const onSubmitFinishedHandler = () => {};

  return (
    <View style={{flex: 1, padding: 10, flexDirection: 'column'}}>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        {/* JUDUL PENGADUAN */}
        <View
          style={{
            paddingVertical: 5,
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 'bold',
              width: '40%',
            }}>
            Judul Pengaduan
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: '#475958',
              textAlign: 'justify',
              width: '60%',
            }}>
            {complaint.title}
          </Text>
        </View>

        {/* STATUS PENGADUAN */}
        <View
          style={{
            paddingVertical: 5,
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 'bold',
              width: '40%',
            }}>
            Status Pengaduan
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: '#475958',
              textAlign: 'justify',
              width: '60%',
            }}>
            {complaint.is_urgent ? 'Perihal Penting' : 'Perihal Biasa'}
          </Text>
        </View>

        {/* PELAKSANA PEKERJAAN */}
        <View
          style={{
            paddingVertical: 5,
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 'bold',
              width: '40%',
              color: 'black',
            }}>
            Pelaksana Pekerjaan
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: '#475958',
              textAlign: 'justify',
              width: '60%',
            }}>
            {complaint.executor.name}
          </Text>
        </View>

        {/* KETERANGAN PEKERJAAN */}
        <View
          style={{
            marginTop: 20,
            paddingVertical: 5,
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 13, fontWeight: 'bold', color: '#02756f'}}>
            Keterangan Hasil Pekerjaan
          </Text>
        </View>

        <View
          style={{
            paddingVertical: 5,
            justifyContent: 'center',
          }}>
          <TextInput
            multiline={true}
            style={{
              height: 100,
              justifyContent: 'flex-start',
              backgroundColor: Colors.White,
              borderColor: '#004d49',
              borderWidth: 1,
              paddingHorizontal: 15,
              borderRadius: 10,
              lineHeight: 23,
            }}
            textAlignVertical="top"
          />
        </View>

        {/* UPLOAD FILE */}
        <View
          style={{
            paddingVertical: 5,
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 13, fontWeight: 'bold', color: '#02756f'}}>
            Upload Bukti Perkerjaan
          </Text>
        </View>

        <View
          style={{
            paddingVertical: 5,
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Image
            source={uploader.sources}
            style={{
              width: '100%',
              height: 200,
              margin: 0,
              backgroundColor: '#f7f7f7',
            }}
          />
        </View>

        <View
          style={{
            marginTop: 10,
            paddingVertical: 2,
            justifyContent: 'center',
          }}>
          <Button
            style={{
              justifyContent: 'center',
              backgroundColor: '#0b6b66',
              alignItems: 'center',
              padding: 5,
              borderRadius: 5,
            }}
            icon="upload"
            mode="contained"
            onPress={onUploadHandler}>
            Upload
          </Button>
        </View>

        <View
          style={{
            marginTop: 10,
            paddingVertical: 2,
            justifyContent: 'center',
          }}>
          <Button
            style={{
              justifyContent: 'center',
              backgroundColor: '#0969de',
              alignItems: 'center',
              padding: 5,
              borderRadius: 5,
            }}
            mode="contained"
            onPress={onSubmitFinishedHandler}>
            Lapor
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

export const optionFinishComplaint = (props) => ({
  headerTitle: 'Form Laporan Pekerjaan',
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
