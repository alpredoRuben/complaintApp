import React from 'react';
import {View, Text, StatusBar, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';
import Colors from '../../utils/Colors';
import {ComplaintPNG} from '../../assets';
import styles from './styles';
import {APP_NAME} from '../../utils/Config';

function SplashScreen(props) {
  const {colors} = useTheme();

  return (
    <View style={styles.splashContainer}>
      <StatusBar
        backgroundColor={Colors.PrimaryBackground}
        barStyle="light-content"
      />
      <View style={styles.splashLogoCover}>
        <Animatable.Image
          animation="bounceIn"
          duraton="1500"
          source={ComplaintPNG}
          style={styles.splashLogo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View
        style={[
          styles.splashTitleCover,
          {
            backgroundColor: colors.background,
          },
        ]}
        animation="fadeInUpBig">
        <Text
          style={[
            styles.splashTitle,
            {
              color: colors.text,
            },
          ]}>
          Selamat Datang
        </Text>
        <Text
          style={[
            styles.splashTitle,
            {
              color: colors.text,
            },
          ]}>
          Di {APP_NAME}
        </Text>
        {/* <Text style={styles.splashText}>Login dengan akun anda</Text> */}
        <View style={styles.splashButtonCover}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('LoginScreen')}>
            <LinearGradient
              colors={[Colors.Cyan, Colors.DarkCyan]}
              style={styles.splashLogin}>
              <Text style={styles.splashLoginText}>Yuk Mulai</Text>
              <MaterialIcons name="navigate-next" color="#fff" size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}

export default SplashScreen;
