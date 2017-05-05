import React from 'react';
import { Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';

import InviteCreateScreen from './screens/InviteCreate';
import InviteDetailScreen from './screens/InviteDetail';
import InviteListScreen from './screens/InviteList';
import LoginScreen from './screens/Login';
import SelectTheaterScreen from './screens/SelectTheater';
import SelectMovieShowtimeScreen from './screens/SelectMovieShowtime.js';

const Navigator = StackNavigator(
  {
    InviteCreate: { screen: InviteCreateScreen },
    InviteDetail: { screen: InviteDetailScreen },
    InvitesList: { screen: InviteListScreen },
    Login: { screen: LoginScreen },
    SelectMovieShowtime: { screen: SelectMovieShowtimeScreen },
    SelectTheater: { screen: SelectTheaterScreen },
  },
  {
    initialRouteName: 'Login',
  }
);

export default class App extends React.Component {
  render() {
    return <Navigator />;
  }
}
