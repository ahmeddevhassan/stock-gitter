import React, { Component } from 'react';
import { View, TouchableOpacity, AsyncStorage, Text, Alert, BackHandler, Image, StyleSheet } from 'react-native';
import { connect } from "react-redux";
import { images } from '../../../assets';
import { styles } from './style'
import { Ionicons } from '@expo/vector-icons';
import ButtonComponent from '../../components/Button';
import { Container, Content, } from 'native-base';
import Header from '../../components/header';
import AppIntroSlider from 'react-native-app-intro-slider';
import { BUTTON_LOGIN_COLOUR } from '../../utils/Consts';
const slides = [
  {
    key: 'somethun',
    title: 'START YOUR JOURNEY',
    text: 'Register and start your journey!',
    titleStyle: styles.title,
    textStyle: styles.subheading,
    image: images.introImgae1,
    backgroundColor: '#fff',
  },
  {
    key: 'MARKET TRENDS',
    title: 'MARKET TRENDS',
    text: 'View and analyze the market trends and make better decision',
    titleStyle: styles.title,
    textStyle: styles.subheading,
    image: images.introImgae2,
    backgroundColor: '#fff',
  },
  {
    key: 'STOCK ACTIVITY',
    title: 'Rocket guy',
    text: 'You can view all the stock activities at one place',
    titleStyle: styles.title,
    textStyle: styles.subheading,
    image: images.introImgae3,
    backgroundColor: '#fff',
  }
];
class IntroSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showScanner: false,
      role: null,
      showRealApp: true,
    }
    AsyncStorage.setItem('Intro', "value");

  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);

  }

  onButtonPress = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    // this.props.goBack();
    return true;
  }

  handleNameInput = () => {
  }
  proceedToHome() {
    const { navigation } = this.props;
    navigation.navigate('Home');
  }
  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-arrow-round-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  };
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  };
  _renderItem = (item) => {
    return (
      <View style={{ flex: 1 }}>
        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
          <Text style={styles.title}>{item.title}</Text>
          <Image source={item.image} style={{
            width: 320,
            height: 320,
          }} />
          <Text style={styles.title}>{item.text}</Text>
        </View>
      </View>
    );
  }
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
    { this.proceedToHome() }
  }
  render() {
    return (
      <>
        <Header back={false} navi={this.props.navigation} label={" "} />
        <AppIntroSlider activeDotStyle={{ backgroundColor: BUTTON_LOGIN_COLOUR }} slides={slides} titleStyle={styles.title} onDone={this._onDone}
          renderDoneButton={this._renderDoneButton}
          renderNextButton={this._renderNextButton} />
      </>
    );
  }
}

let mapStateToProps = state => ({

});

let mapDispatchToProps = dispatch => ({
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IntroSlider);