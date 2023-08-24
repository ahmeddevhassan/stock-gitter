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
import { getwatchlistBond, getwatchlistForex, getwatchlistStock } from '../../redux/actions/SimulationAction';
import { ThemeProvider } from 'react-native-elements';
class WatchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showScanner: false,
      role: null,
    }
  }
  componentDidMount() {
    this.props.getwatchlistBond();
    this.props.getwatchlistForex();
    this.props.getwatchlistStock();
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
  renderView(key) {
    let abc = (key.stock_info.open - key.stock_info.close) / key.stock_info.open * 100

    return <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 15, marginRight: 15, marginTop: 10 }}>
      <Left>
        <Text style={{ fontSize: 18, color: '#000', margin: 5 }}>
          {key.company_symbol}
        </Text>
        <Text style={{ fontSize: 17, color: '#b5b5b5', margin: 5 }}>
          {key.company_name}
        </Text>
      </Left>
      <Right>
        <Text style={{ fontSize: 18, color: BUTTON_LOGIN_COLOUR, margin: 5 }}>
          ${key.stock_info.open}
        </Text>
        <Text style={{ fontSize: 17, color: BUTTON_LOGIN_COLOUR, margin: 5 }}>
          {(key.stock_info.open - key.stock_info.close).toString().slice(0, 3)} ({abc ? abc.toString().slice(0, 3) : 'NAN'})
        </Text>
      </Right>
    </View>
  }

  renderForex() {
    if (this.props.watchlistforex && this.props.watchlistforex.length > 0) {

      return (<View >
        <Text style={{
          margin: 10, alignSelf: 'center', fontSize: 20
        }}>
          Default Watch List
        </Text>
        {this.props.watchlistforex[0].watchlist && this.props.watchlistforex[0].watchlist.length > 0 && this.props.watchlistforex[0].watchlist.map(key => {
          return (
            this.renderView(key)
          )
        })}
        {!this.props.watchlistforex[0].watchlist ?
          <View >
            <Text style={{
              margin: 10, alignSelf: 'center'
            }}>
              No Watch list Found
            </Text>
          </View>
          : <></>
        }
      </View>)
    }
    else {
      return (<View >
        <Text style={{
          margin: 10, alignSelf: 'center'
        }}>
          No Watch list Found
        </Text>
      </View>)
    }
  }
  renderBond() {
    if (this.props.watchlistbond && this.props.watchlistbond.length > 0) {

      return (<View >
        <Text style={{
          margin: 10, alignSelf: 'center', fontSize: 20
        }}>
          Default Watch List
        </Text>
        {this.props.watchlistbond[0].watchlist && this.props.watchlistbond[0].watchlist.length > 0 && this.props.watchlistbond[0].watchlist.map(key => {

          return (
            this.renderView(key)
          )
        })}
        {!this.props.watchlistbond[0].watchlist ?
          <View >
            <Text style={{
              margin: 10, alignSelf: 'center'
            }}>
              No Watch list Found
            </Text>
          </View>
          : <></>
        }

      </View>)
    }
    else {
      return (<View >
        <Text style={{
          margin: 10, alignSelf: 'center'
        }}>
          No Watch list Found
        </Text>
      </View>)
    }
  }
  renderstock() {

    if (this.props.watchliststock && this.props.watchliststock.length > 0) {

      return (<View >
        <Text style={{
          margin: 10, alignSelf: 'center', fontSize: 20
        }}>
          Default Watch List
        </Text>
        {this.props.watchliststock[0].watchlist && this.props.watchliststock[0].watchlist.length > 0 && this.props.watchliststock[0].watchlist.map(key => {

          return (
            this.renderView(key)
          )
        })}
        {!this.props.watchliststock[0].watchlist ?
          <View >
            <Text style={{
              margin: 10, alignSelf: 'center'
            }}>
              No Watch list Found
            </Text>
          </View>
          : <></>
        }

      </View>)
    }
    else {
      return (<View >
        <Text style={{
          margin: 10, alignSelf: 'center'
        }}>
          No Watch list Found
        </Text>
      </View>)
    }
  }
  render() {
    return (
      <Container>
        <Header label={"Watch List"} navi={this.props.navigation} back={"Profile"} />

        <Tabs tabContainerStyle={{ backgroundColor: '#666666' }} tabBarUnderlineStyle={{ backgroundColor: BUTTON_LOGIN_COLOUR }}>
          <Tab heading="Stock" tabStyle={{ backgroundColor: "#f6f8fa" }} activeTabStyle={{ backgroundColor: "#f6f8fa" }} activeTextStyle={{ color: BUTTON_LOGIN_COLOUR }}>
            <Container>
              <Content>
                {this.renderstock()}
              </Content></Container>
          </Tab>
          <Tab heading="Forex" tabStyle={{ backgroundColor: "#f6f8fa" }} activeTabStyle={{ backgroundColor: "#f6f8fa" }} activeTextStyle={{ color: BUTTON_LOGIN_COLOUR }}>
            <Container>
              <Content>
                {this.renderForex()}

              </Content>
            </Container>
          </Tab>
          <Tab heading="Bonds" tabStyle={{ backgroundColor: "#f6f8fa" }} activeTabStyle={{ backgroundColor: "#f6f8fa" }} activeTextStyle={{ color: BUTTON_LOGIN_COLOUR }}>
            <Container>
              <Content>
                {this.renderBond()}

              </Content>
            </Container>
          </Tab>
        </Tabs>
      </Container>


    );
  }
}

let mapStateToProps = state => ({
  watchliststock: state.simulation.watchliststock,
  watchlistbond: state.simulation.watchlistbond,
  watchlistforex: state.simulation.watchlistforex,
});

let mapDispatchToProps = dispatch => ({
  getwatchlistStock: () => dispatch(getwatchlistStock()),
  getwatchlistForex: () => dispatch(getwatchlistForex()),
  getwatchlistBond: () => dispatch(getwatchlistBond()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WatchList);