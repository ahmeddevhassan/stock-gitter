import React from 'react';
import {
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator,
  createAppContainer,
  createBottomTabNavigator
} from 'react-navigation';
import { SafeAreaView } from 'react-native';
import Home from '../screens/home';
import Splash from '../screens/Splash';
import Logout from '../screens/Logout';
import Login from '../screens/Login';
import * as theme from '../utils/Theme';
import Menu from './Menu';
import LeftMenu from './LeftMenu';
import Tab from "./Tab";
import { images } from '../../assets/'
import SideMenu from '../screens/sideMenu';
import Welcome from '../screens/Welcome';
import SignUp from '../screens/sign-up/SignUp';
import GuestRegistration from '../screens/guest-registration';
import IntroSlider from '../screens/intro-slider/IntroSlider';
import Notification from '../screens/notification/Notification';
import Profile from '../screens/Profile';
import ProfileUpdateScreen from '../screens/Profile-Update';
import Stats from '../screens/stats';
import DefaultSimulation from '../screens/DefaultSimulation';
import ForgotPasswordEmail from '../screens/forgotPasswordEmail/ForgotPasswordEmail';
import News from '../screens/news/News';
import EmailAlers from '../screens/EmailAlerts';
import Order from '../screens/Order-form';
import OrderPreview from '../screens/Order-preview';
import ForgotPasswordPin from '../screens/forgotPasswordPin';
import SearchScreen from '../screens/Search/SearchScreen';
import Game from '../screens/Game';
import Search from '../screens/searchMain';
import Subscription from '../screens/subscription';
import WatchList from '../screens/watchlist';

//stacknavigator for order


const ProfileUpdate = createSwitchNavigator({
  ProfileUpdateScreen: {
    screen: ProfileUpdateScreen,
    navigationOptions: ({ navigation }) => ({
      title: `Splash`,
      headerTintColor: 'white',
      gesturesEnabled: false,
      headerStyle: { backgroundColor: theme.colors.darkGray },
      headerTitleStyle: {
        fontSize: 18,
      },
    }),
  },
  DefaultSimulation: {
    screen: DefaultSimulation,
    navigationOptions: ({ navigation }) => ({
      title: `Splash`,
      headerTintColor: 'white',
      gesturesEnabled: false,
      headerStyle: { backgroundColor: theme.colors.darkGray },
      headerTitleStyle: {
        fontSize: 18,
      },
    }),
  },
  Profile: {
    screen: Profile,
    navigationOptions: ({ navigation }) => ({
      title: `Splash`,
      headerTintColor: 'white',
      gesturesEnabled: false,
      headerStyle: { backgroundColor: theme.colors.darkGray },
      headerTitleStyle: {
        fontSize: 18,
      },
    }),
  },
  News: {
    screen: News,
    navigationOptions: ({ navigation }) => ({
      title: `Splash`,
      headerTintColor: 'white',
      gesturesEnabled: false,
      headerStyle: { backgroundColor: theme.colors.darkGray },
      headerTitleStyle: {
        fontSize: 18,
      },
    }),
  },
  Alerts: {
    screen: EmailAlers,
    navigationOptions: ({ navigation }) => ({
      title: `Splash`,
      headerTintColor: 'white',
      gesturesEnabled: false,
      headerStyle: { backgroundColor: theme.colors.darkGray },
      headerTitleStyle: {
        fontSize: 18,
      },
    }),
  },
  OrderHistory: {
    screen: OrderPreview,
    navigationOptions: ({ navigation }) => ({
      title: `OrderHistory`,
      headerTintColor: 'white',
      gesturesEnabled: false,
      headerStyle: { backgroundColor: theme.colors.darkGray },
      headerTitleStyle: {
        fontSize: 18,
      },
    }),
  },
  Subscription: {
    screen: Subscription,
    navigationOptions: ({ navigation }) => ({
      title: `Subscription`,
      headerTintColor: 'white',
      gesturesEnabled: false,
      headerStyle: { backgroundColor: theme.colors.darkGray },
      headerTitleStyle: {
        fontSize: 18,
      },
    }),
  }
  ,
  watchList: {
    screen: WatchList,
    navigationOptions: ({ navigation }) => ({
      title: `Subscription`,
      headerTintColor: 'white',
      gesturesEnabled: false,
      headerStyle: { backgroundColor: theme.colors.darkGray },
      headerTitleStyle: {
        fontSize: 18,
      },
    }),
  }
}, {
  initialRouteName: 'Profile',
});

// simulation start
const SimulationSwitch = createSwitchNavigator({
  Stats: {
    screen: Stats,
    navigationOptions: ({ navigation }) => ({
      title: `Splash`,
      headerTintColor: 'white',
      gesturesEnabled: false,
      headerStyle: { backgroundColor: theme.colors.darkGray },
      headerTitleStyle: {
        fontSize: 18,
      },
    }),
  },

}, {
  initialRouteName: 'Stats',
});



