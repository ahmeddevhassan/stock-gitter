import React from 'react';
import { Image, Text } from 'react-native';
import * as theme from '../utils/Theme';
import { Icon } from "native-base";

export default ({ source, focused }) => {
  return (
    <Image
      source={source}
      style={styles.icon}
    />
  );
}

const styles = {
  icon: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
};
