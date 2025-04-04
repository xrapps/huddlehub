import React, {useContext, useEffect, useState, useCallback} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from './AppContext';
import {COLORS, FONTS} from '../helpers/colors';

export default function ({item, index}) {
  const {shouldRefresh, toggleRefresh} = useContext(AppContext);
  const [added, setAdded] = useState(false);

  const updateCart = useCallback(async () => {
    const cartList = await AsyncStorage.getItem('cartList');
    const cartArray = cartList ? JSON.parse(cartList) : [];
    const isProductInCart = cartArray.some(cart => cart.name === item.name);
    setAdded(isProductInCart);
  }, [item.name]);

  const handleCartUpdate = async action => {
    const cartList = await AsyncStorage.getItem('cartList');
    let cartArray = cartList ? JSON.parse(cartList) : [];

    if (action === 'add') {
      if (!cartArray.some(cart => cart.name === item.name)) {
        cartArray.push({...item, count: 1});
      }
    } else if (action === 'remove') {
      cartArray = cartArray.filter(cart => cart.name !== item.name);
    }

    await AsyncStorage.setItem('cartList', JSON.stringify(cartArray));
    toggleRefresh(prev => !prev);
  };

  const toggleCart = () => {
    added ? handleCartUpdate('remove') : handleCartUpdate('add');
  };

  useEffect(() => {
    updateCart();
  }, [updateCart, shouldRefresh]);

  return (
    <View
      style={[
        styles.main,
        {flexDirection: index % 2 === 0 ? 'row' : 'row-reverse'},
      ]}>
      <Image source={item?.image} style={styles.image} />

      <View
        style={{
          width: '55%',
          justifyContent: 'space-between',
          height: 160,
          paddingBottom: 10,
          paddingHorizontal: 5,
          marginRight: 15,
        }}>
        <Text style={styles.title}>{item?.name}</Text>

        <Text style={styles.description}>{item?.description}</Text>

        <View style={styles.row}>
          <Text style={styles.price}>{item?.price} $</Text>

          <TouchableOpacity onPress={toggleCart}>
            <Text style={!added ? styles.button : styles.buttonActive}>{added ? 'УБРАТЬ' : 'В КОРЗИНУ'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    width: '93%',
    alignSelf: 'center',
    height: 160,
    marginTop: 35,
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    elevation: 20,
  },
  image: {
    width: '38%',
    height: 150,
    borderRadius: 90,
    alignSelf: 'center',
    marginLeft: 5,
  },
  title: {
    fontSize: 17,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    width: '100%',
    textAlign: 'center',
    marginTop: 10,
  },
  description: {
    fontSize: 12,
    fontFamily: FONTS.light,
    color: COLORS.black,
    width: '100%',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  price: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    textAlign: 'center',
    verticalAlign: 'middle',
    color: COLORS.main,
    borderRadius: 8,
    marginLeft: 5,
  },
  button: {
    fontFamily: FONTS.black,
    textAlign: 'center',
    fontSize: 14,
    color: COLORS.white,
    borderColor: COLORS.black,
    backgroundColor: COLORS.main,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginRight: 10,
    borderRadius: 8,
  },
  buttonActive: {
    fontFamily: FONTS.black,
    textAlign: 'center',
    fontSize: 14,
    color: COLORS.white,
    borderColor: COLORS.black,
    backgroundColor: COLORS.red,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginRight: 10,
    borderRadius: 8,
  },
  icon: {
    width: 40,
    height: 40,
    objectFit: 'contain',
  },
});
