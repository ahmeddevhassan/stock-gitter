import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { DrawerActions } from 'react-navigation';
import { images } from '../../assets';

export default ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image source={images.Splash} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = {
  icon: {
    margin: 8,
    marginLeft: 16,
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
};
