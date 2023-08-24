import * as Font from 'expo-font';

export const fonts = [
  {
    FontAwesome: require('./FontAwesome.otf'),
  },
  {
    Panton: require('./Panton-BlackCaps.otf'),
  },
  {
    PantonItalic: require('./Panton-BlackitalicCaps.otf'),
  },
  {
    PantonLight: require('./Panton-LightCaps.otf'),
  },
  {
    PantonLightItaic: require('./Panton-LightitalicCaps.otf'),
  },

];

export const fontAssets = fonts.map(font => {
  console.log("loading Font ", font);

  Font.loadAsync(font).then(key => {
    console.log(" fnt loaded", key);

  })
});
