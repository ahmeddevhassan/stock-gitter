import { Dimensions } from 'react-native';

export default styles = {
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    resizeMode: 'contain',


  },
  overLay: {
    backgroundColor: '#00934480',
    opacity: 0.7,
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',

  },
  text: {
    fontSize: 24,
  },
  imageStyle: {
    resizeMode: 'contain',
    width: Dimensions.get('window').width / 1.5,
    alignSelf: 'center',
    opacity: 1,

  }
};
