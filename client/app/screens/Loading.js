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

const keycloakConfig = {
  url: 'http://keycloak-server-snapscreen.74.207.224.48.xip.io/auth',
  realm: 'SnapScreen',
  client_id: 'android',
  redirect_uri: 'keycloak-demo://app',
};

const styles = {
  view: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default class LoadingScreen extends React.Component {
  static navigationOptions = {
    title: 'Loading',
  };
  constructor(props) {
    super(props);
    Login.conf = keycloakConfig;

    this.state = {
      isLoading: true,
      hasInitialUrl: null,
      hasToken: null,
      token: '',
    };

    this._checkTokens();
    this._checkInitialUrl();
  }

  _checkTokens() {
    return Login.tokens()
      .then(tokens => {
        if (tokens) {
          this.setState(
            { hasToken: true, token: tokens['access_token'] },
            this._attemptNavigation
          );
        } else {
          this.setState({ hasToken: false }, this._attemptNavigation);
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ hasToken: false }, this._attemptNavigation);
      });
  }

  _checkInitialUrl() {
    Linking.getInitialURL()
      .then(url => {
        if (url) {
          //This is for exchanging an authorizationCode for an access_token Ref. OAuth2 spec
          var authorizationCode = this._getParameterByName('code', url);
          if (authorizationCode) {
            Login.retrieveTokens(authorizationCode)
              .then(resp => {
                this.setState({ hasInitialUrl: true }, this._checkTokens);
              })
              .catch(error => {
                console.log('Error in code exchange : ' + error);
                this.setState({ hasInitialUrl: false }, this._checkTokens);
              });
          } else {
            this.setState({ hasInitialUrl: false }, this._attemptNavigation);
          }
        } else {
          this.setState({ hasInitialUrl: false }, this._attemptNavigation);
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ hasInitialUrl: false }, this._checkTokens);
      });
  }

  _attemptNavigation() {
    if (this.state.hasInitialUrl != null && this.state.hasToken != null) {
      if (this.state.hasToken) {
        this.props.navigation.navigate('InvitesList', {
          token: this.state.token,
          keycloakConfig: keycloakConfig,
        });
      } else {
        this.props.navigation.navigate('Login', {
          keycloakConfig: keycloakConfig,
        });
      }
    }
  }

  _getParameterByName(name, url) {
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
        <View style={styles.view}>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      console.log('Error, loading has finished but I am still here!');
      return null;
    }
  }
}
