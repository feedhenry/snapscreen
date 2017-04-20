import React from 'react';
import { Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Font, AppLoading } from 'expo';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import InviteListScreen from './screens/InviteList';
import InviteDetailScreen from './screens/InviteDetail';

const Navigator = StackNavigator({
  // First item in this object is the first screen displayed
  //LoginScreen: { screen: LoginScreen },
  SignupScreen: { screen: SignupScreen },
  InvitesList: { screen: InviteListScreen },
  InviteDetail: { screen: InviteDetailScreen },
});

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { isReady: false };
  }
  async componentWillMount() {
    // Prevent font loading errors on Android. Solution copied from
    // https://github.com/expo/nativebase-example/blob/master/main.js
    if (Platform.OS === 'android') {
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      });
    }
    this.setState({ isReady: true });
  }
  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return <Navigator />;
  }
}
