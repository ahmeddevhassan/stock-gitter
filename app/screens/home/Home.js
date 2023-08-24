import React, { Component } from 'react';
import { View, TouchableOpacity, AsyncStorage, Text, Alert, BackHandler } from 'react-native';
import { connect } from "react-redux";
import Loading from '../../components/Loadng';
import styles from './style'
import HeaderWhite from '../../components/headerWhite/';
import { WebView } from 'react-native-webview'
import { Container, Content } from 'native-base';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showScanner: false,
      role: null,
    }
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    this.setState({ showScanner: false })

  }

  onButtonPress = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    Alert.alert(
      'Exit App',
      'Exiting the application?', [{
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      }, {
        text: 'OK',
        onPress: () => BackHandler.exitApp()
      },], {
      cancelable: false
    }
    )
    return true;
  }
  GetScannedData = (data) => {

  }

  Signout() {
    const { navigation } = this.props;
    navigation.navigate('Logout');
  }

  render() {
    return (
      <Container>
        <HeaderWhite back={false} label={"Heading"} />
        <Content>
          <Text>
            Coming Soom..
            </Text>
        </Content>
      </Container>

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
)(Home);