const MainTabs = createBottomTabNavigator(
  {
    Notification: {
      screen: Notification,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          var source = focused ? images.tabBellSelect : images.tabBellUnSelect;
          return <Tab source={source} focused={focused} />;
        },
        title: '',
        showLabel: false,
        tabBarOptions: {
          title: 'WorkBag',
          showLabel: false
        }
      })
    },

    Static: {
      screen: SimulationSwitch,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          var source = focused ? images.staticSelect : images.staticUnSelect;
          return <Tab source={source} focused={focused} />;
        },
        title: '',
        showLabel: false,
        tabBarOptions: {
          title: 'WorkBag',
          showLabel: false
        }
      })
    },
    SG: {
      screen: Search,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          var source = focused ? images.sgSelect : images.sgUnSelect;
          return <Tab source={source} focused={focused} />;
        },
        title: '',
        showLabel: false,
        tabBarOptions: {
          title: '',
          showLabel: false
        }
      })
    },
    Game: {
      screen: Game,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          var source = focused ? images.gameControlerSelect : images.gameControlerUnSelect;
          return <Tab source={source} focused={focused} />;
        },
        title: '',
        showLabel: false,
        tabBarOptions: {
          title: 'WorkBag',
          showLabel: false
        }
      })
    },
    Menu: {
      screen: ProfileUpdate,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          var source = focused ? images.menuSelect : images.menuUnSelect;
          return <Tab source={source} focused={focused} />;
        },
        title: '',
        showLabel: false,
        tabBarOptions: {
          title: 'WorkBag',
          showLabel: false
        }
      })
    },
  },
  {
    showIcon: true,
    showLabel: false,
    initialRouteName: 'SG',
  }
);
// MARK: - switchNAvigator
const switchnavigator = createSwitchNavigator({
  Splash: {
    screen: Splash,
    navigationOptions: ({ navigation }) => ({
      title: `Splash`,
      headerTintColor: 'white',
      gesturesEnabled: false,
      headerStyle: { backgroundColor: theme.colors.darkGray },
      headerTitleStyle: {
        fontSize: 18,
      },
    }),
  },
  WelcomeScreen: {
    screen: Welcome,
    navigationOptions: ({ navigation }) => ({
      title: `Welcome`,
      headerTintColor: 'white',
      gesturesEnabled: false,
      headerStyle: { backgroundColor: theme.colors.darkGray },
      headerTitleStyle: {
        fontSize: 18,
      },
    }),
  },
  Signup: {
    screen: SignUp,
    navigationOptions: ({ navigation }) => ({
      title: `Login`,
      headerTintColor: 'white',
      gesturesEnabled: false,
      headerStyle: { backgroundColor: theme.colors.darkGray },
      headerTitleStyle: {
        fontSize: 18,
      },
    }),
  },
  GuestRegistration: {
    screen: GuestRegistration,
    navigationOptions: ({ navigation }) => ({
      title: `Login`,
      headerTintColor: 'white',
      gesturesEnabled: false,
      headerStyle: { backgroundColor: theme.colors.darkGray },
      headerTitleStyle: {
        fontSize: 18,
      },
    }),
  },
  Login: {
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      title: `Login`,
      headerTintColor: 'white',
      gesturesEnabled: false,
      headerStyle: { backgroundColor: theme.colors.darkGray },
      headerTitleStyle: {
        fontSize: 18,
      },
    }),
  },
  Logout: {
    screen: Logout,
    navigationOptions: ({ navigation }) => ({
      title: `Logout`,
      headerTintColor: 'white',
      gesturesEnabled: false,
      headerStyle: { backgroundColor: theme.colors.darkGray },
      headerTitleStyle: {
        fontSize: 18,
      },
    }),
  },
  IntroSlider: {
    screen: IntroSlider,
    navigationOptions: ({ navigation }) => ({
      title: `IntroSlider`,
      headerTintColor: 'white',
      gesturesEnabled: false,
      headerStyle: { backgroundColor: theme.colors.darkGray },
      headerTitleStyle: {
        fontSize: 18,
      },
    }),
  },
  Home: {
    screen: MainTabs,
    navigationOptions: ({ navigation }) => ({
      title: `Logout`,
      headerTintColor: 'white',
      gesturesEnabled: false,
      headerStyle: { backgroundColor: theme.colors.darkGray },
      headerTitleStyle: {
        fontSize: 18,
      },
    }),
  },
  ForgotPassword: {
    screen: ForgotPasswordEmail,
    navigationOptions: ({ navigation }) => ({
      title: `Logout`,
      headerTintColor: 'white',
      gesturesEnabled: false,
      headerStyle: { backgroundColor: theme.colors.darkGray },
      headerTitleStyle: {
        fontSize: 18,
      },
    }),
  },
  ForgotPasswordPin: {
    screen: ForgotPasswordPin,
    navigationOptions: ({ navigation }) => ({
      title: `Logout`,
      headerTintColor: 'white',
      gesturesEnabled: false,
      headerStyle: { backgroundColor: theme.colors.darkGray },
      headerTitleStyle: {
        fontSize: 18,
      },
    }),
  },
  OrderForm: {
    screen: Order,
    navigationOptions: ({ navigation }) => ({
      title: `Splash`,
      headerTintColor: 'white',
      gesturesEnabled: false,
      headerStyle: { backgroundColor: theme.colors.darkGray },
      headerTitleStyle: {
        fontSize: 18,
      },
    }),
  },

}, {
  initialRouteName: 'Splash',
}
);
// MARK: - DrawerNavigator


export default AppContainer = createAppContainer(switchnavigator);
