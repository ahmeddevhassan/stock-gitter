import React, { Component } from 'react';
import { View, TouchableOpacity, AsyncStorage, Text, Alert, BackHandler, Modal, ActivityIndicator, Keyboard } from 'react-native';
import { connect } from "react-redux";
import Loading from '../../components/Loadng';
import styles from './style'
import HeaderWhite from '../../components/headerWhite';
import { WebView } from 'react-native-webview'
import { Container, Content } from 'native-base';
import TextInputComponent from '../../components/TextInput';
import { searchValueActipn, setSearchValue, setSearchResult, setSearchSymbolUSDAction, setSearchStockUSDAction } from '../../redux/actions/UserActions';
import { BUTTON_LOGIN_COLOUR, Activity_INDICATOR_SIZE, Activity_INDICATOR_COLOR, LOGOUT } from '../../utils/Consts';
import { GetToken } from '../../utils/helper';
import SearchScreen from '../Search/SearchScreen';
import SearchResult from '../SearchResult';
import reducers from '../../redux/reducers';
import { TouchableHighlight } from 'react-native-gesture-handler';
import moment from 'moment'
import ButtonComponent from '../../components/Button';
import { addToWatchLostAction, getwatchlistStock, removeFromWatchlistAction } from '../../redux/actions/SimulationAction';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showScanner: false,
      role: null,
      inputValue: '',
      searchResult: false,
      loaded: false,
      symbol: 'ACOR',
      loadAll: false,
      show: false,
    }

  }
  componentDidMount() {
    this.props.getwatchlistStock()
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

  getSearchValue = (data) => {
    this.setState({ inputValue: data });
    this.props.searchValueAction(data).then(res => {
      console.log(this.props.searchResult);
    });

  }
  showSearch = (data) => {
    this.setState({ show: false, symbol: data })
    console.log(" QAAA", data);

    this.props.setSearchSymbolUSDAction(data.symbol).then(res => {
      // this.setState({ show: false, searchResult: true, })

    });
    this.props.setSearchStockUSDAction(data.symbol).then(res => {
      this.setState({ show: false, searchResult: true, })
      console.log("stockUSDSearch", this.props.stockUSDSearch);


    });
    console.log("symbolUSDSearch", this.props.symbolUSDSearch);

    // setTimeout(() => {false
    //   this.setState({ show: false })
    // }, 6000);
  }
  webviewDidLoad() {
    this.setState({ loaded: true });
  }
  renderWatchList(data) {
    let abc = false;
    if (this.props.watchliststock && this.props.watchliststock[0] && this.props.watchliststock[0].watchlist && this.props.watchliststock[0].watchlist.length > 0) {
      console.log("ifw");

      for (let i = 0; i < this.props.watchliststock[0]?.watchlist.length; i++) {
        let key = this.props.watchliststock[0]?.watchlist[i];
        if (key.company_id == data) {
          abc = true
        }
      }

    }

    return abc
  }
  returnWatch(data) {
    if (this.renderWatchList(data)) {
      return (

        <TouchableOpacity onPress={() => this.props.removeFromWatchlistAction(this.props.symbolUSDSearch.symbol).then(res => {
          this.props.getwatchlistStock()
        })


        } style={{ width: "100%" }}>


          <View style={{ backgroundColor: '#007B38', width: "80%", height: 50, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 15 }}>
              Remove Watch
     </Text>
          </View>
        </TouchableOpacity >
      )
    }
    else {
      return (
        <TouchableOpacity onPress={() => this.props.addToWatchLostAction({
          company_id: this.props?.symbolUSDSearch?.id,
          group_id: 451
        }).then(res => {
          this.props.getwatchlistStock()
        })


        } style={{ width: "100%" }}>


          <View style={{ backgroundColor: '#007B38', width: "80%", height: 50, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 15 }}>
              Watch
     </Text>
          </View>
        </TouchableOpacity >
      )
    }

  }
  render() {
    let yourAlert = 'setTimeout(function(){ var headerToggle = document.getElementsByClassName("footer");  headerToggle[0].style.display = "none";    headerToggle = document.getElementsByClassName("navbar"); headerToggle[0].style.display = "none"; headerToggle = document.getElementsByClassName("p-communicatin-area"); headerToggle[0].style.display = "none";; headerToggle = document.getElementsByClassName("symbol-content"); headerToggle[0].style.display = "none"; headerToggle = document.getElementsByClassName("lbtn-xs"); headerToggle[1].style.display = "none" }, 3000);'
    return (
      <View style={{ borderWidth: 1, borderColor: 'pink', height: '100%' }}>
        <HeaderWhite back={false} label={"Search"} />
        <Modal
          transparent={true}
          style={styles.modalStyle}
          visible={this.state.show}
          onRequestClose={() => {
          }}>
          <View style={styles.modalViewStyle}>
            <ActivityIndicator size={Activity_INDICATOR_SIZE} color={Activity_INDICATOR_COLOR} />
          </View>
        </Modal>




        {!this.state.searchResult ?
          <>
            <View style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', width: "100%", alignItems: 'center', flexDirection: 'row' }}>
              <View style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', borderColor: '#b5b5b5', borderRadius: 50, borderWidth: 1, width: "85%", alignSelf: 'center' }}>
                <TextInputComponent value={this.state.inputValue} label={"Enter Search.."} handleInput={this.getSearchValue} />
              </View>
              {this.props.searchResult && this.props.searchResult.length > 0 ?
                <Text onPress={() => { Keyboard.dismiss(); this.props.setSearchResult(null); this.setState({ inputValue: '' }) }} style={{ fontSize: 18, margin: 10, }}>
                  x
           </Text>
                : <></>}
            </View>
            <>
              <View >
                {this.props.searchResult && this.props.searchResult.length > 0 && this.props.searchResult.map((key, index) => {
                  if (key.type == "company") {

                    return (
                      <TouchableOpacity onPress={() => this.showSearch(key)}>
                        <View key={"search" + index} style={{ flexDirection: 'row', alignItems: 'center', margin: 5, marginTop: 10, marginBottom: 10, borderBottomWidth: 0.5, borderBottomColor: '#b5b5b5' }}>
                          <Text key={"searchText1" + index} style={{ fontWeight: '500', fontSize: 18 }}>
                            {key.symbol}
                          </Text>
                          <Text key={"searchText2" + index} style={{ fontSize: 18 }}>
                            {key.name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )
                  }

                })}
              </View>
              {!this.props.searchResult ?
                <View style={{ flex: 1, }}>
                  <SearchScreen showSearch={this.showSearch} symbol={this.state.symbol} />
                </View>
                : <></>
              }
            </>

          </> :
          <View style={{ flex: 1, width: "100%", height: "100%", }}>
            <TouchableHighlight onPress={() => this.setState({ searchResult: false })}>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: "100%", padding: 20, backgroundColor: BUTTON_LOGIN_COLOUR }}>
                <Text style={{ color: '#fff' }} >
                  Back to Search
              </Text>
              </View>
            </TouchableHighlight>
            {/* {

              <WebView
                ref="webview"
                style={{ flex: 1, width: "100%", height: "100%" }}
                source={{
                  uri: 'https://www.stockgitter.com/USD/symbol/' + this.state.symbol, headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + GetToken(),
                    "Access-Control-Allow-Origin": "*"
                  }
                }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                originWhitelist={["*"]}

                // injectedJavaScript={'function hideHeaderToggle() {console.log("123"); var headerToggle = document.getElementsByClassName("footer"), i; headerToggle[0].style.display = "none";}; hideHeaderToggle();'}
                injectedJavaScript={yourAlert}
              />

            } */}
            <View style={{ flexDirection: 'row', height: 210, }}>
              <View style={{ marginLeft: 8, width: "60%", flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  <Text style={{ color: 'black', fontSize: 22, marginTop: 5, marginBottom: 5, }}>
                    {this.props.symbolUSDSearch ? this.props.symbolUSDSearch.name : ''} :
                  {this.props.symbolUSDSearch ? this.props.symbolUSDSearch.symbol : ''}
                  </Text>
                </View>

                <Text style={{ color: '#13628A', fontSize: 26, marginTop: 5, marginBottom: 5, }}>
                  $ {this.props.stockUSDSearch?.open}
                </Text>
                <Text style={{ color: '#007636', fontSize: 22, marginTop: 5, marginBottom: 5, }}>
                  {this.props.symbolUSDSearch ? this.props.symbolUSDSearch.sector : ''}
                </Text>
                <Text style={{ color: '#707070', fontSize: 15, marginTop: 5, marginBottom: 5, }}>
                  {this.props.symbolUSDSearch ? moment(this.props.symbolUSDSearch.last_refreshed).format('LLLL') : ''}
                </Text>


              </View>
              <View style={{ width: "40%", justifyContent: 'center', alignItems: 'center' }}>


                {this.returnWatch(this.props?.symbolUSDSearch?.id)}

                <TouchableOpacity onPress={() => this.props.navigation.navigate('OrderForm')} style={{ width: "100%" }}>
                  <View style={{ marginTop: 10, backgroundColor: '#13628A', width: "80%", height: 50, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontSize: 15 }}>
                      TRADE
                 </Text>
                  </View>
                </TouchableOpacity>

              </View>

            </View>
            <SearchResult symbol={this.state.symbol} />

          </View>

        }
      </View>
    );
  }
}

let mapStateToProps = state => ({
  watchliststock: state.simulation.watchliststock,
  searchResult: state.search.searchResult,
  symbolUSDSearch: state.search.symbolUSDSearch,
  stockUSDSearch: state.search.stockUSDSearch
});

let mapDispatchToProps = dispatch => ({
  searchValueAction: (data) => dispatch(searchValueActipn(data)),
  setSearchValue: (data) => dispatch(setSearchValue(data)),
  setSearchResult: (data) => dispatch(setSearchResult(data)),
  setSearchSymbolUSDAction: (data) => dispatch(setSearchSymbolUSDAction(data)),
  setSearchStockUSDAction: (data) => dispatch(setSearchStockUSDAction(data)),
  addToWatchLostAction: (data) => dispatch(addToWatchLostAction(data)),

  getwatchlistStock: () => dispatch(getwatchlistStock()),
  removeFromWatchlistAction: (data) => dispatch(removeFromWatchlistAction(data)),



});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);