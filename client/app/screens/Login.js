import React from 'react';
import Login from 'react-native-login';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, View, StyleSheet } from 'react-native';
import {
  Body,
  Button,
  Col,
  Container,
  Content
} from 'native-base';

const styles = StyleSheet.create({
  buttonBigText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  buttonRedText: {
    color: '#db3236'
  },
  buttonBlackText: {
    color: '#000'
  },
  inline: {
    flexDirection: 'row'
  },
});


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

      <Container style={{padding: 30}}>
        
        <Content>
          
          
          <Button full transparent onPress={() => this.login("github")}>
            <View style={styles.inline}>
              <Icon name="github-square" size={40} color="#000" />
              <Text style={[styles.buttonBlackText, styles.buttonBigText]}>  Sign-in with GitHub</Text>
            </View>
          </Button>
          <Button  full transparent onPress={() => this.login("google")}>
            <View style={styles.inline}>
              <Icon name="google-plus-square" size={40} color="#db3236" />
              <Text style={[styles.buttonRedText, styles.buttonBigText]}>  Sign-in with Google</Text>
            </View>
          </Button>
         
        </Content>
      
      </Container>
    
    );
  }

}
