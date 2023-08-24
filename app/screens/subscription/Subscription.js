import React, { Component } from 'react';
import { View, TouchableOpacity, AsyncStorage, Text, Alert, BackHandler, Linking } from 'react-native';
import { connect } from "react-redux";
import Loading from '../../components/Loadng';
import styles from './style'
import HeaderWhite from '../../components/headerWhite';
import Header from '../../components/header';

import { WebView } from 'react-native-webview'
import { Container, Content, List, ListItem, Left, Right, Tabs, Tab } from 'native-base';
import { BUTTON_LOGIN_COLOUR } from '../../utils/Consts';
class Subscription extends Component {
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
  renderPlans(price, flag, yearly) {
    return (
      <View style={{ margin: 20, marginTop: 10, backgroundColor: '#EDF0F2', borderRadius: 20, paddingBottom: 20 }}>
        <View style={{ height: 40, backgroundColor: '#009344', color: '#fff', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontSize: 24 }}>
            {price}$
          </Text>
        </View>
        {flag == 1 ? <View style={{ padding: 10, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#000', fontSize: 20 }}>
            Free
          </Text>
          <Text style={{ margin: 5, color: '#000' }}>
            AUTO TRADE SIMULATION
          </Text>
          <Text style={{ margin: 5, color: '#000' }}>
            CREATE 1 WATCHLIST
          </Text>
          <Text style={{ margin: 5, color: '#000' }}>
            CRYPTO CURRENCIES
          </Text>
          <Text style={{ margin: 5, color: '#000' }}>
            LEARN TO TRADE
          </Text>
          <Text style={{ margin: 5, color: '#000' }}>
            LOCAL & INTERNATIONAL NEWS
          </Text>
          <Text style={{ margin: 5, color: '#000' }}>
            PENNY PERSONAL ASSISTANT BASIC
          </Text>
          <Text style={{ margin: 5, color: '#000' }}>
            US AND LOCAL MARKET
          </Text>
        </View>
          :
          flag == 2 ?
            <View style={{ padding: 10, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#000', fontSize: 20 }}>
                PROFESSIONAL
          </Text>
              <TouchableOpacity onPress={() => Linking.openURL('https://www.stockgitter.com/USD/subscribe')}>

                <Text style={{ color: BUTTON_LOGIN_COLOUR, fontSize: 20, margin: 5 }}>
                  Click To Subscribe
          </Text>
              </TouchableOpacity>
              <Text style={{ margin: 5, color: '#000' }}>
                AI ADVANCED SEARCHES AND MARKET SUGGESTIONS
          </Text>
              <Text style={{ margin: 5, color: '#000' }}>
                AUTO AND MANUAL SIMULATION
          </Text>
              <Text style={{ margin: 5, color: '#000' }}>
                BONDS
                          </Text>
              <Text style={{ margin: 5, color: '#000' }}>
                BUY AND SELL RATING
          </Text>
              <Text style={{ margin: 5, color: '#000' }}>
                CREATE ANALYSIS USING EDITOR
          </Text>
              <Text style={{ margin: 5, color: '#000' }}>
                JOIN ER AND AGM CONFERENCE CALLS
          </Text>
              <Text style={{ margin: 5, color: '#000' }}>
                LOCAL & INTERNATIONAL NEWS
          </Text>
              <Text style={{ margin: 5, color: '#000' }}>
                MARKET PLANNER + MICROSOFT WORD AND OUTLOOK
          </Text>
              <Text style={{ margin: 5, color: '#000' }}>
                MUTUAL FUNDS
          </Text>
              <Text style={{ margin: 5, color: '#000' }}>
                PENNY PERSONAL ASSISTANT UNLIMITED
          </Text>
              <Text style={{ margin: 5, color: '#000' }}>
                REGULATORY ANALYSER
          </Text>
              <Text style={{ margin: 5, color: '#000' }}>
                SECTOR ANALYSIS
          </Text>
              <Text style={{ margin: 5, color: '#000' }}>
                SHARE ANALYSIS WITH FOLLOWERS
          </Text>
              <Text style={{ margin: 5, color: '#000' }}>
                SOCIAL MEDIA SENTIMENT ANALYSIS
          </Text>
              <Text style={{ margin: 5, color: '#000' }}>
                TRY FOR 7 DAYS FOR $7.00
          </Text>
              <Text style={{ margin: 5, color: '#000' }}>
                UNLIMITED MARKET ACCESS
          </Text>
              <Text style={{ margin: 5, color: '#000' }}>
                UNLIMITED WATCH LIST CREATION
          </Text>
            </View>
            :
            //flag=3
            <View style={{ padding: 10, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#000', fontSize: 20 }}>
                EXPERT
        </Text>
              <Text style={{ margin: 5, color: '#000' }}>
                GET DEDICATED SOLUTIONS CUSTOMIZATION FOR YOUR TEAM
        </Text>
              <TouchableOpacity onPress={() => Linking.openURL('https://www.stockgitter.com')}>
                <Text style={{ color: BUTTON_LOGIN_COLOUR, fontSize: 21 }}>
                  Click Here
            </Text>
              </TouchableOpacity>
            </View>


        }


      </View>
    )
  }

  render() {
    return (
      <Container>
        <Header label={"Subscription"} navi={this.props.navigation} back={"Profile"} />

        <Tabs tabContainerStyle={{ backgroundColor: '#666666' }} tabBarUnderlineStyle={{ backgroundColor: BUTTON_LOGIN_COLOUR }}>
          <Tab heading="Monthly" tabStyle={{ backgroundColor: "#f6f8fa" }} activeTabStyle={{ backgroundColor: "#f6f8fa" }} activeTextStyle={{ color: BUTTON_LOGIN_COLOUR }}>
            <Container>
              <Content>
                {this.renderPlans(0.00, 1)}
                {this.renderPlans(10.99, 2)}
                {this.renderPlans('Contact Us Now', 3)}
              </Content></Container>
          </Tab>
          <Tab heading="Yearly" tabStyle={{ backgroundColor: "#f6f8fa" }} activeTabStyle={{ backgroundColor: "#f6f8fa" }} activeTextStyle={{ color: BUTTON_LOGIN_COLOUR }}>
            <Container>
              <Content>
                {this.renderPlans(0.00, 1)}
                {this.renderPlans(118.69, 2)}
                {this.renderPlans('Contact Us Now', 3)}
              </Content>
            </Container>
          </Tab>
        </Tabs>
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
)(Subscription);