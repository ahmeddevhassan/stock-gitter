import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { DrawerActions } from 'react-navigation';
import { images } from '../../assets';

export default ({ navigation }) => {
  return (
    <Image source={images.Login} style={styles.icon} />
  );
};

const styles = {
  icon: {
    margin: 8,
    marginLeft: 16,
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
};
