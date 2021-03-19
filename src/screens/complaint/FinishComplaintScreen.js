/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  Platform,
  Alert,
} from 'react-native';
import {ActivityIndicator, Colors, Button} from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import Api from '../../utils/Api';
import Authorization from '../../utils/Authorization';

export default function FinishComplaintScreen(props) {
  const {userInfo} = useSelector((state) => state.AuthReducer);
  const [complaint, setComplaint] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [isImage, setIsImage] = React.useState(false);

  const [uploader, setUploader] = React.useState({
    assigned_id: null,
    description: null,
    file_upload: null,
    sources: null,
  });

  const fetchComplaint = async () => {
    try {
      const {data, status} = await Api.get(
        `/complaints/${props.route.params.id}`,
        Authorization(userInfo.token),
      );

      if (status === 200) {
        setComplaint(data.result);
        setUploader({...uploader, assigned_id: data.result.assigned.id});
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
    ImagePicker.showImagePicker(
      {
        title: 'Upload Gambar',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
        mediaType: 'photo',
        allowsEditing: true,
        maxWidth: 400,
        maxHeight: 300,
        quality: 0.5,
      },
      (response) => {
        console.log('Response from Image Picker Show Image', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          console.log('Response', response);
          setIsImage(true);
          setUploader({
            ...uploader,
            sources: {uri: response.uri},
            file_upload: {
              name: response.fileName,
              type: response.type,
              uri:
                Platform.OS === 'android'
                  ? response.uri
                  : response.uri.replace('file://', ''),
            },
          });
        }
      },
    );
  };

  const finishedComplaint = async (form_data) => {
    try {
      console.log('Uploader', uploader);

      const {data, status} = await Api.post('finished/complaint', form_data, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (status === 200) {
        console.log('Message', data.message);
        Alert.alert('BERHASIL', data.message, [
          {
            text: 'OK',
            onPress: () => props.navigation.navigate('ComplaintScreen'),
          },
        ]);
      }
    } catch (err) {
      console.log(err.response);
      const {data, status} = err.response;

      if (status === 422) {
        Alert.alert('GAGAL', 'Ops.. Mohon isi data dengan lengkap', [
          {
            text: 'TUTUP',
            onPress: () => console.log(data),
          },
        ]);
      } else {
        Alert.alert('GAGAL', data.message, [
          {
            text: 'TUTUP',
            onPress: () => console.log(data),
          },
        ]);
      }
    }
  };

  const onSubmitFinishedHandler = () => {
    var dataUpload = new FormData();
    dataUpload.append('assigned_id', uploader.assigned_id);
    dataUpload.append('description', uploader.description);
    dataUpload.append('file_upload', uploader.file_upload);
    finishedComplaint(dataUpload);
  };

  const onChangeTextHandler = (key, value) => {
    setUploader({...uploader, [key]: value});
  };

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
            Uraian Pengaduan
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: '#475958',
              textAlign: 'justify',
              width: '60%',
            }}>
            {complaint.messages}
          </Text>
        </View>

        {/* SIFAT PENGADUAN */}
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
            Sifat Pengaduan
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
            onChangeText={(val) => onChangeTextHandler('description', val)}
            value={uploader.description}
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

        {isImage && (
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
                height: 300,
                margin: 0,
                backgroundColor: '#f7f7f7',
              }}
            />
          </View>
        )}

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
