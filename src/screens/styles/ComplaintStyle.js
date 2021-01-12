import React from 'react';
import {StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';

export const ComplaintTypeStyle = StyleSheet.create({
  coverArea: {flex: 1},
  container: {flex: 1, justifyContent: 'center'},
  flatList: {marginTop: 20, backgroundColor: Colors.White},

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

  footerLoadCover: {
    padding: 5,
    marginHorizontal: 10,
  },
  buttonLoad: {
    padding: 10,
    backgroundColor: Colors.PrimaryBackground,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLoadText: {
    color: Colors.White,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  activityIndicator: {marginLeft: 20},
});
