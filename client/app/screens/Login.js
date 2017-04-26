import React from 'react';
import { Image, Button } from 'react-native';
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

const styles = {};

export default class LoginScreen extends React.Component {

  config = {};

  static navigationOptions = {
    title: 'Login',
  };

  constructor(props) {
    super(props);
    this.config = props.navigation.state.params.config;
  }


  login(loginServicePref) {
      var usableConfig = Object.assign({}, this.config, {kc_idp_hint: loginServicePref})
      Login.start(usableConfig);
  }

  render() {


    
    return (
       <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            
                        }}>
          <Text>Login with</Text>
          <Button  title="GitHub" block onPress={() => this.login("github")}></Button>
          <Button title="Google (b0rken)" block onPress={() => this.login("google")}></Button>
          </View>
    );
  }
}
