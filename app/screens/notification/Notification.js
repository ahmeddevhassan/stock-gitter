import React, { Component } from 'react';
import { View, TouchableOpacity, AsyncStorage, Text, Alert, BackHandler } from 'react-native';
import { connect } from "react-redux";
import Loading from '../../components/Loadng';
import styles from './style'
import HeaderWhite from '../../components/headerWhite';
import { Container, Content, Tab, Tabs } from 'native-base';
import NotifiComponents from '../../components/NotifiComponent';
import { getNotificationJMDAction, getNotificationUSDAction } from '../../redux/actions/NewsAction';
import { BUTTON_LOGIN_COLOUR } from '../../utils/Consts';
import _ from 'lodash';
import { getUserSimulationJMD, getUserSimulationUSD, getBrokerUSDAction, getBrokerJMDAction, setOrderLanguage, getPreferredSimulationBrokerAction } from '../../redux/actions/SimulationAction';
import { LinearGradient } from 'expo-linear-gradient';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showScanner: false,
      role: null,
      notificationUSdRead: [],
      notificationUSdUnRead: [],
      notificationJMdRead: [],
      notificationJMdUnRead: [],
    }
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.props.getPreferredSimulationBrokerAction()
    this.props.getUserSimulationUSD();
    this.props.getUserSimulationJMD();
    this.props.getNotificationUSDAction();
    this.props.getNotificationJMDAction().then(res => {
      console.log("this.props.notificationUSD screen", this.props.notificationUSD);

      var filterKeyArrayUnSeen = ["0"]
      var filterKeyArraySeen = ["1"]
      var resuleUnseen = _.pickBy(this.props.notificationUSD.notifications, e => _.includes(filterKeyArrayUnSeen, e.seen))
      var resultSeen = _.pickBy(this.props.notificationUSD.notifications, e => _.includes(filterKeyArraySeen, e.seen))
      console.log(typeof (resultSeen))
      this.state.notificationUSdUnRead = _.values(resuleUnseen)
      this.state.notificationUSdRead = _.values(resultSeen)
      resuleUnseen = _.pickBy(this.props.notificationUSD.notifications, e => _.includes(filterKeyArrayUnSeen, e.seen))
      resultSeen = _.pickBy(this.props.notificationUSD.notifications, e => _.includes(filterKeyArraySeen, e.seen))
      this.state.notificationJMdUnRead = _.values(resuleUnseen)
      this.state.notificationJMdRead = _.values(resultSeen)
      this.setState({ notificationJMdUnRead: this.state.notificationJMdUnRead, notificationJMdRead: this.state.notificationJMdRead, notificationUSdRead: this.state.notificationUSdRead, notificationUSdUnRead: this.state.notificationUSdUnRead })
    })

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
  renderNewUpdateUSD() {
    return (
      <Content>
        <View style={styles.UpdateContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.headingUpdate}>
              New Update
        </Text>
          </View>
          {
            this.state.notificationUSdUnRead && this.state.notificationUSdUnRead.length > 0 ?
              this.state.notificationUSdUnRead.map((arr, index) => {
                return (
                  <NotifiComponents data={arr} key={"index" + index} />
                )
              })
              : <Text> No more new notification found</Text>

          }
        </View>
      </Content>)
  }
  renderNewUpdateJMD() {
    return (
      <Content>
        <View style={styles.UpdateContainer}>

          {
            this.state.notificationJMdUnRead && this.state.notificationJMdUnRead.length > 0 ?
              this.state.notificationJMdUnRead.map((arr, index) => {
                return (
                  <NotifiComponents data={arr} key={"index" + index} />
                )
              })
              : <Text> No more new notification found</Text>

          }
        </View>
      </Content>)
  }
  renderNotificationsUSD() {
    return (
      this.state.notificationUSdRead && this.state.notificationUSdRead.length > 0 ?
        this.state.notificationUSdRead.map((arr, index) => {
          return (
            <NotifiComponents data={arr} key={"index" + index} />
          )
        })
        : <Text> No more notification found</Text>
    )
  }
  renderNotificationsJMD() {
    return (
      this.state.notificationJMdRead && this.state.notificationJMdRead.length > 0 ?
        this.state.notificationJMdRead.map((arr, index) => {
          return (
            <NotifiComponents data={arr} key={"index" + index} />
          )
        })
        : <Text> No more notification found</Text>
    )
  }
  renderLinearStatsUSD() {
    return (
      <LinearGradient
        colors={['#2189BC', '#0A496A',]}
        style={{ padding: 10, alignItems: 'center', borderRadius: 15, width: "90%", alignSelf: 'center', marginLeft: 25, marginRight: 25, marginTop: 10, marginBottom: 10, }}>
        <View style={styles.FollowContainer}>
          <Text
            style={styles.valueHeaderText}>
            Account Value
          </Text>
          <Text
            style={styles.valueTitleText}>
            $ {this.props.simulationSettingUSD && this.props.simulationSettingUSD.account_value}
          </Text>
        </View>
        <View style={styles.FollowContainer}>
          <Text
            style={styles.valueHeaderText}>
            Available for investing

          </Text>
          <Text
            style={styles.valueTitleText}>
            $ {this.props.simulationSettingUSD && this.props.simulationSettingUSD.available_for_investing}
          </Text>
        </View>
        <View style={styles.FollowContainer}>
          <Text
            style={styles.valueHeaderText}>
            Investment amount

          </Text>
          <Text
            style={styles.valueTitleText}>
            $ {this.props.simulationSettingUSD && this.props.simulationSettingUSD.totalInvAmount}
          </Text>
        </View>
        <View style={styles.FollowContainer}>
          <Text
            style={styles.valueHeaderText}>
            Gain/Loss
          </Text>
          <Text
            style={styles.valueTitleText}>
            $ {this.props.simulationSettingUSD && this.props.simulationSettingUSD.gainLoss}
          </Text>
        </View>
      </LinearGradient>
    );

  }
  renderCurrentSimulation() {
    return (
      <Content contentContainerStyle={{ marginTop: 15, }}>
        <View style={styles.UpdateContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.headingUpdate}>
              Current Simulated Balance
        </Text>
          </View>

          {this.renderLinearStatsUSD()}

        </View>
      </Content>)

  }

  renderPreferredBroker() {
    return (
      <Content contentContainerStyle={{ marginTop: 15, }}>
        <View style={styles.UpdateContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.headingUpdate}>
              Preferred Broker
        </Text>
          </View>
          <LinearGradient
            colors={['#2189BC', '#0A496A',]}
            style={{ padding: 10, alignItems: 'center', borderRadius: 15, width: "90%", alignSelf: 'center', marginLeft: 25, marginRight: 25, marginTop: 10, marginBottom: 10, }}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('OrderForm')}>
              <View style={styles.FollowContainer}>

                <Text
                  style={styles.valueTitleText}>
                  {this.props.oneBroker?.broker?.first_name}
                </Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>

        </View>
      </Content >)
  }
  render() {
    return (
      <Container>
        <HeaderWhite label={"Activity & Investment"} back={false} />
        <Content>
          <Tabs tabContainerStyle={{ backgroundColor: '#666666' }} tabBarUnderlineStyle={{ backgroundColor: BUTTON_LOGIN_COLOUR }}>
            <Tab heading="Activity" tabStyle={{ backgroundColor: "#f6f8fa" }} activeTabStyle={{ backgroundColor: "#f6f8fa" }} activeTextStyle={{ color: BUTTON_LOGIN_COLOUR }}>
              {this.renderNewUpdateUSD()}
              {/* {this.renderNewUpdateJMD()} */}
              {this.renderNotificationsUSD()}
            </Tab>
            <Tab heading="Investment" tabStyle={{ backgroundColor: "#f6f8fa" }} activeTabStyle={{ backgroundColor: "#f6f8fa" }} activeTextStyle={{ color: BUTTON_LOGIN_COLOUR }}>

              {this.renderCurrentSimulation()}
              {this.renderPreferredBroker()}
            </Tab>

          </Tabs>
        </Content>
      </Container>
    );
  }
}

let mapStateToProps = state => ({
  notificationUSD: state.notification.notificationUSD,
  notificationJMD: state.notification.notificationJMD,
  simulationSettingUSD: state.simulation.simulationSettingUSD,
  simulationSettingJMD: state.simulation.simulationSettingJMD,
  oneBroker: state.simulation.oneBroker,
});

let mapDispatchToProps = dispatch => ({
  getNotificationUSDAction: () => dispatch(getNotificationUSDAction()),
  getNotificationJMDAction: () => dispatch(getNotificationJMDAction()),
  getUserSimulationUSD: (data) => dispatch(getUserSimulationUSD(data)),
  getUserSimulationJMD: (data) => dispatch(getUserSimulationJMD(data)),
  getPreferredSimulationBrokerAction: (data) => dispatch(getPreferredSimulationBrokerAction(data)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);