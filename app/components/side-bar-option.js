import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { DrawerActions } from 'react-navigation';

const SideBar = (props) => {
  return (
    <TouchableOpacity onPress={() => {
      props.navigation.dispatch(DrawerActions.closeDrawer());
      props.navigation.navigate(props.navigate)
    }}>
      <View style={styles.viewStyle}>
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
          <Icon type="FontAwesome" name={props.iconName} />
          <Text style={{ margin: 5 }}>
            {props.heading}
          </Text>
        </View>
        <Icon name="angle-right" type="FontAwesome" />
      </View>
    </TouchableOpacity>
  )
}
const styles = {
  viewStyle: {
    flexDirection: 'row',
    margin: 5,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}
export {
  SideBar
}