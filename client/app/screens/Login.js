import React from 'react';
import { ActivityIndicator, Image, Linking, NativeModules } from 'react-native';
import {
  Body,
  Button,
  Card,
  CardItem,
  Col,
  Container,
  Content,
  Grid,
  H1,
  Icon,
  ListItem,
  Row,
  Text,
  variables,
  View,
} from 'native-base';
import { NavigationActions } from 'react-navigation';
import Login from 'react-native-login';
import Config from 'react-native-config';
import jwtDecode from 'jwt-decode';

const keycloakConfig = {
  url: Config.KEYCLOAK_URL,
  realm: Config.KEYCLOAK_REALM,
  client_id: Config.KEYCLOAK_CLIENT_ID,
  redirect_uri: Config.KEYCLOAK_REDIRECT_URI,
  appsite_uri: Config.KEYCLOAK_APPSITE_URI,
};

const styles = {
  content: {
    marginHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 30,
  },
  button: {
    marginTop: 10,
  },
};

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };

    // Check if user is logged in
    Login.tokens().then(tokens => {
      this.setState({ loading: false });
      if (tokens) {
        // User logged in, redirect to invite list
        this._loginSuccess(tokens);
      }
    });
  }

  _loginSuccess(tokens) {
    // Extract user ID (email) from JWT
    var currentUserID = jwtDecode(tokens.access_token).email;

    // Initialize Aerogear push notifications
    NativeModules.Aerogear.init(
      { alias: currentUserID },
      () => console.log('Successfully initialized Aerogear UPS.'),
      error =>
        console.log('Error initializing Aerogear UPS: ' + JSON.stringify(error))
    );

    // Navigate to InviteListScreen, resetting navigation stack so the back
    // button doesn't appear in the header
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'InvitesList',
          params: { currentUserID },
        }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  _handleLoginClick(provider) {
    Login.start({ ...keycloakConfig, kc_idp_hint: provider }).then(tokens => {
      // Newly logged in user, redirect to invite list
      this._loginSuccess(tokens);
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <Container style={styles.content}>
          <ActivityIndicator
            animating={this.state.animating}
            style={[styles.centering, { height: 80 }]}
            size="large"
          />
        </Container>
      );
    } else {
      return (
        <Container style={styles.content}>
          <H1 style={styles.title}>Welcome to SnapScreen</H1>
          <Button
            iconLeft
            block
            dark
            onPress={() => this._handleLoginClick('github')}
            style={styles.button}
          >
            <Icon name="logo-github" />
            <Text>Sign-in with GitHub</Text>
          </Button>
          <Button
            iconLeft
            block
            onPress={() => this._handleLoginClick('facebook')}
            style={styles.button}
          >
            <Icon name="logo-facebook" size={40} />
            <Text>
              Sign-in with Facebook
            </Text>
          </Button>
        </Container>
      );
    }
  }
}
