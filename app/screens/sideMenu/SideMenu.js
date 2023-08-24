import React, { Component } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { DrawerActions } from 'react-navigation';
import { connect } from "react-redux";
import { SideBar } from '../../components/side-bar-option';
import { signOut } from '../../redux/actions/UserActions'

class SideMenu extends Component {
  callUserDetail() {
    this.props.navigation.dispatch(DrawerActions.closeDrawer());
    this.props.navigation.navigate('userDetail', { data: this.props.loginData });
  }
  render() {
    const { navigation } = this.props;
    return (

      <View style={{ flex: 1 }}>
        <SafeAreaView />
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => this.callUserDetail()}>
            <View style={{ height: 150, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.text}>{this.props.loginData.user_name}</Text>
              <Text style={styles.description}>{this.props.loginData.company_type}</Text>
            </View>
          </TouchableOpacity>
          {this.props.loginData.company_type == "Warehouse" ?
            <SideBar navigation={navigation} navigate={"OrderTab"} iconName={"list"} heading={"Order"} />
            : <Text>
              ''
            </Text>
          }
          <SideBar navigation={navigation} navigate={"WorkbagTab"} iconName={"list"} heading={"WORK BAG"} />
          <SideBar navigation={navigation} navigate={"NotificationTab"} iconName={"bell"} heading={"NOTIFICATIONS"} />
        </View>
        <View style={{ margin: 8 }}>

          <SideBar navigation={navigation} navigate={"Logout"} iconName={"sign-out"} heading={"LOG OUT"} />

        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    paddingTop: 25,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 17,
  },
  description: {
    fontSize: 15,
    color: '#6f6666',
  },
  button: {
    margin: 16,
    fontSize: 16,
  },
};
let mapStateToProps = state => ({
  loginData: state.auth.loginData
});

let mapDispatchToProps = dispatch => ({

});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu);