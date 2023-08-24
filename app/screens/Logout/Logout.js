import React, { Component } from 'react';
import { View } from "react-native";
import { signOut } from "../../redux/actions/UserActions";
import { connect } from "react-redux";



class Logout extends Component {

  componentDidMount() {
    const { navigation } = this.props;
    setTimeout(() => {
      this.props.signOut(navigation);
    }, 1100);

  }
  render() {
    console.disableYellowBox = true;
    return (
      <View >
      </View>
    );
  }
}

const mapStateToProps = state => ({
  email: state.auth.email,
});

const mapDispatchToProps = dispatch => ({
  signOut: navigation => dispatch(signOut(navigation)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);
