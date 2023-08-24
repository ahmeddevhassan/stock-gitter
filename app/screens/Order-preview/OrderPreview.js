import React, { Component } from 'react';
import { View, TouchableOpacity, AsyncStorage, Text, Alert, BackHandler } from 'react-native';
import { connect } from "react-redux";
import Loading from '../../components/Loadng';
import styles from './style'
import Header from '../../components/header';
import { Container, Content, Tab, Tabs, Left, Right } from 'native-base';
import { ListOrdersActionUSD, ListOrdersActionJMD, getCompanyAction } from '../../redux/actions/SimulationAction';
import { BUTTON_LOGIN_COLOUR } from '../../utils/Consts';

class OrderPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showScanner: false,
      role: null,
      loading: false,
    }
  }
  componentDidMount() {
    this.props.listOrderJMD();
    this.props.listOrderUSD().then(err => {
      console.log("3");

      this.setState({ loading: true });
    });
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
  renderOrderDetail(heading, value) {

    return (
      <View style={styles.viewRow}>
        <Left>
          <Text>
            {heading}
          </Text>
        </Left>
        <Right>
          <Text>
            {value}
          </Text>
        </Right>
      </View>
    )
  }
  renderOrderArrUSD() {
    if (this.props.orderListUSD) {
      return (
        this.props.orderListUSD.map((key, index) => {
          return (
            <View key={index} style={styles.borderCorner}>

              {this.renderOrderDetail("Name", key.company_name)}
              {/* {this.renderOrderDetail("Symbol", key.company_symbol)} */}
              {/* {this.renderOrderDetail("Company Price", "$" + key.price)} */}
              {/* {this.renderOrderDetail("User Name", key.client_name)}
              {this.renderOrderDetail("Broker", key.broker_name)}
              {this.renderOrderDetail("Order Type", key.order_type == 2 ? "Limit" : "Market")}
              {this.renderOrderDetail("Fees", key.fees)}
              {this.renderOrderDetail("Quantity", key.quantity_to_buy)}
              {this.renderOrderDetail("Investment Preference", key.investment_preferences == 1 ? "Stock" : key.investment_preferences == 2 ? "Mutual Fund" : "Forex")}
              {this.renderOrderDetail("Action", key.action == 1 ? "Buy" : "Sell")}
              {this.renderOrderDetail("Market", key.market == 2 ? "JMD" : "USD")}
              {this.renderOrderDetail("Total", key.total)}*/}
              {this.renderOrderDetail("Created At", key.created_at)}
              {this.renderOrderDetail("Status", key.status)}
            </View>
          )

        })
      );
    }
    else {
      return (
        <Text style={styles.centerText}>
          No order history found
        </Text>
      )
    }

  }
  renderOrderArrJMD() {
    if (this.props.orderListJMD) {
      return (
        this.props.orderListJMD.map((key, index) => {
          return (
            <View key={index} style={styles.borderCorner}>

              {this.renderOrderDetail("Name", key.company_name)}
              {/* {this.renderOrderDetail("Symbol", key.company_symbol)}
              {this.renderOrderDetail("Company Price", "$" + key.price)}
              {this.renderOrderDetail("User Name", key.client_name)}
              {this.renderOrderDetail("Broker", key.broker_name)}
              {this.renderOrderDetail("Order Type", key.order_type == 2 ? "Limit" : "Market")}
              {this.renderOrderDetail("Fees", key.fees)}
              {this.renderOrderDetail("Quantity", key.quantity_to_buy)}
              {this.renderOrderDetail("Investment Preference", key.investment_preferences == 1 ? "Stock" : key.investment_preferences == 2 ? "Mutual Fund" : "Forex")}
              {this.renderOrderDetail("Action", key.action == 1 ? "Buy" : "Sell")}
              {this.renderOrderDetail("Market", key.market == 2 ? "JMD" : "USD")}
              {this.renderOrderDetail("Total", key.total)} */}
              {this.renderOrderDetail("Created At", key.created_at)}
              {this.renderOrderDetail("Status", key.status)}
            </View>
          )

        })
      )
    } else {
      return (
        <Text style={styles.centerText}>
          No order history found
        </Text>
      )
    }

  }
  render() {
    return (
      <Container>
        <Header label={"Order History"} navi={this.props.navigation} back={"Profile"} />
        {this.state.loading ?
          <Content>
            <Tabs tabContainerStyle={{ backgroundColor: '#666666' }} tabBarUnderlineStyle={{ backgroundColor: BUTTON_LOGIN_COLOUR }}>
              <Tab heading="USD" tabStyle={{ backgroundColor: "#f6f8fa" }} activeTabStyle={{ backgroundColor: "#f6f8fa" }} activeTextStyle={{ color: BUTTON_LOGIN_COLOUR }}>

                <View style={styles.ViewMargin}>

                  {this.renderOrderArrUSD()}

                </View>
              </Tab>
              <Tab heading="Jamaica" tabStyle={{ backgroundColor: "#f6f8fa" }} activeTabStyle={{ backgroundColor: "#f6f8fa" }} activeTextStyle={{ color: BUTTON_LOGIN_COLOUR }}>
                <View style={styles.ViewMargin}>

                  {this.renderOrderArrJMD()}
                </View>
              </Tab>
            </Tabs>

          </Content>
          : <Text>

          </Text>
        }
      </Container>

    );
  }
}

let mapStateToProps = state => ({
  loader: state.auth.loader,
  orderListUSD: state.simulation.orderListUSD,
  orderListJMD: state.simulation.orderListJMD,
});

let mapDispatchToProps = dispatch => ({
  listOrderUSD: () => dispatch(ListOrdersActionUSD()),
  listOrderJMD: () => dispatch(ListOrdersActionJMD()),
  getCompanyAction: (data, language) => dispatch(getCompanyAction(data, language)),

});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderPreview);