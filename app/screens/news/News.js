import React, { Component } from 'react';
import { View, TouchableOpacity, AsyncStorage, Text, Alert, BackHandler } from 'react-native';
import { connect } from "react-redux";
import Loading from '../../components/Loadng';
import styles from './style'
import { Container, Content, Tab, Tabs } from 'native-base';
import { BUTTON_LOGIN_COLOUR } from '../../utils/Consts';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';
import Home from '../home';
import { getNewsUSDAction, getNewsJMDAction } from '../../redux/actions/NewsAction';
import NotificationComponent from '../../components/NotificationComponent';
import Header from '../../components/header';
class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showScanner: false,
      role: null,
    }
  }
  componentDidMount() {
    this.props.getNewsJMDAction();
    this.props.getNewsUSDAction();
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
  renderNewUpdateUS() {
    return (
      <Content contentContainerStyle={styles.UpdateContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingUpdate}>
            Latest in US
        </Text>
        </View>

        {this.renderLinearStatsUSD()}

      </Content>)

  }
  renderLinearStatsUSD() {
    return (
      <LinearGradient
        colors={['#2189BC', '#0A496A',]}
        style={{ padding: 10, alignItems: 'center', borderRadius: 15, width: "90%", alignSelf: 'center', marginLeft: 25, marginRight: 25, marginTop: 10, marginBottom: 10, }}>

        {this.props.newsUSD && this.props.newsUSD.map((arr, index) => {
          return (<NotificationComponent obj={arr} key={"notification" + index} />)
        })}
      </LinearGradient>
    );

  }
  //JMD
  renderNewUpdateJMD() {
    return (
      <Content contentContainerStyle={styles.UpdateContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingUpdate}>
            Latest in Jamaica
        </Text>
        </View>

        {this.renderLinearStatsJMD()}

      </Content>)

  }
  renderLinearStatsJMD() {
    return (
      <LinearGradient
        colors={['#2189BC', '#0A496A',]}
        style={{ padding: 10, alignItems: 'center', borderRadius: 15, width: "90%", alignSelf: 'center', marginLeft: 25, marginRight: 25, marginTop: 10, marginBottom: 10, }}>

        {this.props.newsJMD && this.props.newsJMD.map((arr, index) => {
          return (<NotificationComponent obj={arr} key={"notification" + index} />)
        })}
      </LinearGradient>
    );

  }
  render() {
    return (
      <Container>
        <Header label={"News"} navi={this.props.navigation} back={"Profile"} />
        <Tabs tabContainerStyle={{ backgroundColor: '#666666' }} tabBarUnderlineStyle={{ backgroundColor: BUTTON_LOGIN_COLOUR }}>
          <Tab heading="USD" tabStyle={{ backgroundColor: "#f6f8fa" }} activeTabStyle={{ backgroundColor: "#f6f8fa" }} activeTextStyle={{ color: BUTTON_LOGIN_COLOUR }}>
            <Container>
              {this.renderNewUpdateUS()}
            </Container>
          </Tab>
          <Tab heading="Jamaica" tabStyle={{ backgroundColor: "#f6f8fa" }} activeTabStyle={{ backgroundColor: "#f6f8fa" }} activeTextStyle={{ color: BUTTON_LOGIN_COLOUR }}>
            <Container>
              {this.renderNewUpdateJMD()}
            </Container>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

let mapStateToProps = state => ({
  newsUSD: state.news.newsUSD,
  newsJMD: state.news.newsJMD,
  pageno: state.news.pageno,
});

let mapDispatchToProps = dispatch => ({
  getNewsJMDAction: (data) => dispatch(getNewsJMDAction(data)),
  getNewsUSDAction: (data) => dispatch(getNewsUSDAction(data)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(News);