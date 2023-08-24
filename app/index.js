import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import Router from './router';
import store from './redux/store';
import * as assets from '../assets';
import * as Font from 'expo-font';
const FontAwesome = require('../assets/fonts/FontAwesome.otf');
export default class App extends Component {
  state = {
    load: false,
  };

  async componentWillMount() {
    loadAssets().then(() => this.setState({ load: false }));
    await Font.loadAsync({
      'FontAwesome': require('../assets/fonts/FontAwesome.otf')
    }).then(re => {
      console.log("re", re);
      this.setState({ load: true })

    })
  }

  render() {
    if (!this.state.load) return <View />;
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

const loadAssets = async () => {
  await Promise.all([...assets.imageAssets, ...assets.fontAssets]);
};
