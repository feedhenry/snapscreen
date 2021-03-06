import React from 'react';
import { Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';

import LoadingScreen from './screens/Loading';
import LoginScreen from './screens/Login';
import InviteListScreen from './screens/InviteList';
import InviteDetailScreen from './screens/InviteDetail';
import InviteCreateScreen from './screens/InviteCreate';
import SelectTheaterScreen from './screens/SelectTheater';
import SelectMovieShowtimeScreen from './screens/SelectMovieShowtime.js';

const Navigator = StackNavigator({
  // First item in this object is the first screen displayed
  Loading: { screen: LoadingScreen },
  Login: { screen: LoginScreen },
  InvitesList: { screen: InviteListScreen },
  InviteDetail: { screen: InviteDetailScreen },
  InviteCreate: { screen: InviteCreateScreen },
  SelectTheater: { screen: SelectTheaterScreen },
  SelectMovieShowtime: { screen: SelectMovieShowtimeScreen },
});

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { isReady: false };
  }
  componentWillMount() {
    this.setState({ isReady: true });
  }
  render() {
    return <Navigator />;
  }
}
