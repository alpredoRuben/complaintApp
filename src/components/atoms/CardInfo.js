/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

const CardInfo = ({title, number, iconName, arrayColors, type}) => {
  return (
    <LinearGradient colors={arrayColors} style={styles.linearGradient}>
      <View style={styles.rowDirection}>
        <View style={styles.iconCover}>
          <Icon name={iconName} size={40} color="white" type={type} />
        </View>
        <View style={{width: '70%'}}>
          <Text style={styles.cardTitle}>{title}</Text>
        </View>

        <View style={styles.centerWidth('15%')}>
          <Text style={styles.cardInfo}>{number}</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

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

export default CardInfo;
