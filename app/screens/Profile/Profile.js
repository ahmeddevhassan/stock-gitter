import React, { Component } from 'react';
import { View, TouchableOpacity, AsyncStorage, Text, Alert, BackHandler, Image } from 'react-native';
import { connect } from "react-redux";
import Loading from '../../components/Loadng';
import styles from './style'
import HeaderWhite from '../../components/headerWhite';
import { Container, Content } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { images } from '../../../assets';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { SetLoginData, setDeviceId, ChangeAvatar } from '../../redux/actions/UserActions';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showScanner: false,
      role: null,
      image: null,

    }
    this.state.image = this.props.loginData.avatar;
    console.log("this.props.loginData", this.props.loginData);


  }
  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }
  componentDidMount() {
    this.getPermissionAsync();
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
  renderGradiantView(image, tag, screen) {
    return (

      <LinearGradient
        colors={['#2189BC', '#0A496A',]}
        style={{ padding: 15, alignItems: 'center', justifyContent: 'center', borderRadius: 15, margin: 10, maxHeight: 120, maxWidth: 130, width: "35%", }}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate(screen)}>
          <View style={styles.ButtonContainer}>
            <Image source={image} />
            <Text
              style={styles.textFollowHeading}>
              {tag}
            </Text>
          </View>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    //console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      this.props.loginData.avatar = "data:image/png;base64," + result.base64;
      // api call for image result.uri.base64 
      //console.log("this.props.loginData.avatar", this.props.loginData.avatar);
      console.log("result.uri", result.uri);

      AsyncStorage.setItem('UserData1', JSON.stringify(this.props.loginData));
      this.props.SetLoginData(this.props.loginData);
      let cred = {
        avatar: result.uri
      }
      this.props.ChangeAvatar(cred)

    }
  };

  render() {
    return (
      <Container>
        <HeaderWhite label={"Profile"} back={false} navi={this.props.navigation} />
        <Content>
          <View style={{ alignItems: 'center', }}>
            <TouchableOpacity style={styles.img} onPress={() => this._pickImage()
            }>
              <Image source={{ uri: this.state.image ? this.state.image : 'https://i.stack.imgur.com/l60Hf.png' }} style={styles.img} />
            </TouchableOpacity>
            <LinearGradient
              colors={['#009344', '#00662F', '#004A22']}
              style={{ position: 'relative', padding: 15, alignItems: 'center', borderRadius: 15, marginTop: 42, marginLeft: 25, marginRight: 25, marginBottom: 25, width: "80%" }}>
              <View style={styles.ButtonContainer}>
                <Text
                  style={styles.valueFollowText}>
                  Hello {this.props.loginData.name}
                </Text>
              </View>

            </LinearGradient>
          </View>

          {/* //proifle */}
          <LinearGradient
            colors={['#2189BC', '#0A496A',]}
            style={{ padding: 15, alignItems: 'center', borderRadius: 15, width: "80%", alignSelf: 'center', marginLeft: 25, marginRight: 25, marginTop: 10, marginBottom: 10, }}>
            <View style={styles.FollowContainer}>
              <Text
                style={styles.valueFollowText}>
                123
          </Text>
              <Text
                style={styles.textFollowHeading}>
                Followers
          </Text>

              <View style={styles.margin}>

              </View>

              <Text
                style={styles.valueFollowText}>
                123
          </Text>

              <Text
                style={styles.textFollowHeading}>
                Followings
          </Text>
            </View>
          </LinearGradient>


          <View style={styles.belowContainer}>
            <View style={styles.rowStyle}>
              {this.renderGradiantView(images.wifiIcon, "News", "News")}
              {this.renderGradiantView(images.userProfile, "Profile", "ProfileUpdateScreen")}

            </View>
            <View style={styles.rowStyle}>
              {this.renderGradiantView(images.groupIcon, "History", "OrderHistory")}
              {this.renderGradiantView(images.belluser, "Alerts", "Alerts")}

            </View>
            <View style={styles.rowStyle}>
              {this.renderGradiantView(images.groupIcon, "Subscription", "Subscription")}
              {this.renderGradiantView(images.userProfile, "Watch List", "watchList")}


            </View>
            <View style={styles.rowStyle}>
              {this.renderGradiantView(images.userProfile, "Sign Out", "Logout")}


            </View>

          </View>

        </Content>

      </Container>

    );
  }
}

let mapStateToProps = state => ({
  loginData: state.auth.loginData,
});

let mapDispatchToProps = dispatch => ({
  SetLoginData: (data) => dispatch(SetLoginData(data)),
  ChangeAvatar: (data) => dispatch(ChangeAvatar(data)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);