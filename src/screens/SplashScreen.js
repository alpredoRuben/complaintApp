import React from 'react';
import {View, Text, TouchableOpacity, StatusBar} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';
import styles from './styles/SplashStyle';
import {ImagePNG} from '../assets';
import Colors from '../utils/Colors';

export default function SplashScreen(props) {
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={Colors.PrimaryBackground}
        barStyle="light-content"
      />
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duraton="1500"
          source={ImagePNG.Complaint}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}
        animation="fadeInUpBig">
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
            },
          ]}>
          Selamat Datang
        </Text>
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
            },
          ]}>
          Di Aplikasi Pengaduan
        </Text>
        <Text style={styles.text}>Login dengan akun anda</Text>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('LoginScreen')}>
            <LinearGradient
              colors={[Colors.Cyan, Colors.DarkCyan]}
              style={styles.signIn}>
              <Text style={styles.textSign}>Get Started</Text>
              <MaterialIcons name="navigate-next" color="#fff" size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}
