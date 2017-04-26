import React from 'react';
import { Button, Image, Linking } from 'react-native';
import Login from 'react-native-login';

import {
  Body,
  Card,
  CardItem,
  Col,
  Container,
  Content,
  Grid,
  H3,
  Icon,
  ListItem,
  Row,
  Text,
  variables,
  View,
} from 'native-base';

const config = {
  url: 'https://chat.sagaoftherealms.net/auth',
  realm: 'demo',
  client_id: 'Android',
  redirect_uri: 'keycloak-demo://app',
};

export default class LoadingScreen extends React.Component {
  static navigationOptions = {
    title: 'Loading',
  };
  constructor(props) {
    super(props);
    Login.conf = config;
    this.state = {
      isLoading: true,
      hasInitialUrl: null,
      hasToken: null,
      token: '',
    };
  }

  checkTokens() {
    return Login.tokens()
      .then(tokens => {
        if (tokens) {
          this.setState(
            { hasToken: true, token: tokens['access_token'] },
            this.attemptNavigation
          );
        } else {
          this.setState({ hasToken: false }, this.attemptNavigation);
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ hasToken: false }, this.attemptNavigation);
      });
  }

  checkInitialUrl() {
    Linking.getInitialURL()
      .then(url => {
        if (url) {
          var code = this.getParameterByName('code', url);
          if (code) {
            Login.retrieveTokens(code)
              .then(resp => {
                this.setState({ hasInitialUrl: true }, this.checkTokens);
              })
              .catch(error => {
                console.log('Error in code exchange : ' + error);
                this.setState({ hasInitialUrl: false }, this.checkTokens);
              });
          } else {
            this.setState({ hasInitialUrl: false }, this.attemptNavigation);
          }
        } else {
          this.setState({ hasInitialUrl: false }, this.attemptNavigation);
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ hasInitialUrl: false }, this.checkTokens);
      });
  }

  attemptNavigation() {
    if (this.state.hasInitialUrl != null && this.state.hasToken != null) {
      if (this.state.hasToken) {
        this.props.navigation.navigate('InvitesList', {
          token: this.state.token,
          config: config,
        });
      } else {
        this.props.navigation.navigate('Login', { config: config });
      }
    }
  }

  componentWillMount() {
    this.checkTokens();
    this.checkInitialUrl();
  }

  getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>Loading...</Text>
        </View>
      );
    } else {
      console.log('Error, loading has finished but I am still here!');
      return null;
    }
  }
}
