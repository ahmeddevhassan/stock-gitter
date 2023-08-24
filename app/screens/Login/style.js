import { Dimensions } from 'react-native';

export default styles = {
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  ViewStyle: {
    flex: 1,
    width: 300,

  },
  buttonView: {
    alignSelf: 'center'
  },
  imageStyle: {
    resizeMode: 'contain',
    width: Dimensions.get('window').width / 1.5,
    alignSelf: 'center'
  }

};
