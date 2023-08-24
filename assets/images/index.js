import { Asset } from 'expo-asset';

export const images = {
  menu: require('./menu.png'),
  home: require('./home.png'),
  user: require('./user.png'),
  Login: require('./logo.png'),
  Sample: require('./imageSample1.jpg'),
  Splash: require('./splash_logo.png'),
  Logo: require('./newLogo.png'),
  ring: require('./ring.jpg'),
  scanner: require('./barcode-scanner.png'),
  order: require('./tracking.png'),
  notification: require('./notification.png'),
  notificationPoint: require('./notification-point.png'),
  // new 
  SplashBackgroupImage: require('./forex-stock-crisis-venture_53876-64924.png'),
  splashLogo: require('./logo-white.png'),
  headerCurve: require('./headercurv.png'),
  tabBellSelect: require('./Bell(Selected).png'),
  tabBellUnSelect: require('./bell.png'),
  gameControlerSelect: require('./game-controller(selected).png'),
  gameControlerUnSelect: require('./game-controller.png'),
  menuSelect: require('./menu(Selected).png'),
  menuUnSelect: require('./menu_tab.png'),
  sgSelect: require('./SG(Selected).png'),
  sgUnSelect: require('./SG.png'),
  staticSelect: require('./statistics(selected).png'),
  staticUnSelect: require('./statistics.png'),
  introImgae1: require('./Asset1.png'),
  introImgae2: require('./Asset2.png'),
  introImgae3: require('./Assets3.png'),
  notificationIcon: require('./notificationIcon.png'),
  userTemp: require('./usertemp.png'),
  wifiIcon: require('./userwifi.png'),
  groupIcon: require('./usergroup.png'),
  belluser: require('./user-bell.png'),
  userProfile: require('./user-user-alt.png'),
  redarrow: require('./redarrow.png'),
  greenarrow: require('./greenarrow.png'),
};

var imgs = [];
Object.keys(images).forEach(key => imgs.push(images[key]));
export const imageAssets = imgs.map(img => Asset.fromModule(img).downloadAsync());
