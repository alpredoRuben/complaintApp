/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Platform,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {ActivityIndicator, RadioButton} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';

import {ToggleHeader} from '../../components';

//Utils
import Api from '../../utils/Api';
import Authorization from '../../utils/Authorization';
import {useSelector} from 'react-redux';

const {width, height} = Dimensions.get('screen');
const SCREEN_WIDTH = width < height ? width : height;
const PRODUCT_ITEM_HEIGHT = 255;
const PRODUCT_ITEM_OFFSET = 5;
const PRODUCT_ITEM_MARGIN = PRODUCT_ITEM_OFFSET * 2;
const numColumns = SCREEN_WIDTH <= 414 ? 2 : 3;

/** PRODUCT SCREEN */
export default function ProductScreen(props) {
  const {userInfo} = useSelector((state) => state.AuthReducer);

  const refFilterRBSheet = useRef();
  const [complaintId, setComplaintId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState({
    error: null,
    page: 1,
    total: 0,
    products: [],
  });
  const [filter, setFilter] = useState({
    types: 'name',
    search: '',
  });

  const fetchProducts = async () => {
    const url = `/products?page=${dataSource.page}&types=${filter.types}&search=${filter.search}`;
    console.log('Url', url);
    try {
      const {data, status} = await Api.get(url, Authorization(userInfo.token));
      console.log('Response Data', data);

      if (status === 200) {
        if (dataSource.page === 1) {
          setDataSource({
            ...dataSource,
            total: data.total,
            products: data.data,
            error: null,
          });
        } else {
          setDataSource({
            ...dataSource,
            total: data.total,
            products: [...dataSource.products, ...data.data],
            error: null,
          });
        }
      }
    } catch (error) {
      setDataSource({
        ...dataSource,
        error: error.response.data,
      });
    }
    setLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log('Call use focus effect');
      setDataSource({...dataSource, page: 1});
    }, [setDataSource, dataSource.page]),
  );

  useEffect(() => {
    if (dataSource.page) {
      console.log('Component Update Mount');
    }

    fetchProducts();

    if (props.route.params !== undefined) {
      setComplaintId(
        props.route.params.complaintId !== undefined
          ? props.route.params.complaintId
          : null,
      );
    } else {
      setComplaintId(null);
    }

    return () => {};
  }, [dataSource.page]);

  const loadMoreProduct = () => {
    setLoading(true);
    setDataSource({...dataSource, page: dataSource.page + 1});
  };

  //Item Layout
  const _getItemLayout = (data, index) => {
    const productHeight = PRODUCT_ITEM_HEIGHT + PRODUCT_ITEM_MARGIN;
    return {
      length: productHeight,
      offset: productHeight * index,
      index,
    };
  };

  //Render Item
  const _renderItem = ({item}) => {
    return (
      <View style={[styles.itemCover, {height: 240, marginBottom: 10}]}>
        {item.file_images.length > 0 ? (
          <Image
            source={{uri: item.file_images[0].filepath}}
            resizeMode={'cover'}
            style={styles.itemImage}
          />
        ) : (
          <View style={styles.imgItem}>
            <Text>No image</Text>
          </View>
        )}

        <View style={styles.itemCoverTitle}>
          <Text style={styles.itemTitle}>{item.product_name}</Text>
          <Text style={styles.itemSmallText}>{`(${item.spesification})`}</Text>
        </View>

        <View style={styles.itemCoverInfo}>
          <View style={styles.itemLineInfo}>
            <Text style={styles.itemSmallText}>Stok</Text>
            <Text style={styles.itemSmallText}>{item.stock_awal}</Text>
          </View>
          <View style={styles.itemLineInfo}>
            <Text style={styles.itemSmallText}>Satuan</Text>
            <Text style={styles.itemSmallText}>{item.satuan}</Text>
          </View>
        </View>

        {complaintId != null && (
          <TouchableOpacity style={styles.itemButtonOrder}>
            <Text style={styles.itemButtonText}>Pesan</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  //Render Footer
  const _renderFooter = () => {
    if (dataSource.loading) {
      <View style={styles.footerCoverLoader}>
        <ActivityIndicator animating={true} color="#106bb5" />
      </View>;
    } else {
      if (dataSource.total <= 0) {
        return null;
      }

      if (dataSource.total > dataSource.products.length) {
        return (
          <View
            style={{
              padding: 5,
            }}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={loadMoreProduct}
              style={{
                padding: 10,
                backgroundColor: '#27303d',
                borderRadius: 5,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Selanjutnya
              </Text>
            </TouchableOpacity>
          </View>
        );
      }
      return null;
    }
  };

  // Event Submit Search
  const onSubmitFilterHandler = () => {
    setLoading(true);
    setDataSource({...dataSource, page: 1});
    refFilterRBSheet.current.close();
  };

  // Event Button Filter Press
  const onFilterShowHandler = () => {
    setFilter({...filter, types: 'name', search: ''});
    refFilterRBSheet.current.open();
  };

  // Event Refresh
  const onSubmitRefreshHandler = () => {
    setLoading(true);
    setFilter({...filter, types: 'name', search: ''});
    setDataSource({...dataSource, page: 1});
  };

  if (loading === true) {
    return <ActivityIndicator animating={true} color="#106bb5" />;
  }

  return (
    <SafeAreaView style={styles.productSafeArea}>
      <View style={styles.productCover}>
        {/* TOP */}
        <View style={{height: 50}}>
          <View style={styles.coverTopMenu}>
            <TouchableOpacity
              onPress={onFilterShowHandler}
              style={styles.buttonMenu}>
              <Text style={styles.textButtonMenu}>FILTER</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onSubmitRefreshHandler}
              style={styles.buttonMenu}>
              <Text style={styles.textButtonMenu}>REFRESH</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* BOTTOM */}
        <View style={styles.coverListProduct}>
          {!loading && dataSource.products.length > 0 ? (
            <FlatList
              style={{flex: 1, padding: 5}}
              data={dataSource.products}
              keyExtractor={(item) => item.id}
              renderItem={_renderItem}
              getItemLayout={_getItemLayout}
              numColumns={numColumns}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={_renderFooter}
            />
          ) : (
            <Text style={{fontSize: 18}}>Empty Data</Text>
          )}
        </View>
      </View>

      <RBSheet
        ref={refFilterRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        animationType="slide"
        dragFromTopOnly={true}
        height={200}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#076321',
          },
        }}>
        <View style={styles.sheetCover}>
          <Text>Pencarian Berdasarkan Kategori</Text>

          {/* FILTER  BY NAME */}
          <View style={{flexDirection: 'row'}}>
            <View style={{width: '10%'}}>
              <RadioButton
                value={filter.types}
                status={filter.types === 'name' ? 'checked' : 'unchecked'}
                uncheckedColor="#545454"
                color="#0727a8"
                onPress={() =>
                  setFilter({...filter, types: 'name', search: ''})
                }
              />
            </View>
            <TouchableOpacity
              style={styles.sheetRadioButton}
              onPress={() => setFilter({...filter, types: 'name', search: ''})}>
              <Text> Nama Barang</Text>
            </TouchableOpacity>
          </View>

          {/* FILTER BY SPESIFICATION */}
          <View style={{flexDirection: 'row'}}>
            <View style={{width: '10%'}}>
              <RadioButton
                value={filter.types}
                status={
                  filter.types === 'spesification' ? 'checked' : 'unchecked'
                }
                uncheckedColor="#545454"
                color="#0727a8"
                onPress={() =>
                  setFilter({...filter, types: 'spesification', search: ''})
                }
              />
            </View>
            <TouchableOpacity
              style={styles.sheetRadioButton}
              onPress={() =>
                setFilter({...filter, types: 'spesification', search: ''})
              }>
              <Text> Spesifikasi Barang</Text>
            </TouchableOpacity>
          </View>

          {/* INPUT TEXT FILTER */}
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <View style={{width: '70%'}}>
              <TextInput
                style={styles.sheetTextInput}
                placeholder="Silahkan isi"
                value={filter.search}
                onChangeText={(text) => setFilter({...filter, search: text})}
              />
            </View>
            <TouchableOpacity
              onPress={onSubmitFilterHandler}
              style={styles.sheetButtonSearch}>
              <Text style={styles.sheetTextButtonSearch}>Cari</Text>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>
    </SafeAreaView>
  );
}

export const optionProductScreen = (props) => {
  return {
    headerTitle: 'Data Inventaris Barang',
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

const styles = StyleSheet.create({
  //Render Item Styles
  itemCover: {
    margin: PRODUCT_ITEM_OFFSET,
    width:
      (SCREEN_WIDTH - PRODUCT_ITEM_MARGIN) / numColumns - PRODUCT_ITEM_MARGIN,
    overflow: 'hidden',
    borderRadius: 3,
    backgroundColor: 'white',
    flexDirection: 'column',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: {height: 0, width: 0},
        shadowOpacity: 1,
        shadowRadius: 1,
      },
      android: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
    }),
  },

  itemCoverTitle: {
    width:
      (SCREEN_WIDTH - PRODUCT_ITEM_MARGIN) / numColumns - PRODUCT_ITEM_MARGIN,
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemTitle: {
    fontWeight: '300',
    fontSize: 13,
    color: '#2d3338',
  },

  itemImage: {
    width:
      (SCREEN_WIDTH - PRODUCT_ITEM_MARGIN) /
        (numColumns - PRODUCT_ITEM_MARGIN) -
      5,
    height: 125,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemSmallText: {
    fontSize: 11,
  },

  itemCoverInfo: {
    flexDirection: 'column',
    paddingTop: PRODUCT_ITEM_OFFSET * 2,
    borderWidth: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.15)',
    margin: PRODUCT_ITEM_OFFSET * 2,
  },

  itemLineInfo: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  itemButtonOrder: {
    width:
      (SCREEN_WIDTH - PRODUCT_ITEM_MARGIN) / numColumns - PRODUCT_ITEM_MARGIN,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0280c9',
    height: 30,
  },

  itemButtonText: {color: 'white', fontSize: 13},

  //Render Footer
  footerCoverLoader: {marginTop: 10, alignItems: 'center'},

  //Product Screen
  productSafeArea: {flex: 1, justifyContent: 'center', alignItems: 'center'},

  productCover: {
    flex: 1,
    flexDirection: 'column',
  },

  coverTopMenu: {
    marginHorizontal: 17,
    flexDirection: 'row',
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonMenu: {
    borderRadius: 2,
    backgroundColor: '#018f8f',
    marginHorizontal: 10,
    width: '40%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textButtonMenu: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },

  coverListProduct: {flex: 1, backgroundColor: '#f2f5f7', paddingVertical: 10},

  //RB Sheet Filter
  sheetCover: {
    flex: 1,
    backgroundColor: '#9dd1d1',
    flexDirection: 'column',
    padding: 10,
  },

  sheetRadioButton: {
    width: '60%',
    paddingVertical: 10,
    fontSize: 13,
  },

  sheetTextInput: {
    borderWidth: 1,
    borderColor: '#dae6f0',
    paddingHorizontal: 15,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 10,
  },

  sheetButtonSearch: {
    width: '20%',
    backgroundColor: '#027a7a',
    marginHorizontal: 5,
    padding: 5,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  sheetTextButtonSearch: {color: 'white', fontSize: 14, fontWeight: 'bold'},
});
