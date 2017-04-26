import React from 'react';
import { Platform, NativeModules } from 'react-native';
import { StackNavigator } from 'react-navigation';
// import { Font, AppLoading } from 'expo';

import LoadingScreen from './screens/Loading';
import LoginScreen from './screens/Login';
import InviteListScreen from './screens/InviteList';
import InviteDetailScreen from './screens/InviteDetail';
import InviteCreateScreen from './screens/InviteCreate';

const Navigator = StackNavigator({
  // First item in this object is the first screen displayed
  Loading: { screen: LoadingScreen },
  Login: { screen: LoginScreen },
  InvitesList: { screen: InviteListScreen },
  InviteDetail: { screen: InviteDetailScreen },
  InviteCreate: { screen: InviteCreateScreen },
});

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { isReady: false };
  }
  async componentWillMount() {

    console.log('-----------', 'calling init' ,'--------')
    try {
      NativeModules.Aerogear.init({}, ()=>{console.log(arguments);},()=>{console.log(arguments);});
    } catch (error) {
      console.log(error);
    }
    
    this.setState({ isReady: true });
  }
  render() {
    return <Navigator />;
  }
}
