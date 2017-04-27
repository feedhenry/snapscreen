import React from 'react';
import Login from 'react-native-login';
import {
  Text,
  View,
  Body,
  Button,
  Col,
  Icon,
  Container,
  Content,
} from 'native-base';

const styles = {
  buttonBigText: {
    fontSize: 20,
    padding: 15,
    fontWeight: 'bold',
  },
  buttonRedText: {
    color: '#db3236',
  },
  buttonBlackText: {
    color: '#000',
  },
  inline: {
    flexDirection: 'row',
  },
};

export default class LoginScreen extends React.Component {
  keycloakConfig = {};

  static navigationOptions = {
    title: 'Login',
  };

  constructor(props) {
    super(props);
    this.keycloakConfig = props.navigation.state.params.keycloakConfig;
  }

  _login(loginServicePref) {
    var usableConfig = Object.assign({}, this.keycloakConfig, {
      kc_idp_hint: loginServicePref,
    });
    Login.start(usableConfig);
  }

  render() {
    return (
      <Container style={{ padding: 30 }}>

        <Content>

          <Button iconLeft transparent onPress={() => this._login('github')}>
            <Icon name="logo-github" size={40} style={styles.buttonBlackText} />
            <Text
              style={{ ...styles.buttonBlackText, ...styles.buttonBigText }}
            >
              Sign-in with GitHub
            </Text>
          </Button>
          <Button iconLeft transparent onPress={() => this._login('google')}>
            <Icon
              name="logo-googleplus"
              size={40}
              style={styles.buttonRedText}
            />
            <Text style={{ ...styles.buttonRedText, ...styles.buttonBigText }}>
              Sign-in with Google
            </Text>
          </Button>

        </Content>

      </Container>
    );
  }
}
